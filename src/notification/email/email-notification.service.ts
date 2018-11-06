import { Injectable } from '@nestjs/common';
import { ConfigService } from '@src/config/config.service';
import { createTransport } from 'nodemailer';
import { Transporter } from 'nodemailer';
import { EmailNotification } from './email-notification';
import { EmailRendererService } from './email-renderer.service';

@Injectable()
export class EmailNotificationService {
  private readonly renderer: EmailRendererService;
  private readonly mailer: Transporter;

  constructor(private readonly config: ConfigService) {
    this.mailer = createTransport(this.config.getMailConfig());
    this.renderer = new EmailRendererService(this.config.get('EMAIL_DIR'));
  }

  public verify() {
    return this.mailer.verify();
  }

  public async notify(email: EmailNotification) {
    const renderedEmail = await this.renderer.render(
      email.getTemplate(),
      email.getData(),
    );

    if (
      Array.isArray(renderedEmail.errors) &&
      renderedEmail.errors.length > 0
    ) {
      throw new Error(renderedEmail.errors.join(', '));
    }

    email.html = renderedEmail.html;

    return this.mailer.sendMail(email);
  }
}
