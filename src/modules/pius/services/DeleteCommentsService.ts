import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IPiusRepository from '@modules/pius/repositories/IPiusRepository';
import { Comments } from '@prisma/client';

interface IRequest {
  idcomment: string;
}

@injectable()
export default class DeleteCommentsService {
  constructor(
    @inject('PiusRepository')
    private piusRepository: IPiusRepository,
  ) {}

  public async execute({ idcomment }: IRequest): Promise<Comments> {
    const comments = await this.piusRepository.getByCommentId(idcomment);

    if (!comments) {
      throw new AppError('Comment not found.');
    }

    await this.piusRepository.deleteComments(idcomment);

    return comments;
  }
}
