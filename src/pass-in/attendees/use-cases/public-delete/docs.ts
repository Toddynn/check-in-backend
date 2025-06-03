import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

export function DeletePublicAttendeeDocs() {
	return applyDecorators(
		ApiOperation({
			summary: 'Remove um participante via rota pública',
			description:
				'Permite que o próprio usuário remova sua participação de um evento, desde que ainda não tenha realizado check-in ou check-out.\n' +
				'A validação também garante que o usuário só possa remover a si mesmo.',
		}),
		ApiParam({
			name: 'attendee_id',
			required: true,
			type: String,
			description: 'ID do participante a ser removido',
		}),
		ApiParam({
			name: 'user_id',
			required: true,
			type: String,
			description: 'ID do usuário solicitante da remoção',
		}),
		ApiResponse({
			status: HttpStatus.OK,
			description: 'Participação cancelada com sucesso.',
			schema: {
				example: {
					message: 'Participante removido com sucesso.',
				},
			},
		}),
		ApiResponse({
			status: HttpStatus.NOT_ACCEPTABLE,
			description: 'Veja o schema. Remoção não permitida por violação de regras.',
			schema: {
				examples: {
					ja_feito_checkin: {
						summary: 'Check-in já realizado',
						value: {
							message: 'O participante João Silva não foi removido do evento Workshop NestJS, pois já fez check-in.',
						},
					},
					ja_feito_checkout: {
						summary: 'Check-out já realizado',
						value: {
							message: 'O participante João Silva não foi removido do evento Workshop NestJS, pois já fez check-out.',
						},
					},
					remocao_de_outro_usuario: {
						summary: 'Tentativa de remover outro usuário',
						value: {
							message: 'Não é possível cancelar a participação de outras pessoas!',
						},
					},
				},
			},
		}),
		ApiResponse({
			status: HttpStatus.INTERNAL_SERVER_ERROR,
			description: 'Erro inesperado ao tentar remover participante.',
		}),
	);
}
