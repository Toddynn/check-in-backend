import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { Attendee } from '../../models/entities/attendee.entity';

export function FindAttendeeByEventAndUserDocs() {
	return applyDecorators(
		ApiOperation({
			summary: 'Busca um participante pelo ID do evento e ID do usuário',
			description: 'Retorna um participante vinculado a um determinado evento, com base no ID do evento e no ID do usuário.',
		}),
		ApiParam({
			name: 'event_id',
			type: String,
			required: true,
			description: 'ID do evento',
		}),
		ApiParam({
			name: 'user_id',
			type: String,
			required: true,
			description: 'ID do usuário',
		}),
		ApiResponse({
			status: HttpStatus.OK,
			description: 'Participante encontrado com sucesso.',
			type: Attendee,
		}),
		ApiResponse({
			status: HttpStatus.NOT_FOUND,
			description: 'Veja o schema. Participante, usuário ou evento não encontrado.',
			schema: {
				examples: {
					evento_inexistente: {
						summary: 'Evento não encontrado',
						value: {
							message: 'Nenhum evento encontrado com o id: b3a12e4c-983c-4a2b-84aa-54af33dd3d4c.',
						},
					},
					usuario_inexistente: {
						summary: 'Usuário não encontrado',
						value: {
							message: 'Pessoa não encontrada.',
						},
					},
					participante_nao_encontrado: {
						summary: 'Participante não vinculado ao evento',
						value: {
							message: 'Participante não encontrado',
						},
					},
				},
			},
		}),
		ApiResponse({
			status: HttpStatus.INTERNAL_SERVER_ERROR,
			description: 'Erro inesperado ao buscar participante.',
		}),
	);
}
