import { Injectable, NotAcceptableException } from '@nestjs/common';
import api from 'src/shared/lib/api';

@Injectable()
export class LogOutUseCase {
	constructor() {}

	async execute(token: string) {
		return await api
			.delete(`/login/logout`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.catch((err) => {
				throw new NotAcceptableException({ message: err.response.data.message });
			});
	}
}
