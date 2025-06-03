import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export function GetTotalEventsByThirdPartySoftwareDocs() {
	return applyDecorators(
		ApiOperation({
			summary: 'Retorna total de eventos agrupados por software de terceiros',
			description:
				'Consulta os eventos cadastrados e agrupa os resultados por nome do software de terceiros associado, retornando a contagem total por grupo.',
		}),
		ApiResponse({
			status: HttpStatus.OK,
			description: 'Lista de softwares com total de eventos vinculados.',
			schema: {
				example: [
					{ software_name: 'Trainings', total_events: 25 },
					{ software_name: 'Install Masters', total_events: 12 },
					{ software_name: null, total_events: 30 },
				],
			},
		}),
	);
}
