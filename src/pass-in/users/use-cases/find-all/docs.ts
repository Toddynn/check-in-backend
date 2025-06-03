import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { User } from '../../models/entities/user.entity';

export function FindAllUsersDocs() {
	return applyDecorators(
		ApiOperation({
			summary: 'Lista todos os usuários',
			description: 'Retorna todos os usuários cadastrados no sistema.',
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
