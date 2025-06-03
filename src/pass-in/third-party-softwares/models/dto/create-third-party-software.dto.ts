import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateThirdPartySoftwareDto {
	@ApiProperty({
		description: 'Nome do Software',
		example: 'Mestres da instalação',
	})
	@IsNotEmpty({ message: 'Campo nome é obrigatório.' })
	@IsString({ message: 'O campo nome precisa ser um texto.' })
	name: string;
}
