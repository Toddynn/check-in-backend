import { Injectable, UnauthorizedException } from '@nestjs/common';
import { jwtDecode } from 'jwt-decode';
import { CurrentUser } from 'src/auth/models/interfaces/current-user';
import { UserFromJwt } from 'src/auth/models/interfaces/user-from-jwt';
import api from 'src/shared/lib/api';

@Injectable()
export class ValidateAndDecodeTokenUseCase {
	constructor() {}

	async execute(token: string): Promise<CurrentUser> {
		const isValidToken = await this.validateToken(token);

		if (!isValidToken) {
			throw new UnauthorizedException('Token inválido ou expirado.');
		}

		try {
			const decodedUser: UserFromJwt = jwtDecode(token);
			delete decodedUser.documento;

			return { user: decodedUser, token };
		} catch (error) {
			throw new UnauthorizedException('Erro ao decodificar o token.');
		}
	}

	private async validateToken(token: string): Promise<boolean> {
		try {
			const res = await api.get('/jwt/valida', {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			return res.data;
		} catch (error) {
			return false;
		}
	}
}
