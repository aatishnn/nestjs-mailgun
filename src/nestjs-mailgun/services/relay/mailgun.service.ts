import { Injectable, Inject } from '@nestjs/common';
import { MAILGUN_OPTIONS } from '../../tokens/tokens';
import { ConfigurationMailgun } from '../../configuration';
import * as mailgunConfig from 'mailgun-js';

export interface EmailOptions {
  from: string;
  to: string;
  subject: string;
  text?: string;
  html?: string;
  attachment?;
}
@Injectable()
export class MailgunService {
  private readonly mailgun;
  constructor(
    @Inject(MAILGUN_OPTIONS) private readonly options: ConfigurationMailgun,
  ) {
    this.mailgun = mailgunConfig(this.options);
  }

  public sendEmail(emailOptions: EmailOptions): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.mailgun.messages().send(emailOptions, (error, body) => {
        if (error) {
          return reject(error);
        }
        return resolve(body);
      });
    });
  }

  public validateEmail(email: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.mailgun.validate('test@mail.com', (err, body) => {
        if (body && body.is_valid) {
          resolve(true);
        } else {
          resolve(false);
        }
        if (err) {
          console.log('ERRRP', err);

          reject(err);
        }
      });
    });
  }
}
