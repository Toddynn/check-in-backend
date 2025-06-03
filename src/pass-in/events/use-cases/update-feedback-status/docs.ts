import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

export function UpdateEventFeedbackStatusDocs() {
	return applyDecorators(
		ApiOperation({
			summary: 'Atualiza o status de feedback de um evento',
			description: 'Permite habilitar ou desabilitar a coleta de feedback dos participantes do evento.',
		}),
		ApiParam({
			name: 'id',
			description: 'ID do evento que terá o feedback ativado ou desativado',
			required: true,
			type: String,
		}),
		ApiResponse({
			status: HttpStatus.OK,
			description: 'Status de feedback atualizado com sucesso.',
		}),
		ApiResponse({
			status: HttpStatus.NOT_FOUND,
			description: 'Veja o schema. Evento não encontrado.',
			schema: {
				example: {
					message: 'Nenhum evento encontrado com o id: abc123.',
				},
			},
		}),
		ApiResponse({
			status: HttpStatus.UNAUTHORIZED,
			description: 'Token JWT ausente ou inválido.',
		}),
		ApiResponse({
			status: HttpStatus.NOT_ACCEPTABLE,
			description: 'Veja o schema. Usuário sem permissão para editar o evento.',
			schema: {
				example: {
					message: 'Somente o criador do evento ou um responsável pode adicionar perguntas de feedback a este evento.',
				},
			},
		}),
		ApiResponse({
			status: HttpStatus.INTERNAL_SERVER_ERROR,
			description: 'Erro inesperado ao tentar atualizar o status do feedback.',
		}),
	);
}
