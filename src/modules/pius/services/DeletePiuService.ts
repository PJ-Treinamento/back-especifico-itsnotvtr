import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IPiusRepository from '@modules/pius/repositories/IPiusRepository';
import { Piu } from '@prisma/client';

interface IRequest {
  idpiu: string;
}

@injectable()
export default class DeletePiuService {
  constructor(
    @inject('PiusRepository')
    private piusRepository: IPiusRepository,
  ) {}

  public async execute({ idpiu }: IRequest): Promise<Piu> {
    const piu = await this.piusRepository.getById(idpiu);

    if (!piu) {
      throw new AppError('Piu not found.');
    }

    await this.piusRepository.delete(idpiu);

    return piu;
  }
}
