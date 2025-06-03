import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

export function GetEventSubscriptionLinkDocs() {
	return applyDecorators(
		ApiOperation({
			summary: 'Retorna o link de inscrição de um evento',
			description: 'Gera e retorna a URL pública para inscrição no evento informado. Esse link pode ser compartilhado com os interessados.',
		}),
		ApiParam({
			name: 'id',
			required: true,
			type: String,
			description: 'ID do evento para o qual o link de inscrição será gerado',
		}),
		ApiResponse({
			status: HttpStatus.OK,
			description: 'Link de inscrição gerado com sucesso.',
			schema: {
				example: {
					link: 'https://meusite.com.br/Event/abc123',
				},
			},
		}),
		ApiResponse({
			status: HttpStatus.NOT_FOUND,
			description: 'Veja o schema. Evento não encontrado.',
			schema: {
				example: {
					message: 'Nenhum evento encontrado com o id: abc123.',
				},
			},
		}),
		ApiResponse({
			status: HttpStatus.UNAUTHORIZED,
			description: 'Token JWT ausente ou inválido.',
		}),
		ApiResponse({
			status: HttpStatus.INTERNAL_SERVER_ERROR,
			description: 'Erro inesperado ao gerar o link de inscrição.',
		}),
	);
}
