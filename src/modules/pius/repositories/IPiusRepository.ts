import { Piu , Like , Comments} from '@prisma/client';

import ICreatePiuDTO from '../dtos/ICreatePiuDTO';
import IUpdatePiuDTO	 from '../dtos/IUpdatePiuDTO';
import ICreateLikeDTO from '../dtos/ICreateLikeDTO';
import ICreateCommentsDTO from '../dtos/ICreateCommentsDTO';

interface IPiusRepository {
  create(data: ICreatePiuDTO): Promise<Piu>;
  createLike({userId , piuId}: ICreateLikeDTO): Promise<Like>
  createComments({userId , piuId, texto}: ICreateCommentsDTO): Promise<Comments>
  update(idpiu: string, data: IUpdatePiuDTO): Promise<Piu>;
  delete(idpiu: string): Promise<Piu>;
  deleteLike(idlike: string): Promise<Like>
  deleteComments(idcomment: string): Promise<Comments>
  getAll(): Promise<Piu[]>;
  getById(idpiu: string): Promise<Piu | null>;
  getByLikeId(idlike: string): Promise<Like | null>;
  getByCommentId(idcomment: string): Promise<Comments | null>;
}

export default IPiusRepository;
