import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

export function GetChartTotalCheckInsAndCheckOutsByEventIdDocs() {
	return applyDecorators(
		ApiOperation({
			summary: 'Retorna estatísticas de check-ins e check-outs por evento',
			description:
				'Retorna a quantidade total de participantes, check-ins e check-outs agrupados por data, além dos totais esperados conforme a configuração do evento.',
		}),
		ApiParam({
			name: 'id',
			required: true,
			type: String,
			description: 'ID do evento que será consultado',
		}),
		ApiResponse({
			status: HttpStatus.OK,
			description: 'Dados estatísticos retornados com sucesso.',
			schema: {
				example: {
					check_ins_total_count: 34,
					check_outs_total_count: 20,
					attendees_count: 50,
					expected_total_check_ins: 100,
					expected_total_check_outs: 50,
					dates: [
						{
							date: '2024-01-10',
							check_ins: 20,
							check_outs: 10,
						},
						{
							date: '2024-01-11',
							check_ins: 14,
							check_outs: 10,
						},
					],
				},
			},
		}),
		ApiResponse({
			status: HttpStatus.NOT_FOUND,
			description: 'Veja o schema. Evento não encontrado ou sem participantes.',
			schema: {
				examples: {
					evento_nao_encontrado: {
						summary: 'Evento inexistente',
						value: {
							message: 'Nenhum evento encontrado com o id: 123.',
						},
					},
					sem_participantes: {
						summary: 'Evento sem participantes',
						value: {
							message: 'Nenhum participante encontrado no evento Workshop NestJS.',
						},
					},
				},
			},
		}),
		ApiResponse({
			status: HttpStatus.BAD_REQUEST,
			description: 'Parâmetros inválidos na requisição.',
		}),
		ApiResponse({
			status: HttpStatus.INTERNAL_SERVER_ERROR,
			description: 'Erro inesperado ao buscar dados estatísticos do evento.',
		}),
	);
}
