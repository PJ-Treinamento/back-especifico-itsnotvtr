import { inject, injectable } from 'tsyringe';
import { User } from '@prisma/client';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import { hash } from 'bcryptjs';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import path from 'path';

interface IRequest {
  name: string;
  email: string;
  cpf: string;
  phone: string;
  password: string;
  nascimento: Date;
}

@injectable()
export default class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  
    @inject('MailProvider')
    private mailProvider: IMailProvider,

  ) {}

  public async execute({
    name,
    email,
    cpf,
    phone,
    password,
    nascimento,
  }: IRequest): Promise<User> {
    const userExists = await this.usersRepository.findByEmailPhoneOrCpf(email, phone, cpf);

    if (userExists) {
      throw new AppError('User with the same email, phone, or CPF already exists.');
    }

    const hashedPassword = await hash(password, 8);

    const user = await this.usersRepository.create({
      name,
      email,
      cpf,
      phone,
      password: hashedPassword,
      nascimento,
    });

    await this.mailProvider.sendMail({
      from: {
        email: 'vtr.victor04@gmail.com',
        name: 'No Reply',
      },
      to: {
        email,
        name,
      },
      subject: 'Boas-vindas!',
      templateData: {
        file: path.resolve( __dirname, '..', 'views', 'create_account.hbs'),
        variables: {
          name,
        },
      },
    });

    return user;
  }
}
