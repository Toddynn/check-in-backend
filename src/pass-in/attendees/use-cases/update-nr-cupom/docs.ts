import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export function UpdateAttendeeNrCupomDocs() {
	return applyDecorators(
		ApiOperation({
			summary: 'Edita o Nr Cupom do participante',
			description: 'Verifica se ja existe um participante com esse Nr Cupom no mesmo evento',
		}),
		ApiResponse({
			status: HttpStatus.OK,
			description: 'Participante editado com sucesso.',
		}),
		ApiResponse({
			status: HttpStatus.NOT_FOUND,
			description: 'Usuário informado não foi encontrado.',
			schema: {
				example: {
					message: 'Usuário não encontrado.',
				},
			},
		}),
		ApiResponse({
			status: HttpStatus.NOT_ACCEPTABLE,
			description: 'Veja o schema. Conflitos de negócio (usuário duplicado no evento ou cupom repetido).',
			schema: {
				examples: {
					usuario_duplicado: {
						summary: 'Usuário já inscrito no evento',
						value: {
							message: 'Usuário João Silva já cadastrado no evento Workshop NestJS.',
						},
					},
					cupom_repetido: {
						summary: 'Cupom já utilizado',
						value: {
							message: 'Um usuário já está cadastrado com esse Nr cupom, em caso de conflito entre em contato com a administração do evento.',
						},
					},
				},
			},
		}),
	);
}
