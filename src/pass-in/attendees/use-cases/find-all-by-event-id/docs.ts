import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

export function FindAllAttendeesByEventIdDocs() {
	return applyDecorators(
		ApiOperation({
			summary: 'Lista todos os participantes de um evento',
			description:
				'Retorna todos os participantes associados ao evento especificado pelo ID.\n' +
				'Inclui dados relacionados como check-in, check-out e dados básicos do evento e do usuário.',
		}),
		ApiParam({
			name: 'event_id',
			type: String,
			required: true,
			description: 'ID do evento para o qual os participantes devem ser listados.',
		}),
		ApiResponse({
			status: HttpStatus.OK,
			description: 'Participantes encontrados com sucesso.',
		}),
		ApiResponse({
			status: HttpStatus.NOT_FOUND,
			description: 'Veja o schema. Nenhum participante encontrado ou evento inexistente.',
			schema: {
				examples: {
					evento_inexistente: {
						summary: 'Evento não encontrado',
						value: {
							message: 'Evento não encontrado.',
						},
					},
					sem_participantes: {
						summary: 'Evento sem participantes',
						value: {
							message: 'Nenhum participante encontrado no evento Workshop NestJS.',
						},
					},
				},
			},
		}),
		ApiResponse({
			status: HttpStatus.UNAUTHORIZED,
			description: 'Token de autenticação ausente ou inválido.',
		}),
		ApiResponse({
			status: HttpStatus.INTERNAL_SERVER_ERROR,
			description: 'Erro inesperado ao buscar os participantes.',
		}),
	);
}
