import { Injectable, BadRequestException, Req } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Response,Request } from 'express';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService
  ) {}

  async signup(dto: SignupDto, res: Response) {
    const existing = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (existing) throw new BadRequestException('Email already registered');

    const hash = await bcrypt.hash(dto.password, 10);

    const user = await this.prisma.user.create({
      data: {
        name: dto.name,
        phone: dto.phone,
        email: dto.email,
        password: hash,
        ...(dto.countryCode && { countryCode: dto.countryCode }),
      },
    });

    const token = this.generateToken(user.id, user.email);

    // ✅ Set the HttpOnly cookie
    res.cookie('access_token', token.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax', // ✅ enable cross-site cookie
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    const { password, ...userWithoutPassword } = user;

    return {
      user: userWithoutPassword,
    };
  }

  async signin(dto: SigninDto, res: Response) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (!user) throw new BadRequestException('Invalid credentials');

    const match = await bcrypt.compare(dto.password, user.password);
    if (!match) throw new BadRequestException('Invalid credentials');

    const token = this.generateToken(user.id, user.email);

    // ✅ Set the HttpOnly cookie
    res.cookie('access_token', token.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
       sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax', // ✅ enable cross-site cookie
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    const { password, ...userWithoutPassword } = user;

    return {
      user: userWithoutPassword,
    };
  }
 async getMe(req: Request) {
  const userData = req['user']; // payload from JWT (e.g., { sub: 1, email: 'test@example.com' })
    console.log(userData)
  if (!userData || !userData.sub) {
    throw new Error('User information not found in request');
  }

  const user = await this.prisma.user.findUnique({
    where: { id: userData.sub },
  });

  if (!user) {
    throw new Error('User not found');
  }

  const { password, ...userWithoutPassword } = user;

  return userWithoutPassword
  
}
  async updateProfile(req: Request, dto: UpdateProfileDto) {
    const userData = req['user']; // { sub, email }
    if (!userData || !userData.sub) {
      throw new BadRequestException('Invalid user session');
    }

    const updatedUser = await this.prisma.user.update({
      where: { id: userData.sub },
      data: {
        ...dto,
      },
    });

    const { password, ...userWithoutPassword } = updatedUser;
    return { user: userWithoutPassword };
  }
  logout(res: Response) {
    res.clearCookie('access_token');
    return { message: 'Logged out successfully' };
  }

  private generateToken(userId: number, email: string) {
    const payload = { sub: userId, email };
    return {
      access_token: this.jwt.sign(payload),
    };
  }
}
