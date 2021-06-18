import Email from '../core/entity/email';
import EmailRepositorySendGrid from '../core/repository/email-repository-send-grid';
import SendEmail from '../core/usecase/send-email';

export default class EmailController {
  static async sendEmail(email: Email) {
    const emailRepository = new EmailRepositorySendGrid();
    const sendEmail = new SendEmail(emailRepository);
    const resultEmail = await sendEmail.execute(email);
    return resultEmail;
  }
}
