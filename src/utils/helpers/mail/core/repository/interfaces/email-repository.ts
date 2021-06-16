import Mail from '../../entity/email';

export default interface EmailRepository {
  sendEmail(mail: Mail): Promise<any>;
}
