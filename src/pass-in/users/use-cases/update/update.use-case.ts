import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { UpdateUserDto } from 'src/pass-in/users/models/dto/update-user.dto';
import { UsersRepositoryInterface } from 'src/pass-in/users/models/interfaces/repository.interface';
import { normalizePhoneNumber } from 'src/shared/utils/functions/normalize-phone-number';
import { FindOneUserByEmailUseCase } from '../find-one-by-email/find-one-by-email.use-case';
import { FindOneUserByIdUseCase } from '../find-one-by-id/find-one-by-id.use-case';
import { FindOneUserByPhoneNumberUseCase } from '../find-one-by-phone/find-one-by-phone.use-case';

@Injectable()
export class UpdateUserUseCase {
	constructor(
		@Inject(FindOneUserByIdUseCase) private readonly findOneUserByIdUseCase: FindOneUserByIdUseCase,
		@Inject(FindOneUserByEmailUseCase) private readonly findOneUserByEmailUseCase: FindOneUserByEmailUseCase,
		@Inject(FindOneUserByPhoneNumberUseCase) private readonly findOneUserByPhoneNumberUseCase: FindOneUserByPhoneNumberUseCase,
		@Inject('UsersRepositoryInterface') private readonly usersRepositoryInterface: UsersRepositoryInterface,
	) {}
	async execute(updateUserDto: UpdateUserDto) {
		const user = await this.findOneUserByIdUseCase.execute(updateUserDto.id);

		if (updateUserDto.email) {
			await this.verifyEmail(user.id, updateUserDto.email);
		}
		if (updateUserDto.phone_number) {
			const normalizedPhone = normalizePhoneNumber(updateUserDto.phone_number);
			await this.verifyPhoneNumber(user.id, normalizedPhone);
			updateUserDto.phone_number = normalizedPhone;
		}

		return await this.usersRepositoryInterface.update(user.id, updateUserDto);
	}

	private async verifyEmail(user_id: string, email: string) {
		const same_email = await this.findOneUserByEmailUseCase.execute(email);

		if (same_email && user_id !== same_email.id) {
			throw new ConflictException({ message: `E-mail ${email} já em uso!` });
		}
	}

	private async verifyPhoneNumber(user_id: string, phone_number: string) {
		const same_phone = await this.findOneUserByPhoneNumberUseCase.execute(phone_number);

		if (same_phone && user_id !== same_phone.id) {
			throw new ConflictException({ message: `Nº de telefone ${phone_number} já em uso!` });
		}
	}
}
