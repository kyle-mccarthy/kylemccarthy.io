import { Injectable } from '@nestjs/common';
import { ConfigService } from '@src/config/config.service';
import { createTransport } from 'nodemailer';
import { Transporter } from 'nodemailer';
import { EmailNotification } from './email-notification';
import { EmailRendererService } from './email-renderer.service';

@Injectable()
export class EmailNotificationService {
  private readonly renderer = new EmailRendererService();
  private readonly mailer: Transporter;

  constructor(private readonly config: ConfigService) {
    this.mailer = createTransport(this.config.getMailConfig());
  }

  public async notify(email: EmailNotification) {
    const renderedEmail = await this.renderer.render(
      email.getTemplate(),
      email.getData(),
    );

    if (renderedEmail.errors) {
      throw new Error(renderedEmail.errors.join(', '));
    }

    email.html = email.html;

    return this.mailer.sendMail(email);
  }
}
