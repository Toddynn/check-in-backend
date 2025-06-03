import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Event } from 'src/pass-in/events/models/entities/events.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ schema: 'passin', name: 'records' })
export class Record {
	@PrimaryGeneratedColumn('uuid')
	@ApiProperty({ description: 'Unique identifier for the event minutes', example: '123e4567-e89b-12d3-a456-426614174001' })
	id: string;

	@ApiProperty({
		description: 'Unique identifier for the event',
		example: 'e290f1ee-6c54-4b01-90e6-d701748f0852',
	})
	@Column({ name: 'id_event', type: 'uuid' })
	event_id: string;

	@Column({ name: 'content', type: 'jsonb' })
	@ApiProperty({
		description: 'Content of the minutes (structured JSON)',
		example: { summary: 'Discussed roadmap for Q3', decisions: ['Move deadline', 'Hire more devs'] },
	})
	content: unknown;

	@Column({ name: 'created_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
	@ApiProperty({ description: 'Timestamp when the minutes were created', example: '2024-06-10T12:00:00Z' })
	created_at: Date;

	@Column({ name: 'created_by', type: 'character varying', length: 255 })
	@ApiProperty({ description: 'Flag indicating who created the record of event' })
	created_by: string;

	@Column({ name: 'created_by_login_id', type: 'bigint' })
	@ApiProperty({ description: 'login id of who created the record of event' })
	created_by_login_id: number;

	@Column({ name: 'updated_at', type: 'timestamptz', nullable: true })
	@ApiPropertyOptional({ description: 'Timestamp when the minutes were last updated', example: '2024-06-11T12:00:00Z' })
	updated_at?: Date;

	@ManyToOne(() => Event, (event) => event.records)
	@JoinColumn({ name: 'id_event', referencedColumnName: 'id' })
	event: Event;
}
