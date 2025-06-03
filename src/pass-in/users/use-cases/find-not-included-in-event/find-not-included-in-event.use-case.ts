import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepositoryInterface } from 'src/pass-in/users/models/interfaces/repository.interface';

@Injectable()
export class FindNotIncludedUsersInEventUseCase {
	constructor(@Inject('UsersRepositoryInterface') private readonly usersRepositoryInterface: UsersRepositoryInterface) {}
	async execute(event_id: string) {
		const users = await this.usersRepositoryInterface.findNotIncludedInEvent(event_id);

		if (!users) {
			throw new NotFoundException({ message: 'Nenhum usuário encontrado.' });
		}

		return users;
	}
}
