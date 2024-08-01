import { inject, injectable } from 'tsyringe';
import { User } from '@prisma/client';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import { hash } from 'bcryptjs';


interface IRequest {
  id: string;
  name: string;
  email: string;
  cpf: string;
  phone: string;
  password: string;
  nascimento: Date;
}

@injectable()
export default class UpdateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) { }

  public async execute({
    id, name, email, cpf, phone, password, nascimento
  }: IRequest): Promise<User> {
    const user = await this.usersRepository.getById(id);
    if (!user) {
      throw new AppError('User not found.');
    }

    const userExists = await this.usersRepository.findByEmailPhoneOrCpf(email, phone, cpf);

    if (userExists && userExists.id !== id) {
      throw new AppError('User with the same email, phone, or CPF already exists.');
    }

    const hashedPassword = await hash(password, 8);

    const updatedUser = await this.usersRepository.update(id, {
      name,
      email,
      cpf,
      password: hashedPassword,
      phone,
      nascimento,
    });

    return updatedUser;
  }
}
