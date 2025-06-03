import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { User } from '../../models/entities/user.entity';

export function FindNotIncludedUsersInEventDocs() {
	return applyDecorators(
		ApiOperation({
			summary: 'Lista usuários não incluídos em um evento',
			description: 'Retorna todos os usuários que ainda não estão vinculados como participantes (attendees) em um evento específico.',
		}),
		ApiParam({
			name: 'event_id',
			description: 'ID do evento no qual os usuários ainda não estão incluídos',
			type: String,
		}),
		ApiResponse({
			status: HttpStatus.OK,
			description: 'Lista de usuários retornada com sucesso.',
			type: User,
			isArray: true,
		}),
		ApiResponse({
			status: HttpStatus.NOT_FOUND,
			description: 'Veja o schema. Nenhum usuário encontrado.',
			schema: {
				example: {
					message: 'Nenhum usuário encontrado.',
				},
			},
		}),
		ApiResponse({
			status: HttpStatus.UNAUTHORIZED,
			description: 'Token JWT ausente ou inválido.',
		}),
		ApiResponse({
			status: HttpStatus.INTERNAL_SERVER_ERROR,
			description: 'Erro inesperado ao buscar usuários.',
		}),
	);
}
