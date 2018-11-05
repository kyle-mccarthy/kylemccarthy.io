export type NotificationType = 'email';

export interface NotificationInterface {
  getType(): NotificationType;
}
