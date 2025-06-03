import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepositoryInterface } from 'src/pass-in/users/models/interfaces/repository.interface';

@Injectable()
export class FindAllUsersUseCase {
	constructor(@Inject('UsersRepositoryInterface') private readonly usersRepositoryInterface: UsersRepositoryInterface) {}
	async execute() {
		const users = await this.usersRepositoryInterface.findAllQuery();

		if (!users) {
			throw new NotFoundException({ message: 'Nenhum usuário encontrado.' });
		}

		return users;
	}
}
