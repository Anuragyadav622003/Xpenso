// import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
// import { Request, Response, NextFunction } from 'express';
// import * as jwt from 'jsonwebtoken';
// import { ConfigService } from '@nestjs/config';

// @Injectable()
// export class JwtMiddleware implements NestMiddleware {
//   constructor(private configService: ConfigService) {}

//   use(req: Request, res: Response, next: NextFunction) {
//     const authHeader = req.headers['authorization'];
//    console.log("Auth Header:",authHeader)
//     if (!authHeader || !authHeader.startsWith('Bearer ')) {
//       throw new UnauthorizedException('No token provided');
//     }

//     const token = authHeader.split(' ')[1];

//     try {
//       const secret = this.configService.get<string>('JWT_SECRET');
//       if (!secret) {
//   throw new UnauthorizedException('JWT secret not configured');
// }
//       const decoded = jwt.verify(token, secret);
//       // attach user to request for downstream use
//       req['user'] = decoded;
//       next();
//     } catch (err) {
//       throw new UnauthorizedException('Invalid token');
//     }
//   }
// }


import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RequestWithUser } from '../../common/types/request-with-user';

@Injectable()
export class JwtCookieGuard implements CanActivate {
  constructor(private jwt: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<RequestWithUser>();

    const token = req.cookies?.['access_token'];
    if (!token) throw new UnauthorizedException('No token provided');
    
    try {
      const payload = await this.jwt.verifyAsync(token);
      req.user = payload; // ✅ now properly typed
      return true;
    } catch (err) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
