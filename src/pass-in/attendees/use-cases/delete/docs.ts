import { HttpStatus, applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

export function DeleteAttendeeDocs() {
	return applyDecorators(
		ApiOperation({
			summary: 'Remove um participante de um evento',
			description:
				'Permite a remoção de um participante desde que:\n' +
				'- O usuário autenticado seja o criador do evento ou tenha papel de master;\n' +
				'- O participante não tenha realizado check-in ou check-out no evento.',
		}),
		ApiParam({
			name: 'id',
			description: 'ID do participante a ser removido',
			type: String,
		}),
		ApiResponse({
			status: HttpStatus.OK,
			description: 'Participante removido com sucesso.',
			schema: {
				example: {
					message: 'Participante removido com sucesso.',
				},
			},
		}),
		ApiResponse({
			status: HttpStatus.NOT_FOUND,
			description: 'Participante não encontrado.',
			schema: {
				example: {
					message: 'Participante não encontrado.',
				},
			},
		}),
		ApiResponse({
			status: HttpStatus.NOT_ACCEPTABLE,
			description: 'Não é possível remover o participante.',
			schema: {
				examples: {
					nao_autorizado: {
						summary: 'Usuário não autorizado',
						value: {
							message: 'Somente o criador do evento pode excluí-lo',
						},
					},
					checkin_existente: {
						summary: 'Participante com check-in',
						value: {
							message: 'O participante João Silva não foi removido do evento Workshop NestJS, pois já fez check-in.',
						},
					},
					checkout_existente: {
						summary: 'Participante com check-out',
						value: {
							message: 'O participante João Silva não foi removido do evento Workshop NestJS, pois já fez check-out.',
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
