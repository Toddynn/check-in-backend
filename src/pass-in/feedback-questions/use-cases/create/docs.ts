import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateFeedbackQuestionDto } from '../../models/dto/create-feedback-question.dto';

export function CreateFeedbackQuestionDocs() {
	return applyDecorators(
		ApiOperation({
			summary: 'Cria uma nova pergunta de feedback',
			description: 'Somente o criador ou responsável de um evento pode adicionar perguntas de feedback vinculadas ao evento.',
		}),
		ApiResponse({
			status: HttpStatus.CREATED,
			description: 'Pergunta de feedback criada com sucesso.',
			type: CreateFeedbackQuestionDto,
		}),
		ApiResponse({
			status: HttpStatus.UNAUTHORIZED,
			description: 'Token JWT inválido ou ausente.',
		}),
		ApiResponse({
			status: HttpStatus.BAD_REQUEST,
			description: 'Dados inválidos fornecidos para criação da pergunta.',
			schema: {
				example: {
					message: ['expected_response must be a string', 'question must not be empty'],
					error: 'Bad Request',
					statusCode: 400,
				},
			},
		}),
		ApiResponse({
			status: HttpStatus.NOT_ACCEPTABLE,
			description: 'Veja o schema. Usuário sem permissão para adicionar pergunta ao evento.',
			schema: {
				example: {
					message: 'Somente o criador do evento ou um responsável pode adicionar perguntas de feedback a este evento.',
				},
			},
		}),
		ApiResponse({
			status: HttpStatus.NOT_FOUND,
			description: 'Veja o schema. Evento informado não existe.',
			schema: {
				example: {
					message: 'Nenhum evento encontrado com o id: 123456.',
				},
			},
		}),
	);
}
