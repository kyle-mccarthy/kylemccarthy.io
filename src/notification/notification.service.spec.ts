import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@src/config/config.module';
import { ConfigService } from '@src/config/config.service';
import { EmailNotificationService } from '@src/notification/email/email-notification.service';
import { ForgotPasswordNotification } from '@src/notification/notifications/email/ForgotPasswordNotification';
import { NotificationService } from './notification.service';

describe('NotificationService', () => {
  let service: NotificationService;
  let mailer: EmailNotificationService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NotificationService],
      imports: [ConfigModule],
    }).compile();

    service = module.get<NotificationService>(NotificationService);
    const configService = module.get<ConfigService>(ConfigService);
    mailer = new EmailNotificationService(configService);

    service.registerNotificationService('email', mailer);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('EmailNotificationService should verify', async () => {
    const didVerify = await mailer.verify();

    expect(didVerify).toBeTruthy();
  });

  it('should notify via mail', async () => {
    const notification = new ForgotPasswordNotification(
      {
        name: 'Elon Musk',
        email: 'elon.musk@gmail.com',
      },
      {
        name: 'Elon Musk',
        url: 'http://www.google.com',
      },
    );

    let res;
    let err;

    try {
      res = await service.notifiy(notification);
    } catch (e) {
      err = e;
    }

    expect(err).toBeUndefined();
    expect(res).toBeDefined();
  }, 20000);
});
