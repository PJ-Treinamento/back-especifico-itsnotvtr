import prisma from '@shared/infra/prisma/client';
import { Prisma, User } from '@prisma/client';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IUpdateUserDTO from '@modules/users/dtos/IUpdateUserDTO';

export default class UsersRepository implements IUsersRepository {
  private ormRepository: Prisma.UserDelegate<Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>;

  constructor() {
    this.ormRepository = prisma.user;
  }
  
  public async findByEmailWithRelations(email: string): Promise<User | null> {
    const user = await this.ormRepository.findFirst({
      where: { email },
    });

    return user;
  }

  public async findByEmailPhoneOrCpf(email: string, phone: string, cpf: string): Promise<User | null> {
    const user = await this.ormRepository.findFirst({
      where: { OR: [{ email }, { phone }, { cpf }] },
    });

    return user;
  }

  public async create(data: ICreateUserDTO): Promise<User> {
    const user = await this.ormRepository.create({ data });

    return user;
  }

  public async update(id: string, data: IUpdateUserDTO): Promise<User> {
    const updatedUser = await this.ormRepository.update({
      where: { id },
      data,
    });

    return updatedUser;
  }

  public async getAll(): Promise<User[]> {
    const users = await this.ormRepository.findMany();

    return users;
  }

  public async getById(id: string): Promise<User | null> {
    const user = await this.ormRepository.findUnique({
      where: { id }
    });

    return user;
  }

  public async delete(id: string): Promise<User> {
    const deletedUser = await this.ormRepository.delete({
      where: { id },
    });

    return deletedUser;
  }

}