import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Attendee } from 'src/pass-in/attendees/models/entities/attendee.entity';
import { Event } from 'src/pass-in/events/models/entities/events.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ schema: 'passin', name: 'feedbacks' })
export class Feedback {
	@PrimaryGeneratedColumn({ type: 'bigint' })
	@ApiProperty({ description: 'Unique identifier for the feedback', example: '' })
	id: string;

	@Column({ name: 'text', type: 'text', nullable: true })
	@ApiProperty({ description: 'Text of feedback', example: 'evento legall' })
	text?: string;

	@Column({ name: 'created_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
	@ApiProperty({ description: 'Timestamp when the feedback was created', example: '2024-06-10T12:00:00Z' })
	created_at: Date;

	@Column({ name: 'updated_at', type: 'timestamptz', nullable: true })
	@ApiProperty({ description: 'Timestamp when the feedback was last updated', example: '2024-06-11T12:00:00Z' })
	updated_at: Date;

	@Column({ name: 'id_attendee', type: 'uuid', nullable: true })
	@ApiPropertyOptional({ description: 'Id of attendee' })
	attendee_id?: string;

	@Column({ name: 'id_admin', type: 'bigint', nullable: true })
	@ApiPropertyOptional({ description: 'Id of admin' })
	admin_id?: number;

	@Column({ name: 'admin', type: 'character varying', length: 200, nullable: true })
	@ApiPropertyOptional({ description: 'name of admin' })
	admin?: string;

	@Column({ name: 'id_event', type: 'uuid' })
	@ApiProperty({ description: 'Id of event' })
	event_id: string;

	@Column({ name: 'feedback_extra_answers', type: 'jsonb', nullable: true })
	@ApiProperty({ description: 'feedback extra event questions answers' })
	feedback_extra_answers: { question_id: string; answer: string; question: string }[];

	//relations

	@ManyToOne(() => Event, (event) => event.feedbacks, { onDelete: 'CASCADE' })
	@JoinColumn({ name: 'id_event', referencedColumnName: 'id' })
	event: Event;

	@OneToOne(() => Attendee, (attendee) => attendee.feedback, { onDelete: 'CASCADE' })
	@JoinColumn({ name: 'id_attendee', referencedColumnName: 'id' })
	attendee?: Attendee;
}
