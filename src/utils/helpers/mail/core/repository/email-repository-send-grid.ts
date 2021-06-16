import Mail from '../entity/email';
import EmailRepository from './interfaces/email-repository';
import { setApiKey, send } from '@sendgrid/mail';

export default class EmailRepositorySendGrid implements EmailRepository {
  constructor() {
    setApiKey(process.env.SENDGRID_API_KEY);
  }
  async sendEmail({ to, message: text, subject }: Mail): Promise<any> {
    const emailOptions = {
      from: process.env.EMAIL_FROM,
      to,
      subject,
      text,
      html: `<strong>${text}<strong>`,
    };
    const emailResponse = await send(emailOptions);
    return emailResponse;
  }
}
