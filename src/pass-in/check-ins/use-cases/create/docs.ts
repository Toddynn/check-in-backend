import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateCheckInDto } from '../../models/dto/create-check-in-dto';
import { CheckIn } from '../../models/entities/check-in.entity';

export function CreateCheckInDocs() {
	return applyDecorators(
		ApiOperation({
			summary: 'Realiza o check-in de um participante',
			description:
				'Cria um novo registro de check-in para um participante de um evento, desde que:\n' +
				'- O participante esteja corretamente vinculado ao evento;\n' +
				'- A data atual esteja dentro de um intervalo permitido de check-in;\n' +
				'- O participante ainda não tenha feito check-in hoje.',
		}),
		ApiBody({
			type: CreateCheckInDto,
			description: 'Dados necessários para criar um check-in',
		}),
		ApiResponse({
			status: HttpStatus.CREATED,
			description: 'Check-in realizado com sucesso.',
			type: CheckIn,
		}),
		ApiResponse({
			status: HttpStatus.NOT_ACCEPTABLE,
			description: 'Veja o schema. A operação de check-in foi negada.',
			schema: {
				examples: {
					checkin_duplicado: {
						summary: 'Check-in já realizado',
						value: {
							message: 'Usuário já fez check in!',
						},
					},
					data_nao_permitida: {
						summary: 'Data fora do intervalo de check-in',
						value: {
							message: 'Não é possível fazer check-in no evento hoje.',
						},
					},
					participante_nao_encontrado: {
						summary: 'Participante não está vinculado ao evento',
						value: {
							message: 'Participante João Silva não cadastrado nesse evento.',
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
			description: 'Token de autenticação ausente ou inválido.',
		}),
		ApiResponse({
			status: HttpStatus.INTERNAL_SERVER_ERROR,
			description: 'Erro inesperado ao tentar realizar o check-in.',
		}),
	);
}
