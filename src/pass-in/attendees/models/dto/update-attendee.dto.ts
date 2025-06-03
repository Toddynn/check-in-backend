import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateAttendeeDto {
	@ApiPropertyOptional({
		description: 'Nr Cupom do usuário',
		example: 'ins123456',
	})
	@IsOptional()
	@IsString({ message: 'Campo Nr Cupom  usuário deve ser uma string' })
	nr_cupom?: string;
}
