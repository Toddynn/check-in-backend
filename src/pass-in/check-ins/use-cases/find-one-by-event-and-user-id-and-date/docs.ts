import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

export function FindOneCheckInByEventAndUserIdAndDateDocs() {
	return applyDecorators(
		ApiOperation({
			summary: 'Verifica se um usuário já realizou check-in em uma data específica',
			description: 'Verifica, com base no ID do evento, ID do usuário e uma data informada, se já existe check-in realizado para esse contexto.',
		}),
		ApiParam({
			name: 'event_id',
			required: true,
			type: String,
			description: 'ID do evento',
		}),
		ApiParam({
			name: 'user_id',
			required: true,
			type: String,
			description: 'ID do usuário',
		}),
		ApiParam({
			name: 'date',
			required: true,
			type: String,
			format: 'date-time',
			description: 'Data do check-in (formato ISO 8601)',
		}),
		ApiResponse({
			status: HttpStatus.OK,
			description: 'Resultado da verificação retornado com sucesso.',
			schema: {
				example: {
					alreadyCheckedIn: true,
				},
			},
		}),
		ApiResponse({
			status: HttpStatus.NOT_FOUND,
			description: 'Veja o schema. Participante, evento ou usuário não encontrado.',
			schema: {
				examples: {
					evento_inexistente: {
						summary: 'Evento não encontrado',
						value: {
							message: 'Nenhum evento encontrado com o id: 123.',
						},
					},
					usuario_inexistente: {
						summary: 'Usuário não encontrado',
						value: {
							message: 'Pessoa não encontrada.',
						},
					},
					participante_invalido: {
						summary: 'Usuário não é participante do evento',
						value: {
							message: 'Participante não encontrado',
						},
					},
				},
			},
		}),
		ApiResponse({
			status: HttpStatus.BAD_REQUEST,
			description: 'Parâmetros inválidos na requisição.',
		}),
		ApiResponse({
			status: HttpStatus.UNAUTHORIZED,
			description: 'Token de autenticação ausente ou inválido.',
		}),
	);
}
