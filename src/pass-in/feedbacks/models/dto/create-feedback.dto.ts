import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateFeedbackDto {
	@ApiPropertyOptional({
		description: 'Texto descritivo ou observação sobre o evento',
		example: 'Achei a organização excelente, mas o som estava muito alto.',
	})
	@IsOptional()
	@IsString()
	@MinLength(1)
	text?: string;

	@ApiProperty({
		description: 'ID do evento ao qual o feedback pertence',
		example: 'evt_1234567890',
	})
	@IsNotEmpty({ message: 'Escolha um evento para fazer o comentário' })
	@IsString()
	event_id: string;
}
