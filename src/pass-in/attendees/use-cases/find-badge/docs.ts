import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

export function FindAttendeeBadgeDocs() {
	return applyDecorators(
		ApiOperation({
			summary: 'Recupera os dados do crachá de um participante',
			description:
				'Retorna os dados completos do crachá de um participante em um evento específico, incluindo dados do evento, usuário, check-in e check-out.',
		}),
		ApiParam({
			name: 'attendee_id',
			type: String,
			required: true,
			description: 'ID do participante',
		}),
		ApiParam({
			name: 'event_id',
			type: String,
			required: true,
			description: 'ID do evento',
		}),
		ApiResponse({
			status: HttpStatus.OK,
			description: 'Dados do crachá retornados com sucesso.',
		}),
		ApiResponse({
			status: HttpStatus.NOT_FOUND,
			description: 'Veja o schema. Participante ou evento não encontrados, ou participante não pertence ao evento.',
			schema: {
				examples: {
					evento_nao_encontrado: {
						summary: 'Evento não encontrado',
						value: {
							message: 'Nenhum evento encontrado com o id: b1e7f2c3-1e9b-4f3d-a60e-7fa8a3ff2a2f.',
						},
					},
					participante_nao_encontrado: {
						summary: 'Participante inexistente',
						value: {
							message: 'Participante não encontrado.',
						},
					},
					participante_nao_cadastrado: {
						summary: 'Participante não pertence ao evento',
						value: {
							message: 'Participante João Silva não cadastrado nesse evento.',
						},
					},
				},
			},
		}),
		ApiResponse({
			status: HttpStatus.INTERNAL_SERVER_ERROR,
			description: 'Erro inesperado ao buscar dados do crachá.',
		}),
	);
}
