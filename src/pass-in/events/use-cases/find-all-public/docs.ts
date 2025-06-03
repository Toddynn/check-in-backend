import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export function FindAllPublicEventsDocs() {
	return applyDecorators(
		ApiOperation({
			summary: 'Lista paginada de eventos disponíveis publicamente',
			description:
				'Retorna uma lista paginada de eventos com visibilidade pública, considerando filtro por título e eventos ativos desde os últimos 7 dias até os futuros.',
		}),
		ApiResponse({
			status: HttpStatus.OK,
			description: 'Eventos visíveis publicamente retornados com sucesso.',
			schema: {
				example: {
					result_rows: [
						{
							id: 'uuid-evento',
							title: 'Hackathon Dev 2024',
							start_date: '2024-08-15T09:00:00.000Z',
							end_date: '2024-08-17T18:00:00.000Z',
							is_public: true,
							status: 'scheduled',
							check_in_dates: [],
							check_out_dates: [],
							third_party_software: { name: 'EventosGov' },
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
			description: 'Parâmetros inválidos na requisição.',
		}),
		ApiResponse({
			status: HttpStatus.NOT_FOUND,
			description: 'Nenhum evento encontrado.',
		}),
		ApiResponse({
			status: HttpStatus.INTERNAL_SERVER_ERROR,
			description: 'Erro inesperado ao listar eventos disponíveis publicamente.',
		}),
	);
}
