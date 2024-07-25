import prisma from '@shared/infra/prisma/client';
import { Prisma, Piu, Like, Comments } from '@prisma/client';

import IPiusRepository from '@modules/pius/repositories/IPiusRepository';
import ICreatePiuDTO from '@modules/pius/dtos/ICreatePiuDTO';
import IUpdatePiuDTO from '@modules/pius/dtos/IUpdatePiuDTO';
import ICreateLikeDTO from '@modules/pius/dtos/ICreateLikeDTO';
import ICreateCommentsDTO from '@modules/pius/dtos/ICreateCommentsDTO';

export default class PiusRepository implements IPiusRepository {
  private ormRepository: Prisma.PiuDelegate<Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>;
  private likesRepository: Prisma.LikeDelegate<Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>;
  private commentsRepository: Prisma.CommentsDelegate<Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>;

  constructor() {
    this.ormRepository = prisma.piu;
    this.likesRepository = prisma.like;
    this.commentsRepository = prisma.comments;
  }

  public async create(data: ICreatePiuDTO): Promise<Piu> {
    const piu = await this.ormRepository.create({ data });
    return piu;
  }

  public async createLike({userId , piuId}: ICreateLikeDTO): Promise<Like> {

    const like = await this.likesRepository.create({ data: {userId, piuId} })
    return like;
    
  }
  
  public async createComments({userId , piuId, texto}: ICreateCommentsDTO): Promise<Comments> {

    const comments = await this.commentsRepository.create({ data: {userId, piuId, texto} })
    return comments;
    
  }

  public async update(idpiu: string, data: IUpdatePiuDTO): Promise<Piu> {
    const updatedPiu = await this.ormRepository.update({
      where: { idpiu },
      data,
    });
    return updatedPiu;
  }

  public async delete(idpiu: string): Promise<Piu> {
    const deletedPiu = await this.ormRepository.delete({
      where: { idpiu },
    });
    return deletedPiu;
  }

  public async deleteLike(idlike: string): Promise<Like> {

    const deletedLike = await this.likesRepository.delete({
      where: { idlike },
    });
    return deletedLike;
  }

  public async deleteComments(idcomment: string): Promise<Comments> {

    const deletedComments = await this.commentsRepository.delete({ 
      where: { idcomment }
    }) 
    return deletedComments;
    
  }

  public async getAll(): Promise<Piu[]> {
    const pius = await this.ormRepository.findMany({include: {likes: true, comments: true}});
    return pius;
  }

  public async getById(idpiu: string): Promise<Piu | null> {
    const piu = await this.ormRepository.findUnique({
      where: { idpiu },
    });
    return piu;
  }

  public async getByLikeId(idlike: string): Promise<Like | null> {
    const like = await this.likesRepository.findUnique({
      where: { idlike },
    });
    return like;
  }

  public async getByCommentId(idcomment: string): Promise<Comments | null> {
    const comments = await this.commentsRepository.findUnique({
      where: { idcomment },
    });
    return comments;
  }

}
