import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

export function GetEventCheckOutLinkSituationDocs() {
	return applyDecorators(
		ApiOperation({
			summary: 'Valida se o link de check-out está disponível para um evento',
			description: 'Retorna o status e o motivo (caso indisponível) sobre a possibilidade de realizar check-out no evento informado.',
		}),
		ApiParam({
			name: 'id',
			required: true,
			type: String,
			description: 'ID do evento que será validado',
		}),
		ApiResponse({
			status: HttpStatus.OK,
			description: 'Resultado da validação retornado com sucesso.',
			schema: {
				examples: {
					checkout_disponivel: {
						summary: 'Check-out disponível',
						value: {
							status: true,
							reason: undefined,
							event: {
								title: 'Semana da Inovação',
								third_party_software: 'EventoPlus',
							},
						},
					},
					evento_nao_comecou: {
						summary: 'Evento ainda não começou',
						value: {
							status: false,
							reason: 'Evento ainda não começou',
							event: {
								title: 'Semana da Inovação',
								third_party_software: 'EventoPlus',
								date: '2024-09-15T09:00:00.000Z',
							},
						},
					},
					evento_finalizado: {
						summary: 'Evento já terminou',
						value: {
							status: false,
							reason: 'Evento já terminou',
							event: {
								title: 'Semana da Inovação',
								third_party_software: 'EventoPlus',
								date: '2024-09-17T18:00:00.000Z',
							},
						},
					},
					nao_e_dia_de_checkout: {
						summary: 'Não é necessário fazer check-out hoje',
						value: {
							status: false,
							reason: 'Não é necessário fazer check-out no dia de hoje',
							event: {
								title: 'Semana da Inovação',
								third_party_software: 'EventoPlus',
							},
						},
					},
					checkout_ainda_nao_liberado: {
						summary: 'Check-out ainda não liberado',
						value: {
							status: false,
							reason: 'Check-out ainda não liberado no dia de hoje',
							event: {
								title: 'Semana da Inovação',
								third_party_software: 'EventoPlus',
								date: '2024-09-16T14:00:00.000Z',
							},
						},
					},
					checkout_prazo_encerrado: {
						summary: 'Prazo de check-out finalizado',
						value: {
							status: false,
							reason: 'O prazo para realizar o check-out já finalizou',
							event: {
								title: 'Semana da Inovação',
								third_party_software: 'EventoPlus',
								date: '2024-09-16T17:00:00.000Z',
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
					message: 'Nenhum evento encontrado com o id: 123.',
				},
			},
		}),
		ApiResponse({
			status: HttpStatus.INTERNAL_SERVER_ERROR,
			description: 'Erro inesperado ao validar link de check-out.',
		}),
	);
}
