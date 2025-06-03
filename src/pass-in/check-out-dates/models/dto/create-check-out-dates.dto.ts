import { IsDateString, IsNotEmpty, IsUUID } from 'class-validator';

export class CreateCheckOutDatesDto {
	@IsNotEmpty({ message: 'A data de início não pode estar vazia.' })
	@IsDateString({}, { message: 'A data de início deve estar em um formato de data válido.' })
	start_date: Date;

	@IsNotEmpty({ message: 'A data de término não pode estar vazia.' })
	@IsDateString({}, { message: 'A data de término deve estar em um formato de data válido.' })
	end_date: Date;

	@IsNotEmpty({ message: 'O ID do evento não pode estar vazio.' })
	@IsUUID('4', { message: 'O ID do evento deve ser um UUID válido.' })
	event_id: string;
}
