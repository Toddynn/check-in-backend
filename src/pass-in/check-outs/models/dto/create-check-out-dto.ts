import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateCheckOutDto {
	@ApiProperty({
		description: 'ID do evento',
		example: 'event-123',
	})
	@IsNotEmpty({ message: 'Campo id do evento é obrigatório' })
	@IsString({ message: 'O campo id do evento precisa ser um texto.' })
	@IsUUID('4', { message: 'O ID do evento deve ser um UUID válido.' })
	event_id: string;

	@ApiProperty({
		description: 'ID do participante',
		example: 'attendee-456',
	})
	@IsNotEmpty({ message: 'Campo id do participante é obrigatório' })
	@IsString({ message: 'O campo id do participante precisa ser um texto.' })
	@IsUUID('4', { message: 'O ID do participante deve ser um UUID válido.' })
	attendee_id: string;
}
