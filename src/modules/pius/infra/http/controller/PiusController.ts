import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreatePiuService from '@modules/pius/services/CreatePiuService';
import CreateLikeService from '@modules/pius/services/CreateLikeService';
import CreateCommentsService from '@modules/pius/services/CreateCommentsService';
import UpdatePiuService from '@modules/pius/services/UpdatePiuService';
import ReadAllPiuService from '@modules/pius/services/ReadAllPiuService';
import ReadPiuService from '@modules/pius/services/ReadPiuService';
import DeletePiuService from '@modules/pius/services/DeletePiuService';
import DeleteLikeService from '@modules/pius/services/DeleteLikeService';
import DeleteCommentsService from '@modules/pius/services/DeleteCommentsService';

import AppError from '@shared/errors/AppError';


export default class PiusController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { texto, userId } = req.body;

    const createPiu = container.resolve(CreatePiuService);

    const piu = await createPiu.execute({
      texto,
      userId,
    });

    return res.status(201).json(piu);
  }

  public async createLike(req: Request, res: Response): Promise<Response> {
    const { userId, piuId } = req.body;

    const createLike = container.resolve(CreateLikeService);

    const like = await createLike.execute({
      userId,
      piuId
    });

    return res.status(201).json(like);
  }

  public async createComments(req: Request, res: Response): Promise<Response> {
    const { userId, piuId, texto} = req.body;

    const createComments = container.resolve(CreateCommentsService);

    const comments = await createComments.execute({
      userId,
      piuId,
      texto
    });

    return res.status(201).json(comments);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { idpiu } = req.params;
    const { texto } = req.body;

    const updatePiu = container.resolve(UpdatePiuService);

    const piu = await updatePiu.execute({
      idpiu,
      texto,
    });

    return res.status(200).json(piu);
  }

  public async read(req: Request, res: Response): Promise<Response> {
    const readAllPiuService = container.resolve(ReadAllPiuService);
    const pius = await readAllPiuService.execute();
    return res.json(pius);
  }

  public async readId(req: Request, res: Response): Promise<Response> {
    const { idpiu } = req.params;

    const readPiuService = container.resolve(ReadPiuService);
    const piu = await readPiuService.execute({ idpiu });

    if (!piu) {
      throw new AppError('Piu not found.', 404);
    }

    return res.json(piu);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { idpiu } = req.params;

    const deletePiu = container.resolve(DeletePiuService);
    const deletedPiu = await deletePiu.execute({ idpiu });

    return res.status(200).json(deletedPiu);
  }

  public async deleteLike(req: Request, res: Response): Promise<Response> {
    const { idlike } = req.params;

    const deleteLike = container.resolve(DeleteLikeService);
    const deletedLike = await deleteLike.execute({ idlike });

    return res.status(200).json(deletedLike);
  }

  public async deleteComments(req: Request, res: Response): Promise<Response> {
    const { idcomment } = req.params;

    const deleteComments = container.resolve(DeleteCommentsService);
    const deletedComments = await deleteComments.execute({ idcomment });

    return res.status(200).json(deletedComments);
  }

}


