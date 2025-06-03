import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { RefreshDto } from 'src/auth/models/dto/refresh.dto';
import api from 'src/shared/lib/api';
import { ValidateAndDecodeTokenUseCase } from '../validate-and-decode-token/validate-and-decode-token.use-case';

@Injectable()
export class RefreshUseCase {
	constructor(
		@Inject(ValidateAndDecodeTokenUseCase)
		private readonly validateAndDecodeTokenUseCase: ValidateAndDecodeTokenUseCase,
	) {}

	async execute({ token }: RefreshDto) {
		return await api
			.get('/jwt/refresh', {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then(async (res) => {
				const token = res.data.access_token;

				return await this.validateAndDecodeTokenUseCase.execute(token);
			})
			.catch((error) => {
				if (error.response && error.response.data) {
					const status = error.response.status || HttpStatus.INTERNAL_SERVER_ERROR;
					const message = error.response.data.message || 'Erro desconhecido da API de autenticação.';

					throw new HttpException(message, status);
				}

				throw new HttpException('Erro ao conectar com a API de login.', HttpStatus.BAD_REQUEST);
			});
	}
}
