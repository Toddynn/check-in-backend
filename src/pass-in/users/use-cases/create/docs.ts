import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateUserDto } from '../../models/dto/create-user.dto';
import { User } from '../../models/entities/user.entity';

export function CreateUserDocs() {
	return applyDecorators(
		ApiOperation({
			summary: 'Cria um novo usuário',
			description:
				'Cria um novo usuário com e-mail, documento e, opcionalmente, número de telefone. Todos os campos são validados quanto à unicidade.',
		}),
		ApiBody({
			type: CreateUserDto,
			description: 'Dados para criação de usuário',
		}),
		ApiResponse({
			status: HttpStatus.CREATED,
			description: 'Usuário criado com sucesso.',
			type: User,
		}),
		ApiResponse({
			status: HttpStatus.CONFLICT,
			description: 'Veja o schema. Conflitos de dados já existentes.',
			schema: {
				examples: {
					email_duplicado: {
						summary: 'E-mail já cadastrado',
						value: {
							message: 'E-mail usuario@email.com já em uso!',
						},
					},
					documento_duplicado: {
						summary: 'Documento já cadastrado',
						value: {
							message: 'Usuário já cadastrado.',
						},
					},
					telefone_duplicado: {
						summary: 'Telefone já cadastrado',
						value: {
							message: 'Nº de telefone (11) 99999-9999 já em uso!',
						},
					},
				},
			},
		}),
		ApiResponse({
			status: HttpStatus.BAD_REQUEST,
			description: 'Dados inválidos para criação de usuário.',
		}),
		ApiResponse({
			status: HttpStatus.INTERNAL_SERVER_ERROR,
			description: 'Erro inesperado ao criar usuário.',
		}),
	);
}
