// src/auth/auth.controller.ts
import { Controller, Post, Body,Req,Res,UseGuards,Get,Patch } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';
import { Request, Response } from 'express';
import { JwtCookieGuard } from 'src/common/midleware/jwt.middleware';
import { UpdateProfileDto } from './dto/update-profile.dto';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() dto: SignupDto,@Res({ passthrough: true }) res: Response) {
    return this.authService.signup(dto,res);
  }

  @Post('signin')
  signin(@Body() dto: SigninDto,@Res({ passthrough: true }) res: Response) {
    return this.authService.signin(dto,res);
  }
    @UseGuards(JwtCookieGuard)
  @Get('me')
  getMe(@Req() req: Request) {
   // return req['user']; // Added by JwtMiddleware
   console.log("hello")
    return this.authService.getMe(req);
  }
   @UseGuards(JwtCookieGuard)
  @Patch('update-profile')
  updateProfile(@Req() req: Request, @Body() dto: UpdateProfileDto) {
    return this.authService.updateProfile(req, dto);
  }

  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    return this.authService.logout(res);
  }
}
