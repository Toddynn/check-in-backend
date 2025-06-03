import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

export function DeleteEventDocs() {
	return applyDecorators(
		ApiOperation({
			summary: 'Remove um evento',
			description:
				'Remove um evento do sistema, desde que:\n' +
				'- O usuário autenticado seja o criador ou tenha papel de master;\n' +
				'- Não existam participantes cadastrados;\n' +
				'- Não existam check-ins ou check-outs vinculados;\n' +
				'- Datas de check-in e check-out sejam removíveis;\n' +
				'- Mídias associadas sejam excluídas do disco.',
		}),
		ApiParam({
			name: 'id',
			type: String,
			required: true,
			description: 'ID do evento a ser removido',
		}),
		ApiResponse({
			status: HttpStatus.NO_CONTENT,
			description: 'Evento removido com sucesso.',
		}),
		ApiResponse({
			status: HttpStatus.NOT_ACCEPTABLE,
			description: 'Veja o schema. A remoção foi negada por regras de integridade.',
			schema: {
				examples: {
					nao_autorizado: {
						summary: 'Usuário não é o criador',
						value: {
							message: 'Somente o criador do evento pode excluí-lo',
						},
					},
					evento_com_participantes: {
						summary: 'Evento com participantes',
						value: {
							message: 'Não foi possível cancelar o evento: "Feira Tech", pois já existem participantes cadastrados. Entre em contato com a administração.',
						},
					},
					evento_com_checkins: {
						summary: 'Check-ins já realizados',
						value: {
							message: 'Não foi possível cancelar o evento: "Feira Tech", pois já existem confirmações de presença. Entre em contato com a administração.',
						},
					},
				},
			},
		}),
		ApiResponse({
			status: HttpStatus.NOT_FOUND,
			description: 'Evento não encontrado.',
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
			description: 'Erro inesperado ao tentar remover o evento.',
		}),
	);
}
