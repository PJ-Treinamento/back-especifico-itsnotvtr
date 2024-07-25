import { inject, injectable } from 'tsyringe';
import { Piu } from '@prisma/client';
import AppError from '@shared/errors/AppError';
import IPiusRepository from '@modules/pius/repositories/IPiusRepository';
import IUpdatePiuDTO from '@modules/pius/dtos/IUpdatePiuDTO';

interface IRequest {
  idpiu: string;
  texto: string;
}

@injectable()
export default class UpdatePiuService {
  constructor(
    @inject('PiusRepository')
    private piusRepository: IPiusRepository,
  ) {}

  public async execute({
    idpiu,
    texto
  }: IRequest): Promise<Piu> {
    const piu = await this.piusRepository.getById(idpiu);

    if (!piu) {
      throw new AppError('Piu not found.', 404);
    }

    const updateData: IUpdatePiuDTO = {
      texto,
    };

    const updatedPiu = await this.piusRepository.update(idpiu, updateData);

    return updatedPiu;
  }
}
