import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateAttendeeDto {
	@ApiProperty({
		description: 'ID do evento',
		example: 'event-123',
	})
	@IsNotEmpty({ message: 'Campo id do evento é obrigatório' })
	@IsString({ message: 'O campo id do evento precisa ser um texto.' })
	@IsUUID('4', { message: 'O ID do evento deve ser um UUID válido.' })
	event_id: string;

	@ApiProperty({
		description: 'IDs dos usuários',
		example: ['user-1', 'user-2'],
	})
	@IsNotEmpty({ message: 'Campo id do usuário é obrigatório' })
	@IsArray({ message: 'Campo id do usuário deve ser um array' })
	users_ids: string[];

	@ApiPropertyOptional({
		description: 'Nr Cupom do usuário',
		example: 'ins123456',
	})
	@IsOptional()
	@IsString({ message: 'Campo Nr Cupom  usuário deve ser uma string' })
	nr_cupom?: string;
}
