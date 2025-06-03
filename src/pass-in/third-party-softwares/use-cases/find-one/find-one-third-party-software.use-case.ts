import { HttpException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ThirdPartySoftwaresRepositoryInterface } from '../../models/interfaces/repository.interface';

@Injectable()
export class FindOneThirdPartySoftwareUseCase {
	constructor(@Inject('ThirdPartySoftwaresRepositoryInterface') private readonly thirdPartySoftwaresRepository: ThirdPartySoftwaresRepositoryInterface) {}

	async execute(id: number) {
		try {
			const thirdPartySoftware = await this.thirdPartySoftwaresRepository.findOne(id);

			if (!thirdPartySoftware) throw new NotFoundException({ message: `Software não encontrado com o id #${id}!` });
			return thirdPartySoftware;
		} catch (err) {
			throw new HttpException(err.message, err.status);
		}
	}
}
