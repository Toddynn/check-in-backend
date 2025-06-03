import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

export function FindAllFeedbacksByEventIdAndAttendeeDocs() {
	return applyDecorators(
		ApiOperation({
			summary: 'Busca todos os feedbacks de participantes por evento',
			description:
				'Retorna todos os feedbacks enviados por participantes (não administradores) para o evento especificado.\n' +
				'A resposta inclui os dados das perguntas associadas e o usuário relacionado ao participante.\n' +
				'Os resultados são paginados e ordenados por data de criação (mais recentes primeiro).',
		}),
		ApiParam({
			name: 'event_id',
			required: true,
			description: 'ID do evento para o qual os feedbacks de participantes serão buscados',
			example: 'evt_abc123',
		}),
		ApiResponse({
			status: HttpStatus.OK,
			description: 'Lista paginada de feedbacks de participantes encontrados para o evento.',
			schema: {
				example: {
					result_rows: [
						{
							id: 55,
							event_id: 'evt_abc123',
							attendee_id: 'att_xyz789',
							text: 'Gostei da organização e da interação com o público.',
							feedback_extra_answers: [
								{ question_id: 'q1', answer: 'Sim', question: 'Você recomendaria o evento?' },
								{ question_id: 'q2', answer: 'Mais tempo para perguntas', question: 'Sugestões de melhoria?' },
							],
							created_at: '2024-09-01T12:45:00.000Z',
							attendee: {
								user: {
									id: 999,
									nome: 'Maria Participante',
								},
							},
							event: {
								feedback_questions: [
									{ id: 'q1', question: 'Você recomendaria o evento?', expected_response: 'Sim' },
									{ id: 'q2', question: 'Sugestões de melhoria?', expected_response: 'Texto livre' },
								],
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
			status: HttpStatus.BAD_REQUEST,
			description: 'ID do evento ausente ou inválido.',
			schema: {
				example: {
					statusCode: 400,
					message: 'Event ID is required.',
					error: 'Bad Request',
				},
			},
		}),
		ApiResponse({
			status: HttpStatus.NOT_FOUND,
			description: 'Nenhum feedback de participante encontrado para o evento.',
			schema: {
				example: {
					message: 'Nenhum Feedback encontrado.',
				},
			},
		}),
		ApiResponse({
			status: HttpStatus.UNAUTHORIZED,
			description: 'Token JWT ausente ou inválido.',
		}),
		ApiResponse({
			status: HttpStatus.INTERNAL_SERVER_ERROR,
			description: 'Erro inesperado ao buscar feedbacks.',
		}),
	);
}
