import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

export function DeleteFeedbackQuestionDocs() {
	return applyDecorators(
		ApiOperation({
			summary: 'Remove uma pergunta de feedback',
			description: 'A pergunta só pode ser excluída caso não existam feedbacks associados a ela.',
		}),
		ApiParam({
			name: 'id',
			description: 'ID da pergunta de feedback a ser excluída',
			type: String,
		}),
		ApiResponse({
			status: HttpStatus.OK,
			description: 'Pergunta excluída com sucesso.',
		}),
		ApiResponse({
			status: HttpStatus.UNAUTHORIZED,
			description: 'Token JWT ausente ou inválido.',
		}),
		ApiResponse({
			status: HttpStatus.NOT_FOUND,
			description: 'Veja o schema. A pergunta informada não foi encontrada.',
			schema: {
				example: {
					message: 'Pergunta de feedback não encontrada',
				},
			},
		}),
		ApiResponse({
			status: HttpStatus.NOT_ACCEPTABLE,
			description: 'Veja o schema. Existe(m) feedback(s) associados à pergunta.',
			schema: {
				example: {
					message: 'Há 3 feedbacks associados a essa pergunta. Não é possível excluir uma pergunta com feedbacks associados.',
				},
			},
		}),
	);
}
