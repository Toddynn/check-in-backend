import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateAdminFeedbackDto } from '../../models/dto/create-admin-feedback.dto';

export function CreateAdminFeedbackDocs() {
	return applyDecorators(
		ApiOperation({
			summary: 'Cria um novo feedback de administrador.',
			description: 'Permite a criação de um feedback de um administrador/ responsável vinculado ao evento.',
		}),
		ApiBody({
			type: CreateAdminFeedbackDto,
			description: 'Estrutura dos dados necessários para a criação do feedback administrativo',
		}),
		ApiResponse({
			status: HttpStatus.CREATED,
			description: 'Feedback criado com sucesso.',
		}),
		ApiResponse({
			status: HttpStatus.NOT_ACCEPTABLE,
			description: 'Veja o schema. Erros de permissão ou lógica de negócio.',
			schema: {
				examples: {
					sem_permissao: {
						summary: 'Usuário sem permissão',
						value: {
							message: 'Sem permissão para dar feedback do evento',
						},
					},
				},
			},
		}),
		ApiResponse({
			status: HttpStatus.BAD_REQUEST,
			description: 'Dados inválidos no corpo da requisição.',
		}),
		ApiResponse({
			status: HttpStatus.UNAUTHORIZED,
			description: 'Token JWT ausente ou inválido.',
		}),
		ApiResponse({
			status: HttpStatus.INTERNAL_SERVER_ERROR,
			description: 'Erro inesperado ao criar o feedback.',
		}),
	);
}
