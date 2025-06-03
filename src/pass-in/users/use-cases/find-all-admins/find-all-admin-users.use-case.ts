import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { Admin } from 'src/auth/models/interfaces/admin';
import api, { passin_key } from 'src/shared/lib/api';

@Injectable()
export class FindAllAdminUsersUseCase {
	constructor() {}
	async execute() {
		try {
			const { data: admins } = await api.post(`/pessoa/passin/return`, {
				key: passin_key,
			});

			if (!admins) {
				throw new NotFoundException({ message: 'Nenhum usuário encontrado.' });
			}

			for (const admin of admins as Admin[]) {
				delete admin.documento;
			}

			return admins;
		} catch (err) {
			throw new HttpException(err.message, err.status);
		}
	}
}
