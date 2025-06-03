import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthDto } from 'src/auth/models/dto/auth.dto';

export function LogInDocs() {
	return applyDecorators(
		ApiOperation({
			summary: 'Realiza o login do usuário',
			description: 'Autentica o usuário via serviço externo, valida e decodifica o token JWT, e retorna os tokens válidos para autenticação futura.',
		}),
		ApiBody({
			type: AuthDto,
			description: 'Credenciais do usuário (email e senha)',
		}),
		ApiResponse({
			status: HttpStatus.OK,
			description: 'Login realizado com sucesso. Retorna accessToken e refreshToken.',
			schema: {
				example: {
					accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
					refreshToken: 'd1e2f3g4h5i6j7k8l9m0n1o2p3q4r5s6',
				},
			},
		}),
		ApiResponse({
			status: HttpStatus.NOT_ACCEPTABLE,
			description: 'Veja o schema. Falha de autenticação no serviço externo.',
			schema: {
				examples: [
					{
						message: 'Sem permissão para acessar o sistema.',
					},
					{
						message: 'Erro da api externa de login',
					},
				],
			},
		}),
		ApiResponse({
			status: HttpStatus.BAD_REQUEST,
			description: 'Requisição malformada.',
		}),
		ApiResponse({
			status: HttpStatus.INTERNAL_SERVER_ERROR,
			description: 'Erro inesperado durante o login.',
		}),
	);
}
