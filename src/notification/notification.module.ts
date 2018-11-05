import { Module } from '@nestjs/common';

import { EmailNotificationService } from './email/email-notification.service';

import { NotificationService } from './notification.service';

@Module({
  providers: [NotificationService, EmailNotificationService],
})
export class NotificationModule {}
