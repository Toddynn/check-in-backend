import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

export function GetEventCheckInLinkDocs() {
	return applyDecorators(
		ApiOperation({
			summary: 'Retorna o link de check-in de um evento',
			description:
				'Gera e retorna a URL pública de check-in do evento, com base no ID informado. Esse link pode ser compartilhado com os participantes.',
		}),
		ApiParam({
			name: 'id',
			required: true,
			type: String,
			description: 'ID do evento para o qual o link será gerado',
		}),
		ApiResponse({
			status: HttpStatus.OK,
			description: 'Link de check-in gerado com sucesso.',
			schema: {
				example: {
					link: 'https://meusite.com.br/Event/123/check-in',
				},
			},
		}),
		ApiResponse({
			status: HttpStatus.NOT_FOUND,
			description: 'Veja o schema. Evento não encontrado.',
			schema: {
				example: {
					message: 'Nenhum evento encontrado com o id: 123.',
				},
			},
		}),
		ApiResponse({
			status: HttpStatus.UNAUTHORIZED,
			description: 'Token JWT ausente ou inválido.',
		}),
		ApiResponse({
			status: HttpStatus.INTERNAL_SERVER_ERROR,
			description: 'Erro inesperado ao gerar o link.',
		}),
	);
}
