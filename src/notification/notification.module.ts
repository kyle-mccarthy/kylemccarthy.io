import { Module, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@src/config/config.service';
import { EmailNotificationService } from './email/email-notification.service';
import { NotificationService } from './notification.service';

@Module({
  providers: [NotificationService, EmailNotificationService],
})
export class NotificationModule implements OnModuleInit {
  constructor(
    private readonly service: NotificationService,
    private readonly mailer: EmailNotificationService,
  ) {}

  public onModuleInit() {
    this.service.registerNotificationService('email', this.mailer);
  }
}
