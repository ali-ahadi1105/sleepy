import { Injectable } from '@nestjs/common';
import { UsersDocument } from './users/models/users.schema';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService
  ) {}
  login(user: UsersDocument, response: Response) {
    const tokenPayload = {
      userId: user._id.toHexString()
    };
    
    const expiresIn = new Date();
    expiresIn.setSeconds(
      expiresIn.getSeconds + this.configService.get('JWT_EXPIRES_IN')
    );

    const token = this.jwtService.sign(tokenPayload);

    response.cookie('Authentication', token, {
      httpOnly: true,
      expires: expiresIn
    });
  }
}
