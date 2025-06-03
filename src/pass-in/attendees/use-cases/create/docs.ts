import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export function CreateAttendeeDocs() {
	return applyDecorators(
		ApiOperation({
			summary: 'Cria novos participantes para um evento',
			description:
				'Adiciona múltiplos usuários como participantes de um evento. ' +
				'Verifica se o usuário já está inscrito, se o evento atingiu o limite de participantes, ' +
				'e se o número do cupom é único dentro do evento.',
		}),
		ApiResponse({
			status: HttpStatus.CREATED,
			description: 'Participante(s) criado(s) com sucesso.',
		}),
		ApiResponse({
			status: HttpStatus.BAD_REQUEST,
			description: 'Limite de participantes atingido para o evento.',
			schema: {
				example: {
					message: 'Este evento já possui o máximo de 100 participante(s).',
				},
			},
		}),
		ApiResponse({
			status: HttpStatus.NOT_FOUND,
			description: 'Usuário informado não foi encontrado.',
			schema: {
				example: {
					message: 'Usuário não encontrado. Por favor, cadastre o usuário para adicioná-lo como participante.',
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
