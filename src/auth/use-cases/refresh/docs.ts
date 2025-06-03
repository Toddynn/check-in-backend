import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { RefreshDto } from 'src/auth/models/dto/refresh.dto';

export function RefreshDocs() {
	return applyDecorators(
		ApiOperation({
			summary: 'Atualiza o token de autenticação',
			description:
				'Recebe um refresh token válido e retorna um novo accessToken e refreshToken.\n' +
				'Caso o token esteja expirado ou inválido, será retornado erro de permissão.',
		}),
		ApiBody({
			type: RefreshDto,
			description: 'Objeto contendo o token de refresh',
		}),
		ApiResponse({
			status: HttpStatus.OK,
			description: 'Token atualizado com sucesso. Retorna novo accessToken e refreshToken.',
			schema: {
				example: {
					accessToken: 'novoAccessToken...',
					refreshToken: 'novoRefreshToken...',
				},
			},
		}),
		ApiResponse({
			status: HttpStatus.NOT_ACCEPTABLE,
			description: 'Veja o schema. Token inválido, expirado ou sem permissão.',
			schema: {
				examples: [
					{
						message: 'Sem permissão para acessar o sistema.',
					},
					{
						message: 'Erro da api externa de login',
					},
				],
			},
		}),
		ApiResponse({
			status: HttpStatus.BAD_REQUEST,
			description: 'Requisição malformada.',
		}),
		ApiResponse({
			status: HttpStatus.INTERNAL_SERVER_ERROR,
			description: 'Erro inesperado ao atualizar o token.',
		}),
	);
}
