import { HttpException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepositoryInterface } from '../../models/interfaces/repository.interface';

@Injectable()
export class FindOneUserByIdUseCase {
	constructor(@Inject('UsersRepositoryInterface') private readonly usersRepositoryInterface: UsersRepositoryInterface) {}
	async execute(id: string) {
		try {
			const user = await this.usersRepositoryInterface.findOneById(id);

			if (!user) {
				throw new NotFoundException({ message: 'Pessoa não encontrada.' });
			}

			return user;
		} catch (error) {
			throw new HttpException(error.message, error.status);
		}
	}
}
