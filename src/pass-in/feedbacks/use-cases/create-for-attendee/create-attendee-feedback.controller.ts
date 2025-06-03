import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { IsPublic } from 'src/auth/models/decorators/is-public.decorator';
import { CreateAttendeeFeedbackDto } from '../../models/dto/create-attendee-feedback.dto';
import { CreateAttendeeFeedbackUseCase } from './create-attendee-feedback.use-case';
import { CreateAttendeeFeedbackDocs } from './docs';

@ApiTags('Feedbacks')
@IsPublic()
@Controller('feedbacks')
export class CreateAttendeeFeedbackController {
	constructor(
		@Inject(CreateAttendeeFeedbackUseCase)
		private readonly createAttendeeFeedbackUseCase: CreateAttendeeFeedbackUseCase,
	) {}

	@Post('/public')
	@CreateAttendeeFeedbackDocs()
	async execute(@Body() createFeedbackDto: CreateAttendeeFeedbackDto) {
		return await this.createAttendeeFeedbackUseCase.execute(createFeedbackDto);
	}
}
