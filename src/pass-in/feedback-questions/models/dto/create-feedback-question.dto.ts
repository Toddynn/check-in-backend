import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';
import { EXPECTED_FEEDBACK_TYPE_OF_ANSWER } from 'src/shared/utils/constants/enums/expected-feedback-type-of-answer';

export class CreateFeedbackQuestionDto {
	@ApiProperty({
		description: 'Pergunta de feedback',
		example: 'Como você avaliaria esse evento?',
	})
	@IsNotEmpty({ message: 'Campo pergunta é obrigatório.' })
	@MaxLength(100, { message: 'Pergunta deve ter no máximo 100 caracteres.' })
	@IsString({ message: 'A pergunta precisa ser um texto.' })
	question: string;

	@ApiProperty({
		description: 'Id do evento',
	})
	@IsNotEmpty({ message: 'Campo id do evento é obrigatório.' })
	@IsUUID(4, { message: 'Você precisa escolher um evento para adicionar essa pergunta' })
	event_id: string;

	@ApiProperty({
		description: 'expected response',
		enum: EXPECTED_FEEDBACK_TYPE_OF_ANSWER,
		example: EXPECTED_FEEDBACK_TYPE_OF_ANSWER.RATING,
	})
	@IsNotEmpty({ message: 'Campo tipo de resposta é obrigatório.' })
	expected_response: EXPECTED_FEEDBACK_TYPE_OF_ANSWER;

	@ApiProperty({ description: 'helper text of the question' })
	@IsString({ message: 'Mensagem auxiliar deve ser uma string' })
	@IsOptional()
	helper_text?: string;
}
