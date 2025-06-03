import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AuthDto {
	@ApiProperty({
		description: 'Nome de usuário',
		example: 'usuario123',
	})
	@IsNotEmpty({ message: 'Campo usuário é obrigatório' })
	@IsString({ message: 'O campo usuário precisa ser um texto.' })
	user: string;

	@ApiProperty({
		description: 'Senha do usuário',
		example: 'senha123',
	})
	@IsNotEmpty({ message: 'Senha é um campo obrigatório' })
	@IsString({ message: 'Senha precisa ser um texto' })
	password: string;
}
