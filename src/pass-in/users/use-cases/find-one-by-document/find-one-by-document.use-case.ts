import { Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersRepositoryInterface } from 'src/pass-in/users/models/interfaces/repository.interface';
import { handleError, ThrowHandlingStrategy } from 'src/shared/utils/functions/handle-error';
import { User } from '../../models/entities/user.entity';

@Injectable()
export class FindOneUserByDocumentUseCase {
	constructor(@Inject('UsersRepositoryInterface') private readonly usersRepositoryInterface: UsersRepositoryInterface) {}
	async execute(document: string, throw_strategy: ThrowHandlingStrategy) {
		const document_identifier = document.slice(-3);
		const users = await this.usersRepositoryInterface.findAllQueryWithDocumentIdentifier(document_identifier);

		let match = false;

		let user: User = null;
		for (const u of users) {
			if (document.length === 11 || document.length === 14) {
				match = await bcrypt.compare(document, u.document);
			} else {
				match = document === u.document;
			}

			if (match) {
				user = u;
			}
		}

		let error_message: string = '';
		if (!user && throw_strategy === ThrowHandlingStrategy.THROW_NOT_FOUND) {
			error_message = 'Usuário não encontrado.';
			handleError(throw_strategy, error_message);
		}
		if (user && throw_strategy === ThrowHandlingStrategy.THROW_IF_FOUND) {
			error_message = 'Usuário já cadastrado.';
			handleError(throw_strategy, error_message);
		}
		return user;
	}
}
