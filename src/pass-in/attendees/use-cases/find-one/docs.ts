import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { Attendee } from '../../models/entities/attendee.entity';

export function FindOneAttendeeDocs() {
	return applyDecorators(
		ApiOperation({
			summary: 'Busca um participante pelo ID',
			description: 'Retorna os dados de um participante, incluindo informações pessoais, evento relacionado, check-in e check-out.',
		}),
		ApiParam({
			name: 'id',
			required: true,
			description: 'ID do participante que será buscado.',
			type: String,
		}),
		ApiResponse({
			status: HttpStatus.OK,
			description: 'Participante encontrado com sucesso.',
			type: Attendee,
		}),
		ApiResponse({
			status: HttpStatus.NOT_FOUND,
			description: 'Veja o schema. Participante não encontrado.',
			schema: {
				examples: {
					nao_encontrado: {
						summary: 'ID inválido ou inexistente',
						value: {
							message: 'Participante não encontrado.',
						},
					},
				},
			},
		}),
		ApiResponse({
			status: HttpStatus.UNAUTHORIZED,
			description: 'Token de autenticação ausente ou inválido.',
		}),
	);
}
