import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsIn, IsNotEmpty, IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';

export class CreateMediaDto {
	@ApiProperty({ description: 'Tipo da mídia (image, video ou pdf)' })
	@IsString()
	@IsNotEmpty()
	@IsIn(['image', 'video', 'pdf'], { message: 'O tipo deve ser "image", "video" ou "pdf"' })
	type: string;

	@ApiProperty({ description: 'Nome original do arquivo da mídia' })
	@IsString()
	@MaxLength(255, { message: 'O nome do arquivo deve ter no máximo 255 caracteres' })
	@IsNotEmpty()
	file_name: string;

	@ApiProperty({ description: 'Caminho onde o arquivo está armazenado' })
	@IsString()
	@IsNotEmpty()
	path: string;

	@ApiPropertyOptional({ description: 'ID do evento relacionado (opcional)', required: false })
	@IsUUID('4', { message: 'O ID do evento deve ser um UUID válido' })
	@IsOptional()
	event_id?: string;
}
