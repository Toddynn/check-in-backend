import { HttpException, Inject, Injectable } from '@nestjs/common';
import { UsersRepositoryInterface } from 'src/pass-in/users/models/interfaces/repository.interface';

@Injectable()
export class FindOneUserByPhoneNumberUseCase {
	constructor(
		@Inject('UsersRepositoryInterface')
		private readonly usersRepositoryInterface: UsersRepositoryInterface,
	) {}
	async execute(phone_number: string) {
		try {
			return await this.usersRepositoryInterface.findOneByPhoneNumber(phone_number);
		} catch (error) {
			throw new HttpException(error.message, error.status);
		}
	}
}
