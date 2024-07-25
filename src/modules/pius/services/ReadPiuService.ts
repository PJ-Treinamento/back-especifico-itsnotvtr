import { inject, injectable } from 'tsyringe';
import { Piu } from '@prisma/client';
import AppError from '@shared/errors/AppError';
import IPiusRepository from '@modules/pius/repositories/IPiusRepository';

interface IRequest {
  idpiu: string;
}

@injectable()
export default class ReadPiuService {
  constructor(
    @inject('PiusRepository')
    private piusRepository: IPiusRepository,
  ) {}

  public async execute({ idpiu }: IRequest): Promise<Piu> {
    const piu = await this.piusRepository.getById(idpiu);

    if (!piu) {
      throw new AppError('Piu not found.');
    }

    return piu;
  }
}
