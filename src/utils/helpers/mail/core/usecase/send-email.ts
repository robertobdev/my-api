import Mail from '../entity/email';
import MailRepository from '../repository/interfaces/email-repository';

export default class SendEmail {
  mailRepository: MailRepository;

  constructor(mailRepository: MailRepository) {
    this.mailRepository = mailRepository;
  }

  execute(mail: Mail) {
    const resultEmail = this.mailRepository.sendEmail(mail);
    return resultEmail;
  }
}
