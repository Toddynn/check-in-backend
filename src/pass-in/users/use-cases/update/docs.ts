import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UpdateUserDto } from '../../models/dto/update-user.dto';
import { User } from '../../models/entities/user.entity';

export function UpdateUserDocs() {
	return applyDecorators(
		ApiOperation({
			summary: 'Atualiza um usuário autenticado',
			description:
				'Atualiza os dados de um usuário autenticado com base em seu ID. Não é permitido alterar o campo `document`. Valida e evita duplicidade de e-mail ou telefone.',
		}),
		ApiBody({
			type: UpdateUserDto,
			description: 'Dados para atualização do usuário (o campo `document` será rejeitado)',
		}),
		ApiResponse({
			status: HttpStatus.OK,
			description: 'Usuário atualizado com sucesso.',
			type: User,
		}),
		ApiResponse({
			status: HttpStatus.BAD_REQUEST,
			description: 'Veja o schema. Dados inválidos ou campos não permitidos.',
			schema: {
				example: {
					message: 'O campo "documento" não é permitido na atualização do usuário.',
				},
			},
		}),
		ApiResponse({
			status: HttpStatus.CONFLICT,
			description: 'Veja o schema. E-mail ou telefone já utilizados por outro usuário.',
			schema: {
				examples: {
					email_em_uso: {
						summary: 'E-mail duplicado',
						value: {
							message: 'E-mail usuario@email.com já em uso!',
						},
					},
					telefone_em_uso: {
						summary: 'Telefone duplicado',
						value: {
							message: 'Nº de telefone (11) 99999-9999 já em uso!',
						},
					},
				},
			},
		}),
		ApiResponse({
			status: HttpStatus.NOT_FOUND,
			description: 'Usuário não encontrado.',
		}),
		ApiResponse({
			status: HttpStatus.UNAUTHORIZED,
			description: 'Token JWT ausente ou inválido.',
		}),
		ApiResponse({
			status: HttpStatus.INTERNAL_SERVER_ERROR,
			description: 'Erro inesperado ao atualizar usuário.',
		}),
	);
}
