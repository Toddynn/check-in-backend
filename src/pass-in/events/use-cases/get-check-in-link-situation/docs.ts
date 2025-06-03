import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

export function GetEventCheckInLinkSituationDocs() {
	return applyDecorators(
		ApiOperation({
			summary: 'Valida se o link de check-in está disponível para um evento',
			description:
				'Retorna status e motivo (se houver) para a (in)disponibilidade do link de check-in com base no período do evento e configurações de data.',
		}),
		ApiParam({
			name: 'id',
			required: true,
			type: String,
			description: 'ID do evento que será validado',
		}),
		ApiResponse({
			status: HttpStatus.OK,
			description: 'Veja o schema. Resultado da validação retornado com sucesso.',
			schema: {
				examples: {
					checkin_disponivel: {
						summary: 'Check-in disponível',
						value: {
							status: true,
							reason: undefined,
							event: {
								title: 'Feira de Tecnologia 2024',
								third_party_software: 'PlataformaGov',
							},
						},
					},
					evento_nao_comecou: {
						summary: 'Evento ainda não começou',
						value: {
							status: false,
							reason: 'Evento ainda não começou',
							event: {
								title: 'Feira de Tecnologia 2024',
								third_party_software: 'PlataformaGov',
								date: '2024-09-10T09:00:00.000Z',
							},
						},
					},
					evento_finalizado: {
						summary: 'Evento já terminou',
						value: {
							status: false,
							reason: 'Evento já terminou',
							event: {
								title: 'Feira de Tecnologia 2024',
								third_party_software: 'PlataformaGov',
								date: '2024-09-12T18:00:00.000Z',
							},
						},
					},
					nao_e_dia_de_checkin: {
						summary: 'Não é necessário fazer check-in hoje',
						value: {
							status: false,
							reason: 'Não é necessário fazer check-in no dia de hoje',
							event: {
								title: 'Feira de Tecnologia 2024',
								third_party_software: 'PlataformaGov',
							},
						},
					},
					checkin_fora_do_horario: {
						summary: 'Check-in fora do horário permitido',
						value: {
							status: false,
							reason: 'O prazo para realizar o check-in já finalizou',
							event: {
								title: 'Feira de Tecnologia 2024',
								third_party_software: 'PlataformaGov',
								date: '2024-09-11T11:00:00.000Z',
							},
						},
					},
					checkin_ainda_nao_liberado: {
						summary: 'Check-in ainda não liberado no dia de hoje',
						value: {
							status: false,
							reason: 'Check-in ainda não liberado no dia de hoje',
							event: {
								title: 'Feira de Tecnologia 2024',
								third_party_software: 'PlataformaGov',
								date: '2024-09-11T14:00:00.000Z',
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
			description: 'Erro inesperado ao validar link de check-in.',
		}),
	);
}
