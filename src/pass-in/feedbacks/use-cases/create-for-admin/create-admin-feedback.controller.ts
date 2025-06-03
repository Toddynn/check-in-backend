import { Body, Controller, Inject, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetCurrentUser } from 'src/auth/models/decorators/get-current-user.decorator';
import { JwtAuthGuard } from 'src/auth/models/guards/jwt-auth.guard';
import { CurrentUser } from 'src/auth/models/interfaces/current-user';
import { CreateFeedbackDto } from '../../models/dto/create-feedback.dto';
import { CreateAdminFeedbackUseCase } from './create-admin-feedback.use-case';
import { CreateAdminFeedbackDocs } from './docs';

@ApiTags('Feedbacks')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('feedbacks')
export class CreateAdminFeedbackController {
	constructor(
		@Inject(CreateAdminFeedbackUseCase)
		private readonly createAdminFeedbackUseCase: CreateAdminFeedbackUseCase,
	) {}

	@Post()
	@CreateAdminFeedbackDocs()
	async execute(@Body() createFeedbackDto: CreateFeedbackDto, @GetCurrentUser() current_user: CurrentUser) {
		return await this.createAdminFeedbackUseCase.execute(createFeedbackDto, current_user);
	}
}
