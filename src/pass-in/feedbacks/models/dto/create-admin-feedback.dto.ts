import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { CreateFeedbackDto } from './create-feedback.dto';

export class CreateAdminFeedbackDto extends CreateFeedbackDto {
	@ApiProperty({
		description: 'ID do administrador responsável por criar o feedback',
		example: 42,
	})
	@IsNotEmpty()
	@IsNumber()
	admin_id: number;
}
