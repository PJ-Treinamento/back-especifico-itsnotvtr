import { inject, injectable } from 'tsyringe';
import { Piu } from '@prisma/client';
import IPiusRepository from '@modules/pius/repositories/IPiusRepository';

@injectable()
export default class ReadAllPiuService {
  constructor(
    @inject('PiusRepository')
    private piusRepository: IPiusRepository,
  ) {}

  public async execute(): Promise<Piu[]> {
    const pius = await this.piusRepository.getAll();
    return pius;
  }
}
