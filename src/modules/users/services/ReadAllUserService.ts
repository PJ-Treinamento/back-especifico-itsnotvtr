import { inject, injectable } from 'tsyringe';
import { User } from '@prisma/client';
import IUsersRepository from '../repositories/IUsersRepository';

@injectable()
export default class ReadAllUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(): Promise<User[]> {
    const users = await this.usersRepository.getAll();
    return users;
  }
}
