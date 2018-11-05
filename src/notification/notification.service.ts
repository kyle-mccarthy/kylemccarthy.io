import { Injectable } from '@nestjs/common';
import { EmailNotification } from '@src/notification/email/email-notification';
import { NotificationInterface } from '@src/notification/notification.interface';
import { EmailNotificationService } from './email/email-notification.service';

@Injectable()
export class NotificationService {
  constructor(private readonly emailNotification: EmailNotificationService) {}

  public notifiy(notification: NotificationInterface) {
    if (notification.getType() === 'email') {
      this.emailNotification.notify(notification as EmailNotification);
    }
  }
}
