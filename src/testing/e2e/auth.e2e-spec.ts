import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthModule } from '@src/auth/auth.module';
import { AuthService } from '@src/auth/auth.service';
import { moduleForRoot } from '@src/testing/utils/database';
import { seedUsers, TestUser } from '@src/testing/utils/seedUsers';
import { User } from '@src/user/user.entity';
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

  afterAll(async () => {
    await app.close();
  });
});
