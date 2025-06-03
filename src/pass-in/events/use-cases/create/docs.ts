import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateEventDto } from '../../models/dto/create-event.dto';

export function CreateEventDocs() {
	return applyDecorators(
		ApiOperation({
			summary: 'Cria um novo evento',
			description:
				'Cria um novo evento com datas de início/fim, capacidade máxima, dados de localização e vínculos com software de terceiros.\n' +
				'Exige ao menos uma data de check-in válida. As datas de check-out são opcionais, mas validadas se fornecidas.',
		}),
		ApiBody({
			type: CreateEventDto,
			description: 'Estrutura dos dados para criação do evento',
		}),
		ApiResponse({
			status: HttpStatus.CREATED,
			description: 'Evento criado com sucesso.',
			schema: {
				example: {
					id: 1,
					title: 'Evento Corporativo',
					start_date: '2024-09-01T08:00:00.000Z',
					end_date: '2024-09-03T18:00:00.000Z',
					place_name: 'Centro de Convenções',
					maximum_attendees: 150,
					is_public: false,
					created_by: 'João Admin',
					created_by_login_id: 42,
				},
			},
		}),
		ApiResponse({
			status: HttpStatus.NOT_ACCEPTABLE,
			description: 'Erros de validação de dados.',
			schema: {
				examples: {
					sem_check_in: {
						summary: 'Sem datas de check-in',
						value: {
							message: 'Não é possível criar um evento sem exigir datas de check in',
						},
					},
					checkin_fora_intervalo: {
						summary: 'Data de check-in fora do intervalo do evento',
						value: {
							message: 'A data de check-in deve estar entre a data de início e fim do evento: 01/10/2024',
						},
					},
					checkin_fim_antes_inicio: {
						summary: 'Término do check-in antes da liberação',
						value: {
							message: 'A data de fechamento do check in deve ocorrer após a liberação do mesmo: 02/10/2024',
						},
					},
					checkout_sem_checkin: {
						summary: 'Check-out sem data de check-in correspondente',
						value: {
							message: 'A data de check out 06/10/2024 é inválida. Só é possível exigir um check out em uma data que exige check in.',
						},
					},
					checkout_fora_intervalo: {
						summary: 'Data de check-out fora do intervalo do evento',
						value: {
							message: 'A data de check-out deve estar entre a data de início e fim do evento: 01/10/2024',
						},
					},
					checkout_fim_antes_inicio: {
						summary: 'Término do check-out antes da liberação',
						value: {
							message: 'A data de fechamento do check out deve ocorrer após a liberação do mesmo: 06/10/2024',
						},
					},
					software_nao_encontrado: {
						summary: 'Software de terceiros não encontrado',
						value: {
							message: 'Software não encontrado com o id #9!',
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
			description: 'Erro inesperado ao criar evento.',
		}),
	);
}
