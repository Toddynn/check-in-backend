import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { User } from '../../models/entities/user.entity';

export function FindOneUserByDocumentDocs() {
	return applyDecorators(
		ApiOperation({
			summary: 'Busca um usuário pelo documento',
			description:
				'Localiza um usuário com base em um CPF ou CNPJ, realizando comparação segura (hash) se aplicável.\n' +
				'Retorna o usuário correspondente se encontrado.',
		}),
		ApiParam({
			name: 'document',
			description: 'Documento do usuário (CPF ou CNPJ)',
			type: String,
		}),
		ApiResponse({
			status: HttpStatus.OK,
			description: 'Usuário encontrado com sucesso.',
			type: User,
			schema: {
				example: {
					id: 'uuid-1234',
					nome: 'Lucas Mendes',
					email: 'lucas@email.com',
					document: '***********',
					phone_number: '(11) 91234-5678',
					created_at: '2024-04-20T08:00:00.000Z',
					updated_at: '2024-04-21T10:30:00.000Z',
				},
			},
		}),
		ApiResponse({
			status: HttpStatus.NOT_FOUND,
			description: 'Veja o schema. Usuário não encontrado.',
			schema: {
				example: {
					message: 'Usuário não encontrado.',
				},
			},
		}),
		ApiResponse({
			status: HttpStatus.BAD_REQUEST,
			description: 'Formato de documento inválido.',
		}),
		ApiResponse({
			status: HttpStatus.INTERNAL_SERVER_ERROR,
			description: 'Erro inesperado ao buscar usuário.',
		}),
	);
}
