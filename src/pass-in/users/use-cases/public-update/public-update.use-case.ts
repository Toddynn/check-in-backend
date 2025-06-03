import { ConflictException, Inject, Injectable, NotAcceptableException } from '@nestjs/common';
import { UpdateUserDto } from 'src/pass-in/users/models/dto/update-user.dto';
import { UsersRepositoryInterface } from 'src/pass-in/users/models/interfaces/repository.interface';
import { ThrowHandlingStrategy } from 'src/shared/utils/functions/handle-error';
import { FindOneUserByDocumentUseCase } from '../find-one-by-document/find-one-by-document.use-case';
import { FindOneUserByEmailUseCase } from '../find-one-by-email/find-one-by-email.use-case';
import { FindOneUserByPhoneNumberUseCase } from '../find-one-by-phone/find-one-by-phone.use-case';

@Injectable()
export class PublicUpdateUserUseCase {
	constructor(
		@Inject(FindOneUserByDocumentUseCase) private readonly findOneUserByDocumentUseCase: FindOneUserByDocumentUseCase,
		@Inject(FindOneUserByEmailUseCase) private readonly findOneUserByEmailUseCase: FindOneUserByEmailUseCase,
		@Inject(FindOneUserByPhoneNumberUseCase) private readonly findOneUserByPhoneNumberUseCase: FindOneUserByPhoneNumberUseCase,
		@Inject('UsersRepositoryInterface') private readonly usersRepositoryInterface: UsersRepositoryInterface,
	) {}
	async execute(updateUserDto: UpdateUserDto) {
		if (!updateUserDto.document) throw new NotAcceptableException({ message: 'A confirmação do documento é obrigatória para a edição dos dados.' });

		const user = await this.findOneUserByDocumentUseCase.execute(updateUserDto.document, ThrowHandlingStrategy.THROW_NOT_FOUND);

		if (user.id !== updateUserDto.id) throw new NotAcceptableException({ message: 'Usuário não condiz com o documento fornecido.' });

		if (updateUserDto.email) {
			await this.verifyEmail(updateUserDto.id, updateUserDto.email);
		}
		if (updateUserDto.phone_number) {
			await this.verifyPhoneNumber(updateUserDto.id, updateUserDto.phone_number);
		}

		return await this.usersRepositoryInterface.update(updateUserDto.id, updateUserDto);
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
