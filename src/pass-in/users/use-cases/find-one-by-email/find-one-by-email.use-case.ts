import { HttpException, Inject, Injectable } from '@nestjs/common';
import { UsersRepositoryInterface } from 'src/pass-in/users/models/interfaces/repository.interface';

@Injectable()
export class FindOneUserByEmailUseCase {
	constructor(
		@Inject('UsersRepositoryInterface')
		private readonly usersRepositoryInterface: UsersRepositoryInterface,
	) {}
	async execute(email: string) {
		try {
			return await this.usersRepositoryInterface.findOneByEmail(email);
		} catch (error) {
			throw new HttpException(error.message, error.status);
		}
	}
}
