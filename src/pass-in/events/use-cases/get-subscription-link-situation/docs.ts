import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

export function GetEventSubscriptionLinkSituationDocs() {
	return applyDecorators(
		ApiOperation({
			summary: 'Valida se o link de inscrição para um evento está disponível',
			description: 'Verifica se o evento ainda permite inscrições com base na data de término.',
		}),
		ApiParam({
			name: 'id',
			required: true,
			type: String,
			description: 'ID do evento que será validado',
		}),
		ApiResponse({
			status: HttpStatus.OK,
			description: 'Status de disponibilidade retornado com sucesso.',
			schema: {
				examples: {
					inscricao_disponivel: {
						summary: 'Inscrição disponível',
						value: {
							status: true,
							reason: undefined,
						},
					},
					evento_encerrado: {
						summary: 'Evento já terminou',
						value: {
							status: false,
							reason: 'Evento já terminou',
							event: {
								title: 'Hackathon 2024',
								third_party_software: 'PormadeEvents',
								end_date: '2024-09-28T18:00:00.000Z',
							},
						},
					},
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
			status: HttpStatus.BAD_REQUEST,
			description: 'Parâmetros inválidos na requisição.',
		}),
		ApiResponse({
			status: HttpStatus.INTERNAL_SERVER_ERROR,
			description: 'Erro inesperado ao validar o link de inscrição.',
		}),
	);
}
