import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

export function FindAllFeedbacksByEventIdAndAdminDocs() {
	return applyDecorators(
		ApiOperation({
			summary: 'Busca todos os feedbacks de administradores por evento',
			description:
				'Retorna todos os feedbacks criados manualmente por administradores para o evento informado.\n' +
				'Os resultados são paginados e ordenados por data de criação (mais recentes primeiro).',
		}),
		ApiParam({
			name: 'event_id',
			required: true,
			description: 'ID do evento para o qual se deseja buscar os feedbacks administrativos',
			example: 'evt_abc123',
		}),
		ApiResponse({
			status: HttpStatus.OK,
			description: 'Lista paginada de feedbacks administrativos encontrados para o evento.',
			schema: {
				example: {
					result_rows: [
						{
							id: 12,
							event_id: 'evt_abc123',
							admin_id: 42,
							admin: 'João Admin',
							text: 'Excelente evento, muito bem organizado.',
							answers: [
								{ question_id: 'q1', answer: 'Sim' },
								{ question_id: 'q2', answer: 'Nada a melhorar' },
							],
							created_at: '2024-08-29T15:00:00.000Z',
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
			description: 'Nenhum feedback encontrado para o evento informado.',
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
