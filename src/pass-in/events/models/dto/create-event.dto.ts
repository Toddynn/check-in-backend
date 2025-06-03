import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, IsUrl, MaxLength } from 'class-validator';
import { CheckInDates } from 'src/pass-in/check-in-dates/models/entities/check-in-dates.entity';
import { CheckOutDates } from 'src/pass-in/check-out-dates/models/entities/check-out-dates.entity';

export class CreateEventDto {
	@ApiProperty({
		description: 'Título do evento',
		example: 'Workshop de NestJS',
	})
	@IsNotEmpty({ message: 'Campo título é obrigatório.' })
	@MaxLength(100, { message: 'Título deve ter no máximo 100 caracteres.' })
	@IsString({ message: 'O campo título precisa ser um texto.' })
	title: string;

	@ApiProperty({
		description: 'Array de datas para check-in',
		type: [CheckInDates],
	})
	@IsArray({ message: 'Insira um array de datas que deseja check in' })
	@IsNotEmpty({ message: 'Escolha datas que deseja check in' })
	check_in_dates?: CheckInDates[];

	@ApiProperty({
		description: 'Array de datas para check-out',
		type: [CheckOutDates],
	})
	@IsArray({ message: 'Insira um array de datas que deseja check out' })
	@IsOptional()
	check_out_dates?: CheckOutDates[];

	@ApiProperty({
		description: 'Data de início do evento',
		example: '2023-06-20T09:00:00Z',
		type: Date,
	})
	@IsNotEmpty({ message: 'Insira a data de início do evento!' })
	start_date: Date;

	@ApiProperty({
		description: 'Data de fim do evento',
		example: '2023-06-22T18:00:00Z',
		type: Date,
	})
	@IsNotEmpty({ message: 'Insira a data de fim do evento!' })
	end_date: Date;

	@ApiPropertyOptional({
		description: 'Indica se o evento é público',
		example: true,
		default: false,
	})
	@IsOptional()
	is_public: boolean;

	@ApiPropertyOptional({
		description: 'Detalhes adicionais sobre o evento',
		example: 'Este evento abordará conceitos avançados de NestJS.',
	})
	@IsString()
	@IsOptional()
	details: string;

	@ApiPropertyOptional({
		description: 'Número máximo de participantes',
		example: 100,
	})
	@IsNumber()
	@IsPositive({ message: 'Campo máximo de participantes não pode ser um número negativo' })
	@IsOptional()
	maximum_attendees?: number;

	@ApiPropertyOptional({
		description: 'Id do sistema parceiro',
		example: 1,
	})
	@IsNumber()
	@IsPositive({ message: 'Id do sistema parceiro não pode ser um número negativo' })
	@IsOptional()
	third_party_software_id?: number;

	@ApiPropertyOptional({
		description: 'login ids dos responsáveis do evento',
		example: '1, 2',
	})
	@IsArray()
	@IsOptional()
	responsible_login_ids?: string[];

	@ApiPropertyOptional({
		description: 'External link for event',
		example: 'https://youtube.com/watch?v=asdasda',
	})
	@IsString()
	@IsOptional()
	@MaxLength(500, { message: 'Link externo deve ter no máximo 500 caracteres, use um encurtador se for necessário' })
	external_link?: string;

	@ApiPropertyOptional({
		description: 'Nome do local',
		example: 'Central Park',
	})
	@IsString({ message: 'O campo nome do local precisa ser um texto.' })
	@IsOptional()
	@MaxLength(255, { message: 'Nome do local deve ter no máximo 255 caracteres.' })
	place_name?: string;

	@ApiPropertyOptional({
		description: 'Google Place ID da localização',
		example: 'ChIJ4zGFAZpYwokRGUGph3Mf37k',
	})
	@IsString({ message: 'O campo Place ID precisa ser um texto.' })
	@IsOptional()
	@MaxLength(255, { message: 'Place ID deve ter no máximo 255 caracteres.' })
	place_id?: string;

	@ApiPropertyOptional({
		description: 'Latitude da localização do evento',
		example: 40.785091,
	})
	@IsNumber({}, { message: 'Latitude deve ser um número.' })
	@IsOptional()
	lat?: number;

	@ApiPropertyOptional({
		description: 'Longitude da localização do evento',
		example: -73.968285,
	})
	@IsNumber({}, { message: 'Longitude deve ser um número.' })
	@IsOptional()
	lng?: number;

	@ApiPropertyOptional({
		description: 'Endereço formatado da localização do evento',
		example: 'New York, NY, USA',
	})
	@IsString({ message: 'O campo endereço formatado precisa ser um texto.' })
	@IsOptional()
	@MaxLength(255, { message: 'Endereço formatado deve ter no máximo 255 caracteres.' })
	formatted_address?: string;

	@ApiPropertyOptional({
		description: 'URL para a localização no Google Maps',
		example: 'https://maps.google.com/?q=Central+Park',
	})
	@IsString({ message: 'O campo URL da localização precisa ser um texto.' })
	@IsOptional()
	@IsUrl({}, { message: 'URL da localização deve ser uma URL válida.' })
	@MaxLength(500, { message: 'URL deve ter no máximo 500 caracteres.' })
	place_url?: string;
}
