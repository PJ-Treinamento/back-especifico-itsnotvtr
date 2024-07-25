import { inject, injectable } from 'tsyringe';
import { Piu } from '@prisma/client';
import AppError from '@shared/errors/AppError';
import IPiusRepository from '@modules/pius/repositories/IPiusRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

interface IRequest {
  texto: string;
  userId: string;
}

@injectable()
export default class CreatePiuService {
  constructor(
    @inject('PiusRepository')
    private piusRepository: IPiusRepository,
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) { }

  public async execute({
    texto, userId
  }: IRequest): Promise<Piu> {
    
    const user = await this.usersRepository.getById(userId);  
    if (!user) {
      throw new AppError('User not found', 401);
    }
    
    const piu = await this.piusRepository.create({
      texto,
      userId,
    });

    return piu;
  }
}
