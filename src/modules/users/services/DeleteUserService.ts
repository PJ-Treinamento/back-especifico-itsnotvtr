import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import { User } from '@prisma/client';

interface IRequest {
  id: string;
}

@injectable()
export default class DeleteUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<User> {
    const user = await this.usersRepository.getById(id);

    if (!user) {
      throw new AppError('User not found.');
    }

    await this.usersRepository.delete(id);

    return user;
  }
}
