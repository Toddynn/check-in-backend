import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

export function GenerateEventReportDocs() {
	return applyDecorators(
		ApiOperation({
			summary: 'Gera um relatório em PDF do evento',
			description:
				'Gera um relatório completo contendo os dados do evento, participantes, datas de check-in/out, ata final (se existir), em formato PDF. O relatório é retornado como arquivo para download.',
		}),
		ApiParam({
			name: 'id',
			required: true,
			type: String,
			description: 'ID do evento para o qual o relatório será gerado',
		}),
		ApiResponse({
			status: HttpStatus.OK,
			description: 'Relatório PDF gerado com sucesso.',
			content: {
				'application/pdf': {
					schema: {
						type: 'string',
						format: 'binary',
					},
					example: '<binary>',
				},
			},
		}),
		ApiResponse({
			status: HttpStatus.BAD_REQUEST,
			description: 'Não foi possível gerar o relatório.',
			schema: {
				example: {
					message: 'Não foi possível gerar este relatório. Error: <detalhes>',
				},
			},
		}),
		ApiResponse({
			status: HttpStatus.UNAUTHORIZED,
			description: 'Token JWT ausente ou inválido.',
		}),
		ApiResponse({
			status: HttpStatus.INTERNAL_SERVER_ERROR,
			description: 'Erro inesperado ao tentar gerar o relatório.',
		}),
	);
}
