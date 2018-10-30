import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '@src/api/auth/auth.service';
import { RegisterUser } from '@src/api/auth/dto/register-user';
import { User } from '@src/api/user/user.entity';
import { UserService } from '@src/api/user/user.service';
import { classToPlain, plainToClass } from 'class-transformer';
import { UserAuth } from './dto/user-auth';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly service: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('register')
  public async register(@Body() dto: RegisterUser) {
    const user = this.userService.create(dto);

    const errors = await this.userService.validate(user, {
      skipMissingProperties: false,
      groups: ['registration'],
      validationError: {
        target: false,
      },
    });

    if (Array.isArray(errors) && errors.length > 0) {
      throw new BadRequestException(errors);
    }

    await this.userService.save(user);

    return {
      message: 'User account created',
      data: {
        user: classToPlain(user),
      },
    };
  }

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
