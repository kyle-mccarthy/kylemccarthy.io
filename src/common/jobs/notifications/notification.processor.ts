import { Bind } from '@nestjs/common';
import { Job, JobProcessor } from '@src/job/job.processor';
import { NotificationInterface } from '@src/notification/notification.interface';
import { NotificationService } from '@src/notification/notification.service';

export class NotificationProcessor extends JobProcessor<NotificationInterface> {
  constructor(private readonly notificationService: NotificationService) {
    super('notifications');
  }

  @Bind()
  public async process(job: Job<NotificationInterface>) {
    await this.notificationService.notifiy(job.data.getPayload());
  }
}
