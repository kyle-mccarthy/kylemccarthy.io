import { Injectable } from '@nestjs/common';
import { EmailRendererService } from '@src/notification/email-renderer.service';
import { SendMailOptions, Transporter } from 'nodemailer';

@Injectable()
export class NotificationService {
  constructor(
    private readonly mailer: Transporter,
    private readonly renderer: EmailRendererService,
  ) {}

  public verify() {
    return this.mailer.verify!();
  }

  public send(message: SendMailOptions) {
    this.mailer.sendMail(message);
  }
}
