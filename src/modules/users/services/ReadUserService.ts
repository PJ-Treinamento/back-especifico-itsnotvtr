import { inject, injectable } from 'tsyringe';
import { User } from '@prisma/client';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  id: string;
}

@injectable()
export default class ReadUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<User> {
    const user = await this.usersRepository.getById(id);

    if (!user) {
      throw new AppError('User not found.');
    }

    return user;
  }
}
