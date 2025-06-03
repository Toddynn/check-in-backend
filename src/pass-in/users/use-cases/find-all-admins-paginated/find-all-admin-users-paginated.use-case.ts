import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { Admin } from 'src/auth/models/interfaces/admin';
import api, { passin_key } from 'src/shared/lib/api';
import { GenericPagination } from 'src/shared/utils/dto/generic-pagination';

@Injectable()
export class FindAllAdminUsersPaginatedUseCase {
	constructor() {}
	async execute({ page, quantity, search }: GenericPagination) {
		let params = `?`;
		if (page) params += `pagina=${page}&`;
		if (quantity) params += `quantidade=${quantity}&`;
		if (search) params += `nome=${search}&`;

		try {
			const { data: admins } = await api.post(`/pessoa/passin/return${params}`, {
				key: passin_key,
			});

			if (!admins) {
				throw new NotFoundException({ message: 'Nenhum usuário encontrado.' });
			}

			for (const admin of admins as Admin[]) {
				delete admin.documento;
			}

			const totalPages = Math.ceil(admins.length / quantity);

			return {
				result_rows: admins,
				total_rows: {
					limit: Number(quantity),
					page: Number(page),
					totalpages: totalPages,
					totalrows: admins.length,
				},
			};
		} catch (err) {
			throw new HttpException(err.message, err.status);
		}
	}
}
