declare module 'nodemailer-mock' {
  import { Transporter, TransportOptions } from 'nodemailer';

  function createTransport(options?: TransportOptions): Transporter;

  export interface mock {
    reset: () => void;
    sentMail: () => any[];
    shouldFailOnce: () => any;
    shouldFail: (shouldFail: boolean) => void;
    mockedVerify: (verify: boolean) => void;
    successResponse: (success: string) => void;
    failResponse: (err: Error | string) => void;
  }
}
