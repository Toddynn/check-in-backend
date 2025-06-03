import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ThirdPartySoftwares } from '../../models/entities/third-party-softwares.entity';

export function FindAllThirdPartySoftwaresDocs() {
	return applyDecorators(
		ApiOperation({
			summary: 'Lista softwares de terceiros',
			description:
				'Recupera uma lista de softwares de terceiros com suporte a pesquisa por nome. A listagem é ordenada pela data de criação (mais recentes primeiro).',
		}),
		ApiResponse({
			status: HttpStatus.OK,
			description: 'Lista retornada com sucesso.',
			type: ThirdPartySoftwares,
			isArray: true,
		}),
		ApiResponse({
			status: HttpStatus.NOT_FOUND,
			description: 'Veja o schema. Nenhum software encontrado.',
			schema: {
				example: {
					message: 'Nenhum software encontrado.',
				},
			},
		}),
		ApiResponse({
			status: HttpStatus.BAD_REQUEST,
			description: 'Parâmetros de busca inválidos.',
		}),
		ApiResponse({
			status: HttpStatus.UNAUTHORIZED,
			description: 'Token JWT ausente ou inválido.',
		}),
		ApiResponse({
			status: HttpStatus.INTERNAL_SERVER_ERROR,
			description: 'Erro inesperado ao buscar softwares.',
		}),
	);
}
