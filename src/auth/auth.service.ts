import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@server/user/user.entity';
import { UserService } from '@server/user/user.service';
import bcrypt from 'bcrypt';
import { DecodedPayload } from './dto/decoded-jwt';
import { JwtPayload } from './dto/jwt-payload';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  public async validateUserCredentials(email: string, password: string) {
    let user = null;
    const errorText = 'The email and password combination do not match';

    user = await this.userService.findByEmail(email);

    if (!user) {
      throw new Error(errorText);
    }

    const validPassword = await this.comparePassword(password, user.password);

    if (!validPassword) {
      throw new Error(errorText);
    }

    return user;
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

  public async hashPassword(str: string) {
    return await bcrypt.hash(str, 10);
  }

  public async comparePassword(plaintext: string, encrypted: string) {
    return await bcrypt.compare(plaintext, encrypted);
  }
}
