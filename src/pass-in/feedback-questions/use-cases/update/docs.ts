import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

export function UpdateFeedbackQuestionDocs() {
	return applyDecorators(
		ApiOperation({
			summary: 'Atualiza uma pergunta de feedback',
			description: 'Permite alterar os dados de uma pergunta específica vinculada a um evento.',
		}),
		ApiParam({
			name: 'id',
			description: 'ID da pergunta de feedback que será atualizada',
			type: String,
		}),
		ApiResponse({
			status: HttpStatus.OK,
			description: 'Pergunta de feedback atualizada com sucesso.',
		}),
		ApiResponse({
			status: HttpStatus.UNAUTHORIZED,
			description: 'Token JWT ausente ou inválido.',
		}),
		ApiResponse({
			status: HttpStatus.NOT_FOUND,
			description: 'Veja o schema. A pergunta não foi encontrada.',
			schema: {
				example: {
					message: 'Pergunta de feedback não encontrada',
				},
			},
		}),
	);
}
