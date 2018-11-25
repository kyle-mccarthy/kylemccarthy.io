import { EmailNotification } from '@src/notification/email/email-notification.ts';

interface UserInterface {
  email: string;
  name: string;
}

interface ForgotPasswordProps {
  name: string;
  url: string;
}

export class ForgotPasswordNotification extends EmailNotification<
  ForgotPasswordProps
> {
  public template = 'forgotPassword';

  constructor(user: UserInterface, props: ForgotPasswordProps) {
    super();

    this.to = {
      name: user.name,
      address: user.email,
    };

    this.data = {
      name: props.name,
      url: props.url,
    };
  }
}
