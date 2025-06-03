import { Body, Controller, Inject, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetCurrentUser } from 'src/auth/models/decorators/get-current-user.decorator';
import { JwtAuthGuard } from 'src/auth/models/guards/jwt-auth.guard';
import { CurrentUser } from 'src/auth/models/interfaces/current-user';
import { CreateRecordDto } from '../../models/dto/create-record.dto';
import { CreateRecordUseCase } from './create-record.use-case';
import { CreateRecordDocs } from './docs';

@ApiTags('Records')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('records')
export class CreateRecordController {
	constructor(
		@Inject(CreateRecordUseCase)
		private readonly createRecordUseCase: CreateRecordUseCase,
	) {}

	@Post()
	@CreateRecordDocs()
	async execute(@Body() createRecordDto: CreateRecordDto, @GetCurrentUser() current_user: CurrentUser) {
		return await this.createRecordUseCase.execute(createRecordDto, current_user);
	}
}
