import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateRecordDto } from '../../models/dto/create-record.dto';
import { Record } from '../../models/entities/records.entity';

export function CreateRecordDocs() {
	return applyDecorators(
		ApiOperation({
			summary: 'Cria uma nova ata para um evento',
			description: 'Cria uma ata associada a um evento específico. Somente o criador, um responsável ou um administrador pode realizar essa operação.',
		}),
		ApiBody({
			type: CreateRecordDto,
			description: 'Dados necessários para criação da ata',
		}),
		ApiResponse({
			status: HttpStatus.CREATED,
			description: 'Ata criada com sucesso.',
			type: Record,
		}),
		ApiResponse({
			status: HttpStatus.NOT_ACCEPTABLE,
			description: 'Veja o schema. Restrições de permissão.',
			schema: {
				example: {
					message: 'Somente o criador ou responsável do evento pode escrever a Ata.',
				},
			},
		}),
		ApiResponse({
			status: HttpStatus.BAD_REQUEST,
			description: 'Dados inválidos para criação da ata.',
		}),
		ApiResponse({
			status: HttpStatus.UNAUTHORIZED,
			description: 'Token JWT ausente ou inválido.',
		}),
		ApiResponse({
			status: HttpStatus.INTERNAL_SERVER_ERROR,
			description: 'Erro inesperado ao criar a ata.',
		}),
	);
}
