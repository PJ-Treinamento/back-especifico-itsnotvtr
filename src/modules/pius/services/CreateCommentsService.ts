import { inject, injectable } from 'tsyringe';
import { Comments } from '@prisma/client';
import AppError from '@shared/errors/AppError';
import IPiusRepository from '@modules/pius/repositories/IPiusRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

interface IRequest {
  userId: string;
  piuId: string;
  texto: string;
}

@injectable()
export default class CreateCommentsService {
  constructor(
    @inject('PiusRepository')
    private piusRepository: IPiusRepository,
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) { }

  public async execute({
    userId, piuId, texto,
  }: IRequest): Promise<Comments> {
    
  const user = await this.usersRepository.getById(userId);  
    if (!user) {
      throw new AppError('User not found', 401);
    }
    
    const piu = await this.piusRepository.getById(piuId);
    if (!piu) {
      throw new AppError('Piu not found', 401);
    }

    const comments = await this.piusRepository.createComments({
      userId,
      piuId,
      texto,
    });

    return comments;
  }
}
