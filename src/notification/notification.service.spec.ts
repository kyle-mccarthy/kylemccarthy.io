import { Test, TestingModule } from '@nestjs/testing';
import { EmailRendererService } from '@src/notification/email-renderer.service';
import { NotificationService } from './notification.service';

const nodemailer = jest.genMockFromModule<{
  createTransport: (options?: any) => any;
}>('nodemailer');

const Renderer = jest.fn<EmailRendererService>();

describe('NotificationService', () => {
  let service: NotificationService;
  beforeAll(async () => {
    const mailer = nodemailer.createTransport();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: NotificationService,
          useValue: new NotificationService(mailer, new Renderer()),
        },
      ],
    }).compile();
    service = module.get<NotificationService>(NotificationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
