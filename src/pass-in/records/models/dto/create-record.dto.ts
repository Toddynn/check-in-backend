import { ApiProperty } from '@nestjs/swagger';
import { IsObject, IsUUID } from 'class-validator';

export class CreateRecordDto {
	@ApiProperty({
		description: 'Structured content of the event record (minutes, decisions, discussions...)',
		example: {
			agenda: 'Sprint Planning',
			pointsDiscussed: ['Backlog review', 'Estimation of stories'],
			decisions: ['Postpone feature X', 'Move feature Y to next sprint'],
		},
	})
	@IsObject()
	content: Record<string, any>;

	@ApiProperty({
		description: 'UUID of the event to which the record belongs',
		example: 'e290f1ee-6c54-4b01-90e6-d701748f0852',
	})
	@IsUUID('4')
	event_id: string;
}
