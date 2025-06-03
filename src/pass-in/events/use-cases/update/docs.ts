import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

export function UpdateEventDocs() {
	return applyDecorators(
		ApiOperation({
			summary: 'Atualiza um evento existente',
			description:
				'Permite atualizar os dados de um evento, incluindo datas, responsáveis, local e informações adicionais. Apenas o criador ou responsável pode atualizar o evento.',
		}),
		ApiParam({
			name: 'id',
			description: 'ID do evento que será atualizado',
			required: true,
			type: String,
		}),
		ApiResponse({
			status: HttpStatus.OK,
			description: 'Evento atualizado com sucesso.',
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
			status: HttpStatus.NOT_ACCEPTABLE,
			description: 'Veja o schema. Violação de regra de negócio.',
			schema: {
				examples: {
					sem_datas_checkin: {
						summary: 'Sem datas de check-in',
						value: {
							message: 'Não é possível deixar um evento sem datas de check in',
						},
					},
					checkout_sem_checkin: {
						summary: 'Tentativa de adicionar check-out sem check-in no mesmo dia',
						value: {
							message: 'Não é possível adicionar check-out para 20/09/2024 sem uma data de check-in correspondente.',
						},
					},
					checkin_com_registros: {
						summary: 'Tentativa de remover check-in com registros existentes',
						value: {
							message: 'A data de check-in 18/09/2024 não pode ser removida, pois há check-ins ou check-outs relacionados.',
						},
					},
					checkout_com_registros: {
						summary: 'Tentativa de remover check-out com registros existentes',
						value: {
							message: 'A data de check-out 19/09/2024 não pode ser removida, pois há registros de participantes.',
						},
					},
				},
			},
		}),
		ApiResponse({
			status: HttpStatus.BAD_REQUEST,
			description: 'Veja o schema. Dados inválidos enviados.',
			schema: {
				example: {
					message: 'A data de fechamento do check-in deve ocorrer depois da liberação do mesmo. 20/09/2024 08:00:00',
				},
			},
		}),
		ApiResponse({
			status: HttpStatus.INTERNAL_SERVER_ERROR,
			description: 'Erro inesperado ao tentar atualizar o evento.',
		}),
	);
}
