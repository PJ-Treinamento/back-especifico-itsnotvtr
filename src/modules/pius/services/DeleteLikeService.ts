import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IPiusRepository from '@modules/pius/repositories/IPiusRepository';
import { Like } from '@prisma/client';

interface IRequest {
  idlike: string;
}

@injectable()
export default class DeleteLikeService {
  constructor(
    @inject('PiusRepository')
    private piusRepository: IPiusRepository,
  ) {}

  public async execute({ idlike }: IRequest): Promise<Like> {
    const like = await this.piusRepository.getByLikeId(idlike);

    if (!like) {
      throw new AppError('Like not found.');
    }

    await this.piusRepository.deleteLike(idlike);

    return like;
  }
}
