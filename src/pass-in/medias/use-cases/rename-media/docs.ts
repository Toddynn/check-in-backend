import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { RenameMediaDto } from '../../models/dto/rename-media.dto';

export function RenameMediaDocs() {
	return applyDecorators(
		ApiOperation({
			summary: 'Renomeia uma mídia',
			description: 'Atualiza o nome do arquivo de uma mídia existente com base no ID fornecido.',
		}),
		ApiBody({
			type: RenameMediaDto,
			description: 'Novo nome da mídia',
		}),
		ApiResponse({
			status: HttpStatus.ACCEPTED,
			description: 'Mídia renomeada com sucesso.',
			schema: {
				example: {
					affected: 1,
				},
			},
		}),
		ApiResponse({
			status: HttpStatus.NOT_FOUND,
			description: 'Veja o schema. Mídia não encontrada.',
			schema: {
				example: {
					message: 'Mídia não encontrada com o id: abc123',
				},
			},
		}),
		ApiResponse({
			status: HttpStatus.BAD_REQUEST,
			description: 'Dados inválidos para renomear mídia.',
		}),
		ApiResponse({
			status: HttpStatus.UNAUTHORIZED,
			description: 'Token JWT ausente ou inválido.',
		}),
		ApiResponse({
			status: HttpStatus.INTERNAL_SERVER_ERROR,
			description: 'Erro inesperado ao renomear mídia.',
		}),
	);
}
