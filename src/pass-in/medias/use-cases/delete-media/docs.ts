import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export function DeleteMediaDocs() {
	return applyDecorators(
		ApiOperation({
			summary: 'Exclui uma mídia',
			description:
				'Remove uma mídia do banco de dados e do sistema de arquivos local. Se a mídia estiver vinculada a um evento, somente o criador ou um dos responsáveis pode executar a exclusão.',
		}),
		ApiResponse({
			status: HttpStatus.OK,
			description: 'Mídia excluída com sucesso.',
			schema: {
				example: {
					affected: 1,
				},
			},
		}),
		ApiResponse({
			status: HttpStatus.NOT_FOUND,
			description: 'Veja o schema. Erros ao localizar mídia ou evento.',
			schema: {
				examples: {
					midia_nao_encontrada: {
						summary: 'Mídia não encontrada',
						value: {
							message: 'Mídia não encontrada com o id: 999',
						},
					},
					evento_nao_encontrado: {
						summary: 'Evento não encontrado',
						value: {
							message: 'Nenhum evento encontrado com o id: abc123.',
						},
					},
				},
			},
		}),
		ApiResponse({
			status: HttpStatus.FORBIDDEN,
			description: 'Veja o schema. Permissões insuficientes para deletar a mídia.',
			schema: {
				example: {
					message: 'Somente o criador do evento ou um responsável pode excluir uma mídia.',
				},
			},
		}),
		ApiResponse({
			status: HttpStatus.UNAUTHORIZED,
			description: 'Token JWT ausente ou inválido.',
		}),
		ApiResponse({
			status: HttpStatus.INTERNAL_SERVER_ERROR,
			description: 'Erro inesperado ao deletar a mídia.',
		}),
	);
}
