import { Controller, Delete, Inject, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { IsPublic } from 'src/auth/models/decorators/is-public.decorator';
import { DeletePublicAttendeeDocs } from './docs';
import { DeletePublicAttendeeUseCase } from './public-delete.use-case';

@ApiTags('Attendees')
@IsPublic()
@Controller('attendees')
export class DeletePublicAttendeeController {
	constructor(
		@Inject(DeletePublicAttendeeUseCase)
		private readonly deletePublicAttendeeUseCase: DeletePublicAttendeeUseCase,
	) {}

	@Delete(':attendee_id/:user_id/public')
	@DeletePublicAttendeeDocs()
	async execute(@Param('attendee_id') attendee_id: string, @Param('user_id') user_id: string) {
		return await this.deletePublicAttendeeUseCase.execute(attendee_id, user_id);
	}
}
