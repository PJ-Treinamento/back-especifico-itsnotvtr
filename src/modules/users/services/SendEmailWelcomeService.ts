import { inject, injectable } from 'tsyringe';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import path from 'path';

interface IRequest {
  to: string;
  name: string;
}

@injectable()
class SendEmailWelcomeService {
  constructor(
    @inject('MailProvider')
    private mailProvider: IMailProvider,
  ) {}

  public async execute({ to, name }: IRequest): Promise<void> {
    await this.mailProvider.sendMail({
      from: {
        email: 'vtr.victor04@gmail.com',
        name: 'No Reply',
      },
      to: {
        email: to,
        name: name,
      },
      subject: 'Boas-vindas!',
      templateData: {
        file: path.resolve( __dirname, '..', 'views', 'create_account.hbs'),
        variables: {
          name,
        },
      },
    });
  }
}

export default SendEmailWelcomeService;
