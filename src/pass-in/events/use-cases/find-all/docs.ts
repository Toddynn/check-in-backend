import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';

export function FindAllEventsDocs() {
	return applyDecorators(
		ApiOperation({
			summary: 'Lista eventos com filtros, paginação e resumo por status',
			description:
				'Retorna uma lista paginada de eventos conforme os filtros fornecidos (software, data, texto, criador). ' +
				'Inclui dados de paginação e contagem de eventos por status (`scheduled`, `in_progress`, `finished`).',
		}),
		ApiQuery({ name: 'start_date', required: false, type: Date, description: 'Data de início (mês alvo para filtro)' }),
		ApiQuery({ name: 'only_me', required: false, type: Boolean, description: 'Se verdadeiro, traz apenas eventos do usuário' }),
		ApiQuery({ name: 'third_party_software_id', required: false, type: Number, description: 'Filtra eventos por software de terceiros' }),
		ApiResponse({
			status: HttpStatus.OK,
			description: 'Eventos retornados com sucesso.',
			schema: {
				example: {
					total_rows: {
						limit: 10,
						page: 1,
						totalpages: 3,
						totalrows: 25,
					},
					result_rows: [
						{
							id: 'event-id-1',
							title: 'Feira Tech 2024',
							start_date: '2024-08-01T12:00:00Z',
							end_date: '2024-08-03T20:00:00Z',
							status: 'scheduled',
							// outros campos...
						},
					],
					status_counts: {
						scheduled: 10,
						in_progress: 2,
						finished: 13,
					},
				},
			},
		}),
		ApiResponse({
			status: HttpStatus.BAD_REQUEST,
			description: 'Parâmetros de consulta inválidos.',
		}),
		ApiResponse({
			status: HttpStatus.UNAUTHORIZED,
			description: 'Token JWT ausente ou inválido.',
		}),
		ApiResponse({
			status: HttpStatus.NOT_FOUND,
			description: 'Veja o schema. Nenhum evento encontrado.',
			schema: {
				example: {
					message: 'Nenhum evento encontrado.',
				},
			},
		}),
		ApiResponse({
			status: HttpStatus.INTERNAL_SERVER_ERROR,
			description: 'Erro inesperado ao listar eventos.',
		}),
	);
}
