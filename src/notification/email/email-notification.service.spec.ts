import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@src/config/config.module';
import { ConfigService, MailConfig } from '@src/config/config.service';
import { EmailNotification } from '@src/notification/email/email-notification.ts';
import { EmailNotificationService } from './email-notification.service';

const MockMailer = jest.fn((config: MailConfig) => ({
  sendMail: (email: EmailNotification) => jest.fn(),
}));

describe('EmailNotificationService', () => {
  let mailer: EmailNotificationService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
    }).compile();

    const configService = module.get<ConfigService>(ConfigService);
    mailer = new EmailNotificationService(configService);
  });

  it('should be defined', () => {
    expect(mailer).toBeDefined();
  });
});
