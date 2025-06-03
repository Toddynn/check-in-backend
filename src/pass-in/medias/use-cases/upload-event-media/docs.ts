import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiConsumes, ApiOperation, ApiResponse } from '@nestjs/swagger';

export function UploadEventMediaDocs() {
	return applyDecorators(
		ApiOperation({
			summary: 'Faz upload de mídias para um evento',
			description:
				'Permite o envio de uma ou mais mídias (imagem, vídeo ou PDF) associadas a um evento específico. Somente o criador do evento, responsáveis ou administradores podem realizar essa ação.',
		}),
		ApiConsumes('multipart/form-data'),
		ApiResponse({
			status: HttpStatus.CREATED,
			description: 'Mídia(s) enviada(s) com sucesso.',
			schema: {
				example: [
					{
						id: '7c9e6679-7425-40de-944b-e07fc1f90ae7',
						file_name: 'foto_viagem_2024.jpg',
						type: 'image',
						path: '/uploads/media/7c9e6679-7425-40de-944b-e07fc1f90ae7.jpg',
						event_id: '123',
						created_at: '2024-11-01T14:00:00.000Z',
					},
				],
			},
		}),
		ApiResponse({
			status: HttpStatus.NOT_ACCEPTABLE,
			description: 'Veja o schema. Erros de validação de arquivos ou permissão.',
			schema: {
				examples: {
					tipo_arquivo_invalido: {
						summary: 'Tipo de arquivo inválido',
						value: {
							message: 'Tipo de arquivo inválido. Somente imagens, vídeos e PDFs são aceitos.',
						},
					},
					permissao_insuficiente: {
						summary: 'Usuário não autorizado',
						value: {
							message: 'Somente o criador do evento ou um responsável pode adicionar uma mídia.',
						},
					},
					arquivo_invalidado_por_middleware: {
						summary: 'Erro de validação por middleware (ex: tamanho, extensão)',
						value: {
							message: 'Arquivo rejeitado: tamanho excede o limite permitido.',
						},
					},
				},
			},
		}),
		ApiResponse({
			status: HttpStatus.BAD_REQUEST,
			description: 'Dados inválidos enviados.',
		}),
		ApiResponse({
			status: HttpStatus.UNAUTHORIZED,
			description: 'Token JWT ausente ou inválido.',
		}),
		ApiResponse({
			status: HttpStatus.INTERNAL_SERVER_ERROR,
			description: 'Erro inesperado ao fazer upload da mídia.',
		}),
	);
}
