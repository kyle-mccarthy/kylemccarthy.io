import { Bind, Injectable } from '@nestjs/common';
import { Job, JobProcessor } from '@src/job/job.processor';
import { NotificationInterface } from '@src/notification/notification.interface';
import { NotificationService } from '@src/notification/notification.service';

@Injectable()
export class NotificationProcessor extends JobProcessor<NotificationInterface> {
  public static queueName: string;

  constructor(private readonly notificationService: NotificationService) {
    super(NotificationProcessor.queueName);
  }

  @Bind()
  public async process(job: Job<NotificationInterface>) {
    await this.notificationService.notifiy(job.data.getPayload());
  }
}
