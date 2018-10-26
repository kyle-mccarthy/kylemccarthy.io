import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '@src/auth/auth.service';
import { User } from '@src/user/user.entity';
import { UserAuth } from './dto/user-auth';

@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Post('token')
  public async token(@Body() userAuth: UserAuth) {
    const user = await this.service.validateUserCredentials(
      userAuth.email,
      userAuth.password,
    );
    return {
      message: 'User authenticated',
      data: {
        token: this.service.signUser(user),
      },
    };
  }

  @Get('me')
  @UseGuards(AuthGuard())
  public async me(@Req() req: any) {
    const { id, name, email } = req.user;
    return {
      data: {
        id,
        name,
        email,
      },
    };
  }
}
