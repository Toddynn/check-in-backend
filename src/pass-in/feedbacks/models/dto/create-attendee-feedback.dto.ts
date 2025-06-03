import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { CreateFeedbackDto } from './create-feedback.dto';

export class CreateAttendeeFeedbackDto extends CreateFeedbackDto {
	@ApiProperty({
		description: 'ID do participante que está enviando o feedback',
		example: 'att_abc123',
	})
	@IsNotEmpty()
	@IsString()
	attendee_id: string;

	@ApiProperty({
		description: 'Lista de respostas extras para perguntas específicas do evento. Cada item contém o ID da pergunta, a resposta e o texto da pergunta.',
		example: [
			{
				question_id: 'q1',
				answer: 'Sim',
				question: 'Você voltaria a participar?',
			},
			{
				question_id: 'q2',
				answer: 'Melhorar a pontualidade',
				question: 'O que podemos melhorar?',
			},
		],
	})
	@IsNotEmpty({ message: 'as respostas não podem estar vazias.' })
	@IsArray({
		message: 'O campo "feedback_extra_answers" é um array de objetos: [{ question_id: string; answer: string, question: string }].',
	})
	feedback_extra_answers: { question_id: string; answer: string; question: string }[];
}
