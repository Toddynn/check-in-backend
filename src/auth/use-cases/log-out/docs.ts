import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export function LogOutDocs() {
	return applyDecorators(
		ApiOperation({
			summary: 'Remove o token atual do usuário autenticado',
			description:
				'Realiza o logout do usuário autenticado, removendo o token atual do sistema externo. A operação exige que o token JWT ainda esteja válido.',
		}),
		ApiResponse({
			status: HttpStatus.OK,
			description: 'Token removido com sucesso.',
		}),
		ApiResponse({
			status: HttpStatus.NOT_ACCEPTABLE,
			description: 'Veja o schema. Token já removido ou inválido.',
			schema: {
				example: {
					message: 'Token inválido ou já expirado.',
				},
			},
		}),
		ApiResponse({
			status: HttpStatus.UNAUTHORIZED,
			description: 'Token JWT ausente ou inválido.',
		}),
		ApiResponse({
			status: HttpStatus.INTERNAL_SERVER_ERROR,
			description: 'Erro inesperado ao realizar logout.',
		}),
	);
}
