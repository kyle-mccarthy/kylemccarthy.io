import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@src/api/user/user.entity';
import { UserService } from '@src/api/user/user.service';

import { DecodedPayload } from './dto/decoded-jwt';
import { JwtPayload } from './dto/jwt-payload';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  public async validateUserCredentials(email: string, password: string) {
    let user = null;
    const errorText = 'The email and password combination do not match';

    user = await this.userService.findByEmail(email);

    if (!user) {
      throw new Error(errorText);
    }

    const validPassword = await this.userService.comparePassword(
      password,
      user.password,
    );

    if (!validPassword) {
      throw new Error(errorText);
    }

    return user;
  }

  public async validatePayload(payload: JwtPayload) {
    return await this.userService.findByEmail(payload.email);
  }

  public signUser(user: User) {
    const { name, email } = user;
    const payload: JwtPayload = { name, email };
    return this.jwtService.sign(payload);
  }

  public verifyToken(token: string) {
    return this.jwtService.verify(token);
  }

  public decodeToken(token: string): null | DecodedPayload {
    return this.jwtService.decode(token, {}) as DecodedPayload;
  }
}
