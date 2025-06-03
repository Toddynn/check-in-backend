import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';

export function FindAllEventMediasDocs() {
	return applyDecorators(
		ApiOperation({
			summary: 'Lista as mídias de um evento com paginação',
			description:
				'Recupera todas as mídias vinculadas a um evento específico com suporte à paginação e pesquisa.\n' +
				'Apenas mídias relacionadas ao ID do evento fornecido serão retornadas.',
		}),
		ApiQuery({
			name: 'type',
			required: false,
			description: 'Filtra o tipo da mídia (image, video ou all)',
			enum: ['image', 'video', 'all'],
		}),
		ApiResponse({
			status: HttpStatus.OK,
			description: 'Lista de mídias retornada com sucesso.',
			schema: {
				example: {
					result_rows: [
						{
							id: '123',
							name: 'foto1.jpg',
							type: 'image',
							path: '/uploads/media/123.jpg',
							event_id: 'abc123',
							created_at: '2024-10-01T12:00:00.000Z',
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
			status: HttpStatus.NOT_FOUND,
			description: 'Veja o schema. Evento inexistente ou sem mídias associadas.',
			schema: {
				examples: {
					evento_nao_encontrado: {
						summary: 'Evento não encontrado',
						value: {
							message: 'Nenhum evento encontrado com o id: abc123.',
						},
					},
					nenhuma_midia: {
						summary: 'Nenhuma mídia vinculada ao evento',
						value: {
							message: 'Nenhuma mídia encontrada.',
						},
					},
				},
			},
		}),
		ApiResponse({
			status: HttpStatus.UNAUTHORIZED,
			description: 'Token JWT ausente ou inválido.',
		}),
		ApiResponse({
			status: HttpStatus.INTERNAL_SERVER_ERROR,
			description: 'Erro inesperado ao buscar mídias.',
		}),
	);
}
