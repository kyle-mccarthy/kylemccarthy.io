import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthModule } from '@src/api/auth/auth.module';
import { AuthService } from '@src/api/auth/auth.service';
import { User } from '@src/api/user/user.entity';
import { moduleForRoot } from '@src/testing/utils/database';
import { seedUsers, TestUser } from '@src/testing/utils/seedUsers';
import { default as request } from 'supertest';

describe('Auth Controller E2E', () => {
  let app: INestApplication;
  let users: TestUser[];
  let authService: AuthService;

  beforeAll(async () => {
    const mod: TestingModule = await Test.createTestingModule({
      imports: [moduleForRoot([User]), AuthModule],
    }).compile();

    authService = mod.get(AuthService);
    app = mod.createNestApplication();
    await app.init();
    users = await seedUsers(mod);
  });

  it('POST /auth/token', async () => {
    const user = users[0];

    const { email, password } = user.dto;
    const response = await request(app.getHttpServer())
      .post('/auth/token')
      .send({
        email,
        password,
      });

    const { body, status } = response;

    expect(body).toBeDefined();
    expect(status).toEqual(201);
    expect(body.message).toEqual('User authenticated');
    expect(body.data).toBeDefined();
    expect(body.data.token).toBeDefined();
  });

  it('GET /me', async () => {
    const user = users[0];
    const token = authService.signUser(user.user);

    const response = await request(app.getHttpServer())
      .get('/auth/me')
      .set('Authorization', `Bearer ${token}`)
      .send();

    const { body, status } = response;

    expect(status).toEqual(200);
    expect(body.data).toBeDefined();
    expect(body.data.id).toEqual(user.user.id);
  });

  it('GET /me (unauthorized)', async () => {
    const response = await request(app.getHttpServer())
      .get('/auth/me')
      .send();

    const { body, status } = response;

    expect(status).toEqual(401);
  });

  it('POST /register (invalid - missing confirmedPassword)', async () => {
    const newUser = {
      name: 'Jordan B',
      email: 'belfort.jordan@gmail.com',
      password: 'money123',
      // passwordConfirmed: 'money123',
    };
    const response = await request(app.getHttpServer())
      .post('/auth/register')
      .send(newUser);

    const { body, status } = response;
    const { message } = body;

    expect(message!.length).toEqual(1);

    const err = message[0];

    expect(err.property).toEqual('password');
    expect(err!.constraints.ConfirmedValidator).toBeDefined();
    expect(err!.constraints.ConfirmedValidator).toEqual(
      'Password and the password confirmation must be the same',
    );
    expect(status).toEqual(400);
  });

  it('POST /register (invalid - missing name)', async () => {
    const newUser = {
      email: 'belfort.jordan@gmail.com',
      password: 'money123',
      passwordConfirmed: 'money123',
    };
    const response = await request(app.getHttpServer())
      .post('/auth/register')
      .send(newUser);

    const { body, status } = response;
    const { message } = body;

    expect(message!.length).toEqual(1);

    const err = message[0];

    expect(err.property).toEqual('name');
    expect(err!.constraints.isDefined).toBeDefined();
    expect(status).toEqual(400);
  });

  it('POST /register (valid)', async () => {
    const newUser = {
      name: 'Jordan B',
      email: 'belfort.jordan@gmail.com',
      password: 'money123',
      passwordConfirmed: 'money123',
    };
    const response = await request(app.getHttpServer())
      .post('/auth/register')
      .send(newUser);

    const { body, status } = response;

    expect(status).toEqual(201);
    expect(body.data).toBeDefined();
    expect(body.data.user).toBeDefined();
    expect(body.data.user.email).toBeDefined();
    expect(body.data.user.email).toEqual(newUser.email);
  });

  it('POST /register (invalid - duplicate email)', async () => {
    const newUser = {
      name: 'Jordan B',
      email: 'belfort.jordan@gmail.com',
      password: 'money123',
      passwordConfirmed: 'money123',
    };
    const response = await request(app.getHttpServer())
      .post('/auth/register')
      .send(newUser);

    const { body, status } = response;
    const { message } = body;

    expect(message!.length).toEqual(1);

    const err = message[0];

    expect(err.property).toEqual('email');
    expect(err!.constraints.UniqueValidator).toBeDefined();
    expect(status).toEqual(400);
  });

  afterAll(async () => {
    await app.close();
  });
});
