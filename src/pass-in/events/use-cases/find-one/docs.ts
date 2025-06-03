import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

export const FindOneEventDocs = {
	public: () =>
		applyDecorators(
			ApiOperation({
				summary: 'Busca pública de evento por ID',
				description: 'Retorna os dados de um evento específico para exibição pública, sem autenticação.',
			}),
			ApiParam({
				name: 'id',
				type: String,
				required: true,
				description: 'ID do evento a ser consultado',
			}),
			ApiResponse({
				status: HttpStatus.OK,
				description: 'Evento retornado com sucesso.',
				schema: {
					example: {
						id: 1,
						title: 'Evento Corporativo',
						start_date: '2024-09-01T08:00:00.000Z',
						end_date: '2024-09-03T18:00:00.000Z',
						place_name: 'Centro de Convenções',
						maximum_attendees: 150,
						is_public: false,
						created_by: 'João Admin',
						created_by_login_id: 42,
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
				status: HttpStatus.INTERNAL_SERVER_ERROR,
				description: 'Erro inesperado ao buscar evento.',
			}),
		),

	admin: () =>
		applyDecorators(
			ApiOperation({
				summary: 'Busca de evento com dados administrativos',
				description: 'Retorna os dados de um evento específico com informações adicionais (ex: responsáveis), acessível somente via autenticação.',
			}),
			ApiParam({
				name: 'id',
				type: String,
				required: true,
				description: 'ID do evento a ser consultado',
			}),
			ApiResponse({
				status: HttpStatus.OK,
				description: 'Evento retornado com sucesso.',
				schema: {
					example: {
						id: 1,
						title: 'Evento Corporativo',
						start_date: '2024-09-01T08:00:00.000Z',
						end_date: '2024-09-03T18:00:00.000Z',
						place_name: 'Centro de Convenções',
						maximum_attendees: 150,
						is_public: false,
						created_by: 'João Admin',
						created_by_login_id: 42,
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
				description: 'Token de autenticação ausente ou inválido.',
			}),
			ApiResponse({
				status: HttpStatus.INTERNAL_SERVER_ERROR,
				description: 'Erro inesperado ao buscar evento.',
			}),
		),
};
