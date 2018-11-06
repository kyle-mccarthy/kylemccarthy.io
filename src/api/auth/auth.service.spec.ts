import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDTO } from '@src/api/user/dto/create-user.dto';
import { User } from '@src/api/user/user.entity';
import { UserModule } from '@src/api/user/user.module';
import { UserService } from '@src/api/user/user.service';
import { moduleForRoot } from '@src/testing/utils/database';
import { Connection } from 'typeorm';
import { AuthService } from './auth.service';

const createTestUser = async (
  authService: AuthService,
  userService: UserService,
): Promise<[User, CreateUserDTO]> => {
  const dto = {
    name: 'Casimer',
    email: 'Wilfredo78@hotmail.com',
    password: 'pfl6XcjlwBCxbhr',
  };

  const user = userService.create(dto);
  user.password = await userService.hashPassword(user.password);
  await userService.save(user);
  return [user, dto];
};

describe('AuthService', () => {
  let service: AuthService;
  let userService: UserService;
  let connection: Connection;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService],
      imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
          secretOrPrivateKey: 'testing',
          signOptions: {
            expiresIn: 3600,
          },
        }),
        moduleForRoot([User]),
        UserModule,
      ],
    }).compile();
    service = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
    connection = module.get<Connection>(Connection);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(userService).toBeDefined();
    expect(connection).toBeDefined();
  });

  it('should validate user with email and correct password', async () => {
    await connection.synchronize(true);
    const [newUser, newUserDto] = await createTestUser(service, userService);

    let user = null;
    let error = null;

    try {
      user = await service.validateUserCredentials(
        newUserDto.email,
        newUserDto.password,
      );
    } catch (err) {
      error = err;
    }

    expect(error).toEqual(null);
    expect(user).not.toEqual(null);
    expect(user!.id).toEqual(newUser.id);
  });

  it('should not validate user with wrong email or password', async () => {
    await connection.synchronize(true);
    const [newUser, newUserDto] = await createTestUser(service, userService);

    let user = null;
    let error = null;

    try {
      user = await service.validateUserCredentials(
        newUserDto.email,
        'the wrong password',
      );
    } catch (err) {
      error = err;
    }

    expect(error).not.toEqual(null);
    expect(user).toEqual(null);
    expect(error.message).toEqual(
      'The email and password combination do not match',
    );

    user = null;
    error = null;

    try {
      user = await service.validateUserCredentials(
        'Crystel.Schroeder@gmail.com',
        newUser.password,
      );
    } catch (err) {
      error = err;
    }

    expect(error).not.toEqual(null);
    expect(user).toEqual(null);
    expect(error.message).toEqual(
      'The email and password combination do not match',
    );
  });

  it('should sign user with jwt token', async () => {
    await connection.synchronize(true);
    const [user] = await createTestUser(service, userService);

    const token = service.signUser(user);

    expect(token).toBeDefined();
  });

  it('should decoded valid jwt token', async () => {
    await connection.synchronize(true);
    const [user] = await createTestUser(service, userService);

    const token = service.signUser(user);
    const decodedUser = service.decodeToken(token);

    expect(decodedUser).toBeDefined();
    expect(decodedUser).not.toEqual(null);
    expect(decodedUser!.name).toBeDefined();
    expect(decodedUser!.email).toBeDefined();
    expect(decodedUser!.iat).toBeDefined();
    expect(decodedUser!.exp).toBeDefined();
    expect(decodedUser!.email).toEqual(user.email);
    expect(decodedUser!.name).toEqual(user.name);
  });

  it('should not decode invalid jwt token', async () => {
    const decodedUser = service.decodeToken('invalid-token');
    expect(decodedUser).toEqual(null);
  });

  // verify token
  it('should verify valid token', async () => {
    await connection.synchronize(true);
    const [user] = await createTestUser(service, userService);

    const token = service.signUser(user);
    const decodedToken = service.decodeToken(token);
    const isValid = service.verifyToken(token);

    expect(token).toBeDefined();
    expect(isValid).toEqual(decodedToken);
  });

  it('should not verify invalid token', () => {
    const isValid = service.decodeToken('invalid token');
    expect(isValid).toEqual(null);
  });
});
