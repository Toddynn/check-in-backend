import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

export function GetEventCheckOutLinkDocs() {
	return applyDecorators(
		ApiOperation({
			summary: 'Retorna o link de check-out de um evento',
			description:
				'Gera e retorna a URL pública de check-out do evento com base no ID informado. Essa URL pode ser compartilhada com os participantes.',
		}),
		ApiParam({
			name: 'id',
			required: true,
			type: String,
			description: 'ID do evento para o qual o link será gerado',
		}),
		ApiResponse({
			status: HttpStatus.OK,
			description: 'Link de check-out gerado com sucesso.',
			schema: {
				example: {
					link: 'https://meusite.com.br/Event/123/check-out',
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
