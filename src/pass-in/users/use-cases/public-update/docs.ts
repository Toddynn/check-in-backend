import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UpdateUserDto } from '../../models/dto/update-user.dto';
import { User } from '../../models/entities/user.entity';

export function PublicUpdateUserDocs() {
	return applyDecorators(
		ApiOperation({
			summary: 'Atualiza dados de um usuário (público)',
			description:
				'Permite a atualização de dados do usuário mediante confirmação do documento.\n' +
				'Valida se o ID corresponde ao documento fornecido e verifica conflitos de e-mail e telefone antes da atualização.',
		}),
		ApiBody({
			type: UpdateUserDto,
			description: 'Dados para atualização do usuário (requer o documento)',
		}),
		ApiResponse({
			status: HttpStatus.OK,
			description: 'Usuário atualizado com sucesso.',
			type: User,
		}),
		ApiResponse({
			status: HttpStatus.NOT_ACCEPTABLE,
			description: 'Veja o schema. Regras de integridade ou vínculo inválido.',
			schema: {
				examples: {
					documento_obrigatorio: {
						summary: 'Documento não informado',
						value: {
							message: 'A confirmação do documento é obrigatória para a edição dos dados.',
						},
					},
					documento_nao_corresponde: {
						summary: 'Documento não corresponde ao usuário',
						value: {
							message: 'Usuário não condiz com o documento fornecido.',
						},
					},
				},
			},
		}),
		ApiResponse({
			status: HttpStatus.CONFLICT,
			description: 'Veja o schema. E-mail ou telefone em uso por outro usuário.',
			schema: {
				examples: {
					email_duplicado: {
						summary: 'E-mail em uso',
						value: {
							message: 'E-mail exemplo@email.com já em uso!',
						},
					},
					telefone_duplicado: {
						summary: 'Telefone em uso',
						value: {
							message: 'Nº de telefone (11) 91234-5678 já em uso!',
						},
					},
				},
			},
		}),
		ApiResponse({
			status: HttpStatus.BAD_REQUEST,
			description: 'Dados inválidos para atualização.',
		}),
		ApiResponse({
			status: HttpStatus.NOT_FOUND,
			description: 'Usuário não encontrado.',
		}),
		ApiResponse({
			status: HttpStatus.INTERNAL_SERVER_ERROR,
			description: 'Erro inesperado ao atualizar usuário.',
		}),
	);
}
