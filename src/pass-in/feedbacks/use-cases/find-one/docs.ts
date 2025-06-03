import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

export function FindOneFeedbackByAttendeeIdDocs() {
	return applyDecorators(
		ApiOperation({
			summary: 'Busca o feedback enviado por um participante específico',
			description:
				'Retorna os dados do feedback enviado por um participante identificado pelo seu ID.\n' +
				'É necessário que o participante exista e já tenha enviado um feedback para que o retorno ocorra com sucesso.',
		}),
		ApiParam({
			name: 'attendee_id',
			required: true,
			description: 'ID do participante (attendee) que enviou o feedback',
			example: 'att_456def',
		}),
		ApiResponse({
			status: HttpStatus.OK,
			description: 'Feedback encontrado com sucesso.',
			schema: {
				example: {
					id: 88,
					event_id: 'evt_xyz789',
					attendee_id: 'att_456def',
					text: 'Muito bom, recomendo!',
					feedback_extra_answers: [
						{ question_id: 'q1', answer: 'Sim', question: 'Você participaria de novo?' },
						{ question_id: 'q2', answer: 'Mais tempo de coffee break', question: 'O que podemos melhorar?' },
					],
					created_at: '2024-09-02T09:00:00.000Z',
				},
			},
		}),
		ApiResponse({
			status: HttpStatus.NOT_FOUND,
			description: 'Veja o Schema. Feedback ou participante não encontrado.',
			schema: {
				examples: {
					feedback_nao_encontrado: {
						summary: 'Feedback inexistente',
						value: {
							message: 'Feedback não encontrado!',
						},
					},
					participante_nao_encontrado: {
						summary: 'Participante inválido',
						value: {
							message: 'Participante não encontrado.',
						},
					},
				},
			},
		}),
		ApiResponse({
			status: HttpStatus.BAD_REQUEST,
			description: 'ID do participante ausente ou mal formatado.',
		}),
		ApiResponse({
			status: HttpStatus.INTERNAL_SERVER_ERROR,
			description: 'Erro inesperado ao buscar o feedback.',
		}),
	);
}
