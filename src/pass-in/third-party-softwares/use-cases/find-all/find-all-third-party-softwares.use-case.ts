import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { GenericPagination } from 'src/shared/utils/dto/generic-pagination';
import { ThirdPartySoftwaresRepositoryInterface } from '../../models/interfaces/repository.interface';

@Injectable()
export class FindAllThirdPartySoftwaresUseCase {
	constructor(@Inject('ThirdPartySoftwaresRepositoryInterface') private readonly thirdPartySoftwaresRepository: ThirdPartySoftwaresRepositoryInterface) {}

	async execute({ search }: GenericPagination) {
		const tp_softwares = await this.thirdPartySoftwaresRepository.findAll({ search });

		if (!tp_softwares) {
			throw new NotFoundException({ message: `Nenhum software encontrado.` });
		}

		return tp_softwares;
	}
}
