import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateAttendeeFeedbackDto } from '../../models/dto/create-attendee-feedback.dto';

export function CreateAttendeeFeedbackDocs() {
	return applyDecorators(
		ApiOperation({
			summary: 'Cria um feedback como participante',
			description:
				'Permite que um participante envie feedback para um evento, incluindo respostas extras personalizadas.\n' +
				'É necessário que o participante exista no sistema e ainda **não tenha enviado feedback** anteriormente.',
		}),
		ApiBody({
			type: CreateAttendeeFeedbackDto,
			description: 'Informações completas do feedback, incluindo ID do participante e respostas extras vinculadas a perguntas do evento.',
		}),
		ApiResponse({
			status: HttpStatus.CREATED,
			description: 'Feedback criado com sucesso.',
			schema: {
				example: {
					id: 12,
					event_id: 'evt_abc123',
					attendee_id: 'att_456',
					text: 'Foi ótimo participar desse evento!',
					feedback_extra_answers: [
						{ question_id: 'q1', answer: 'Sim', question: 'Você voltaria a participar?' },
						{ question_id: 'q2', answer: 'Melhorar o coffee break', question: 'O que podemos melhorar?' },
					],
					created_at: '2024-08-30T15:42:10.000Z',
				},
			},
		}),
		ApiResponse({
			status: HttpStatus.NOT_ACCEPTABLE,
			description: 'Veja o schema. Erros de negócio ou dados inconsistentes.',
			schema: {
				examples: {
					participante_ja_enviou_feedback: {
						summary: 'Feedback duplicado',
						value: {
							message: 'Participante já deu um feedback!',
						},
					},
					participante_nao_encontrado: {
						summary: 'Participante inválido',
						value: {
							message: 'Participante não encontrado!',
						},
					},
				},
			},
		}),
		ApiResponse({
			status: HttpStatus.BAD_REQUEST,
			description: 'Dados inválidos no corpo da requisição.',
		}),
		ApiResponse({
			status: HttpStatus.UNAUTHORIZED,
			description: 'Token JWT ausente ou inválido (se exigido por outras rotas).',
		}),
		ApiResponse({
			status: HttpStatus.INTERNAL_SERVER_ERROR,
			description: 'Erro inesperado ao criar o feedback.',
		}),
	);
}
