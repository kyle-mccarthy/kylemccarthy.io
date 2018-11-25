import { Injectable } from '@nestjs/common';
import {
  NotificationInterface,
  NotificationType,
} from '@src/notification/notification.interface';

interface NotificationServiceInterface {
  notify(notification: NotificationInterface): any;
}

@Injectable()
export class NotificationService {
  private readonly notificationServices: Map<
    NotificationType,
    NotificationServiceInterface
  > = new Map();

  public registerNotificationService(
    type: NotificationType,
    service: NotificationServiceInterface,
  ) {
    this.notificationServices.set(type, service);
  }

  public async notifiy(notification: NotificationInterface) {
    const service = this.notificationServices.get(notification.getType());

    if (!service) {
      throw new Error(
        `No notification service defined for notifications of type: ${notification.getType()}`,
      );
    }

    return await service.notify(notification);
  }
}
