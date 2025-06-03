import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CheckIn } from 'src/pass-in/check-ins/models/entities/check-in.entity';
import { CheckOut } from 'src/pass-in/check-outs/models/entities/check-outs.entity';
import { Event } from 'src/pass-in/events/models/entities/events.entity';
import { Feedback } from 'src/pass-in/feedbacks/models/entities/feedback.entity';
import { User } from 'src/pass-in/users/models/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ schema: 'passin', name: 'attendees' })
export class Attendee {
	@ApiProperty({
		description: 'Unique identifier for the attendee',
		example: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
	})
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@ApiProperty({
		description: 'Timestamp when the attendee was created',
		example: '2023-06-11T08:00:00Z',
	})
	@Column({ name: 'created_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
	created_at: Date;

	@ApiProperty({
		description: 'Timestamp when the attendee was last updated',
		example: '2023-06-11T08:00:00Z',
		required: false,
	})
	@Column({ name: 'updated_at', type: 'timestamptz', nullable: true })
	updated_at: Date;

	@ApiProperty({
		description: 'Unique identifier for the event',
		example: 'e290f1ee-6c54-4b01-90e6-d701748f0852',
	})
	@Column({ name: 'id_event', type: 'uuid' })
	event_id: string;

	@ApiProperty({
		description: 'Unique identifier for the user',
		example: 'u290f1ee-6c54-4b01-90e6-d701748f0853',
	})
	@Column({ name: 'id_user', type: 'uuid' })
	user_id: string;

	@ApiPropertyOptional({
		description: 'nrCupom of attendee for mestres event',
		example: 'ins13214564',
	})
	@Column({ name: 'nr_cupom', type: 'character varying', length: 255, nullable: true })
	nr_cupom?: string;

	@ManyToOne(() => Event, (event) => event.attendees)
	@JoinColumn({ name: 'id_event', referencedColumnName: 'id' })
	event: Event;

	@OneToMany(() => CheckIn, (check_in) => check_in.attendee)
	check_in: CheckIn[];

	@OneToMany(() => CheckOut, (check_out) => check_out.attendee)
	check_out: CheckOut[];

	@ManyToOne(() => User, (user) => user.attendee)
	@JoinColumn({ name: 'id_user', referencedColumnName: 'id' })
	user: User;

	@OneToOne(() => Feedback, (feedback) => feedback.attendee)
	feedback?: Feedback;
}
