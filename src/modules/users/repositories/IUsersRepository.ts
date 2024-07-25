import { User } from '@prisma/client';

import ICreateUserDTO from '../dtos/ICreateUserDTO';
import IUpdateUserDTO from '../dtos/IUpdateUserDTO';

interface IUsersRepository {
  findByEmailPhoneOrCpf(email: string, phone: string, cpf: string): Promise<User | null>;
  create(data: ICreateUserDTO): Promise<User>;
  update(id: string, data: IUpdateUserDTO): Promise<User>;
  delete(id: string): Promise<User>;
  getAll(): Promise<User[]>;
  getById(id: string): Promise<User | null>;
  findByEmailWithRelations(email: string): Promise<User | null>;
}

export default IUsersRepository;
