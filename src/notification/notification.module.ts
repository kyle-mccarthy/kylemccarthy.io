import { DynamicModule, Module } from '@nestjs/common';
import { createTransport } from 'nodemailer';
import { EmailRendererService } from './email-renderer.service';
import { NotificationService } from './notification.service';

interface NotificationConfig {
  host: string;
  port: number;
  user: string;
  pass: string;
  secure?: boolean;
}

@Module({
  providers: [NotificationService, EmailRendererService],
})
export class NotificationModule {
  public static async forRoot(
    config: NotificationConfig,
  ): Promise<DynamicModule> {
    const emailService = new EmailRendererService();

    const transporter = createTransport({
      host: config.host,
      port: config.port,
      secure: config.secure,
      auth: {
        user: config.user,
        pass: config.pass,
      },
    });

    const notificationService = new NotificationService(
      transporter,
      emailService,
    );
    await notificationService.verify();

    return {
      module: NotificationModule,
      providers: [
        {
          provide: NotificationService,
          useValue: notificationService,
        },
        {
          provide: EmailRendererService,
          useValue: emailService,
        },
      ],
      exports: [NotificationService],
    };
  }
}
