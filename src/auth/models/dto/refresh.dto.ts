import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RefreshDto {
	@ApiProperty({
		description: 'Token de atualização',
		example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
	})
	@IsNotEmpty({ message: 'Campo token é obrigatório' })
	@IsString({ message: 'O campo token precisa ser um texto.' })
	token: string;
}
