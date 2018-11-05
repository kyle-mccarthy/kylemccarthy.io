import { SendMailOptions, Transporter } from 'nodemailer';
import { Readable } from 'stream';
import { Url } from 'url';
import {
  NotificationInterface,
  NotificationType,
} from '../notification.interface';

export interface Address {
  address: string;
  name: string;
}

export interface AttachmentLike {
  content?: string | Buffer | Readable;
  path?: string | Url;
}

export interface Attachment extends AttachmentLike {
  filename?: string | false;
  cid?: string;
  encoding?: string;
  contentType?: string;
  contentTransferEncoding?: '7bit' | 'base64' | 'quoted-printable' | false;
  contentDisposition?: 'attachment' | 'inline';
  headers?: any;
  raw?: string | Buffer | Readable | AttachmentLike;
}

export interface TemplateVariables {
  [key: string]: any;
}

export abstract class EmailNotification implements NotificationInterface {
  public template?: string;
  public from?: string | Address;
  public sender?: string | Address;
  public to?: string | Address | Array<string | Address>;
  public cc?: string | Address | Array<string | Address>;
  public bcc?: string | Address | Array<string | Address>;
  public replyTo?: string | Address;
  public subject?: string;
  public text?: string;
  public html?: string;
  public attachments?: Attachment[];
  protected data?: TemplateVariables;

  public setData(data: TemplateVariables) {
    this.data = data;
  }

  public getData(): TemplateVariables | undefined {
    return this.data;
  }

  public getTemplate(): string {
    return this.template!;
  }

  public getType(): NotificationType {
    return 'email';
  }

  public getMailOptions(): SendMailOptions {
    return {
      to: this.to,
      from: this.from,
      sender: this.sender,
      cc: this.cc,
      bcc: this.bcc,
      replyTo: this.replyTo,
      subject: this.subject,
      text: this.text,
      attachments: this.attachments,
    };
  }
}
