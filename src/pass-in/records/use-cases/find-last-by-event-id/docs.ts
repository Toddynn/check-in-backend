import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { Record } from '../../models/entities/records.entity';

export function FindLastRecordByEventIdDocs() {
	return applyDecorators(
		ApiOperation({
			summary: 'Busca a última ata registrada de um evento',
			description:
				'Retorna a ata mais recente associada ao evento informado. É necessário estar autenticado. O evento deve existir, caso contrário, uma exceção será lançada.',
		}),
		ApiParam({
			name: 'event_id',
			description: 'ID do evento a ser consultado',
			required: true,
			type: String,
			example: 'e290f1ee-6c54-4b01-90e6-d701748f0852',
		}),
		ApiResponse({
			status: HttpStatus.OK,
			description: 'Última ata encontrada com sucesso.',
			type: Record,
		}),
		ApiResponse({
			status: HttpStatus.NOT_FOUND,
			description: 'Nenhuma ata encontrada para o evento informado.',
			schema: {
				example: {
					message: 'Nenhuma ata encontrada.',
				},
			},
		}),
		ApiResponse({
			status: HttpStatus.UNAUTHORIZED,
			description: 'Token JWT ausente ou inválido.',
		}),
		ApiResponse({
			status: HttpStatus.INTERNAL_SERVER_ERROR,
			description: 'Erro inesperado ao buscar a ata.',
		}),
	);
}
