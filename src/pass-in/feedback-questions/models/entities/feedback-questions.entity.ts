import { ApiProperty } from '@nestjs/swagger';
import { Event } from 'src/pass-in/events/models/entities/events.entity';
import { EXPECTED_FEEDBACK_TYPE_OF_ANSWER } from 'src/shared/utils/constants/enums/expected-feedback-type-of-answer';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ schema: 'passin', name: 'feedback_questions' })
export class FeedbackQuestion {
	@PrimaryGeneratedColumn({ type: 'bigint' })
	@ApiProperty({ description: 'Unique identifier for the feedback question', example: '2' })
	id: string;

	@Column({ name: 'question', type: 'text' })
	@ApiProperty({ description: 'question' })
	question: string;

	@Column({ name: 'helper_text', type: 'text', nullable: true })
	@ApiProperty({ description: 'helper text of the question' })
	helper_text: string;

	@Column({ name: 'expected_response', type: 'enum', enum: EXPECTED_FEEDBACK_TYPE_OF_ANSWER })
	@ApiProperty({ description: 'expected response', enum: EXPECTED_FEEDBACK_TYPE_OF_ANSWER })
	expected_response: EXPECTED_FEEDBACK_TYPE_OF_ANSWER;

	@Column({ name: 'id_event', type: 'uuid' })
	@ApiProperty({ description: 'Id of event' })
	event_id: string;

	@ManyToOne(() => Event, (event) => event.feedback_questions, { onDelete: 'CASCADE' })
	@JoinColumn({ name: 'id_event', referencedColumnName: 'id' })
	event: Event;

	@CreateDateColumn({ name: 'created_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
	@ApiProperty({ description: 'date when the question was created', example: '2022-01-01T10:00:00Z' })
	created_at: Date;

	@Column({ name: 'updated_at', type: 'timestamptz', nullable: true })
	@ApiProperty({ description: 'date when the question was updated', example: '2022-01-01T10:00:00Z' })
	updated_at?: Date;
}
