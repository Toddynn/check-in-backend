import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

export function FindOneEventWithAttendeesDocs() {
	return applyDecorators(
		ApiOperation({
			summary: 'Busca um evento com lista de participantes e datas de check-in/check-out',
			description: 'Retorna um evento com todos os dados principais, participantes associados, datas únicas de check-ins e check-outs realizados.',
		}),
		ApiParam({
			name: 'id',
			required: true,
			type: String,
			description: 'ID do evento a ser consultado',
		}),
		ApiResponse({
			status: HttpStatus.OK,
			description: 'Evento e seus participantes retornados com sucesso.',
			schema: {
				example: {
					id: 'd1c5e233-9911-4f9d-9136-a18f679ae811',
					title: 'Evento Técnico de Liderança',
					start_date: '2024-09-05T09:00:00.000Z',
					end_date: '2024-09-07T18:00:00.000Z',
					status: 'Em Progresso',
					attendees: [
						{
							id: 'a1b2c3',
							user: {
								name: 'João Silva',
								email: 'joao@email.com',
							},
							check_in: [{ created_at: '2024-09-05T09:05:00.000Z' }],
							check_out: [{ created_at: '2024-09-05T18:00:00.000Z' }],
						},
					],
					dates_with_check_ins: ['2024-09-05T09:05:00.000Z'],
					dates_with_check_outs: ['2024-09-05T18:00:00.000Z'],
				},
			},
		}),
		ApiResponse({
			status: HttpStatus.NOT_FOUND,
			description: 'Veja o schema. Evento não encontrado.',
			schema: {
				example: {
					message: 'Nenhum evento encontrado com o id: 123.',
				},
			},
		}),
		ApiResponse({
			status: HttpStatus.UNAUTHORIZED,
			description: 'Token JWT ausente ou inválido.',
		}),
		ApiResponse({
			status: HttpStatus.INTERNAL_SERVER_ERROR,
			description: 'Erro inesperado ao buscar evento com participantes.',
		}),
	);
}
