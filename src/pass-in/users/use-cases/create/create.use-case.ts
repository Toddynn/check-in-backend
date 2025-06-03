import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/pass-in/users/models/dto/create-user.dto';
import { UsersRepositoryInterface } from 'src/pass-in/users/models/interfaces/repository.interface';
import { ThrowHandlingStrategy } from 'src/shared/utils/functions/handle-error';
import { normalizePhoneNumber } from 'src/shared/utils/functions/normalize-phone-number';
import { User } from '../../models/entities/user.entity';
import { FindOneUserByDocumentUseCase } from '../find-one-by-document/find-one-by-document.use-case';
import { FindOneUserByEmailUseCase } from '../find-one-by-email/find-one-by-email.use-case';
import { FindOneUserByPhoneNumberUseCase } from '../find-one-by-phone/find-one-by-phone.use-case';

@Injectable()
export class CreateUserUseCase {
	constructor(
		@Inject(FindOneUserByDocumentUseCase) private readonly findOneUserByDocumentUseCase: FindOneUserByDocumentUseCase,
		@Inject(FindOneUserByEmailUseCase) private readonly findOneUserByEmailUseCase: FindOneUserByEmailUseCase,
		@Inject(FindOneUserByPhoneNumberUseCase) private readonly findOneUserByPhoneNumberUseCase: FindOneUserByPhoneNumberUseCase,
		@Inject('UsersRepositoryInterface') private readonly usersRepositoryInterface: UsersRepositoryInterface,
	) {}

	async execute(createUserDto: CreateUserDto): Promise<User> {
		await this.findOneUserByDocumentUseCase.execute(createUserDto.document, ThrowHandlingStrategy.THROW_IF_FOUND);

		await this.verifyEmail(createUserDto.email);

		if (createUserDto.phone_number) {
			const normalizedPhone = normalizePhoneNumber(createUserDto.phone_number);
			await this.verifyPhoneNumber(normalizedPhone);
			createUserDto.phone_number = normalizedPhone;
		}

		return await this.usersRepositoryInterface.create(createUserDto);
	}

	private async verifyEmail(email: string) {
		const same_email = await this.findOneUserByEmailUseCase.execute(email);

		if (same_email) {
			throw new ConflictException({ message: `E-mail ${email} já em uso!` });
		}
	}

	private async verifyPhoneNumber(phone_number: string) {
		const same_phone = await this.findOneUserByPhoneNumberUseCase.execute(phone_number);

		if (same_phone) {
			throw new ConflictException({ message: `Nº de telefone ${phone_number} já em uso!` });
		}
	}
}
