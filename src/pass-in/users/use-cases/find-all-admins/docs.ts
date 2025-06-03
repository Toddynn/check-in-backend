import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export function FindAllAdminUsersDocs() {
	return applyDecorators(
		ApiOperation({
			summary: 'Lista todos os usuários administradores (sem paginação)',
			description:
				'Busca e retorna todos os usuários com perfil de administrador cadastrados no sistema externo. Remove o campo `documento` da resposta.',
		}),
		ApiResponse({
			status: HttpStatus.OK,
			description: 'Lista de administradores retornada com sucesso.',
			schema: {
				example: [
					{
						id: 42,
						nome: 'Maria Souza',
						email: 'maria.souza@empresa.com',
						colaborador: true,
						login: {
							id: 42,
						},
					},
				],
			},
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
			description: 'Erro inesperado ao buscar usuários administradores.',
		}),
	);
}
