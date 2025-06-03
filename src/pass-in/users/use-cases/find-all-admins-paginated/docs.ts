import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export function FindAllAdminUsersPaginatedDocs() {
	return applyDecorators(
		ApiOperation({
			summary: 'Lista usuários administradores com paginação',
			description:
				'Retorna os usuários com perfil de administrador do sistema externo. Permite paginação e busca por nome. O campo `documento` é removido da resposta.',
		}),
		ApiResponse({
			status: HttpStatus.OK,
			description: 'Lista paginada de administradores retornada com sucesso.',
			schema: {
				example: {
					result_rows: [
						{
							id: 1,
							nome: 'Carlos Tech',
							email: 'carlos.tech@empresa.com',
							colaborador: true,
							login: {
								id: 1,
							},
						},
					],
					total_rows: {
						limit: 10,
						page: 1,
						totalpages: 1,
						totalrows: 1,
					},
				},
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
