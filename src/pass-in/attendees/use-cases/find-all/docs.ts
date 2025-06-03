import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Attendee } from '../../models/entities/attendee.entity';

export function FindAllAttendeesDocs() {
	return applyDecorators(
		ApiOperation({
			summary: 'Lista todos os participantes do usuário autenticado',
			description: 'Retorna todos os participantes associados ao login do usuário autenticado.\n' + 'É necessário um token de autenticação válido.',
		}),
		ApiResponse({
			status: HttpStatus.OK,
			description: 'Participantes encontrados com sucesso.',
			type: Attendee,
			isArray: true,
		}),
		ApiResponse({
			status: HttpStatus.NOT_FOUND,
			description: 'Veja o schema. Nenhum participante foi encontrado para este usuário.',
			schema: {
				examples: {
					nenhum_participante: {
						summary: 'Nenhum resultado',
						value: {
							message: 'Nenhum participante encontrado.',
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
			description: 'Erro inesperado ao listar participantes.',
		}),
	);
}
