import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

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
