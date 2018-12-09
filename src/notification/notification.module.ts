import { Module, OnModuleInit } from '@nestjs/common';
import { JobModule } from '@src/job/job.module';
import { EmailNotificationService } from './email/email-notification.service';
import { NotificationService } from './notification.service';

@Module({
  providers: [NotificationService, EmailNotificationService],
  exports: [NotificationService],
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
