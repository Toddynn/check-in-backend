import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, IsString } from 'class-validator';
import { IsDocument } from 'src/decorators/validate-document.decorator';

export class CreateUserDto {
	@ApiProperty({
		example: '11111111111',
		maxLength: 14,
		minLength: 11,
		description: 'Documento do usuário',
	})
	@IsNotEmpty({ message: 'Campo documento é obrigatório' })
	@IsString({ message: 'Documento deve ser uma string' })
	@IsDocument({ message: 'Documento inválido' })
	document: string;

	@ApiProperty({
		example: 'John Doe',
		description: 'Nome do usuário',
	})
	@IsNotEmpty({ message: 'Campo nome é obrigatório' })
	@IsString({ message: 'Não é possivel definir números como um nome' })
	name: string;

	@ApiProperty({
		example: 'email@example.com',
		description: 'E-mail do usuário',
	})
	@IsNotEmpty({ message: 'Campo e-mail é obrigatório' })
	@IsEmail({}, { message: 'Campo e-mail precisa ser um e-mail válido!' })
	email: string;

	@ApiProperty({
		example: true,
		description: 'Indica se o usuário aceitou os termos',
	})
	@IsBoolean({ message: 'Campo de consentimento e concordância dos termos precisa ser booleano' })
	@IsNotEmpty({ message: 'Campo de consentimento e concordância dos termos não pode ser vazio' })
	accept_terms: boolean;

	@ApiProperty({
		example: '+5511999999999',
		description: 'Número de telefone do usuário',
		required: false,
	})
	@IsOptional()
	@IsPhoneNumber('BR', { message: 'Número de telefone deve ser brasileiro e válido' })
	phone_number?: string;
}
