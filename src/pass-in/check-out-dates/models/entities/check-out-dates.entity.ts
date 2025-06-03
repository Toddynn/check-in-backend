import { ApiProperty } from '@nestjs/swagger';
import { Event } from 'src/pass-in/events/models/entities/events.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ schema: 'passin', name: 'check_out_dates' })
export class CheckOutDates {
	@ApiProperty({
		description: 'Identificador único da data de check-out',
		example: '1',
		type: String,
	})
	@PrimaryGeneratedColumn({ type: 'bigint' })
	id: string;

	@ApiProperty({
		description: 'Data e hora de início do check-out',
		example: '2025-05-13T17:00:00.000Z',
		type: String,
		format: 'date-time',
	})
	@Column({ name: 'start_date', type: 'timestamptz' })
	start_date: Date;

	@ApiProperty({
		description: 'Data e hora de término do check-out',
		example: '2025-05-13T18:00:00.000Z',
		type: String,
		format: 'date-time',
	})
	@Column({ name: 'end_date', type: 'timestamptz' })
	end_date: Date;

	@ApiProperty({
		description: 'ID do evento ao qual essa data de check-out está vinculada',
		example: 'c4f94650-88a0-4c38-b69b-86302c56fa5b',
	})
	@Column({ name: 'id_event', type: 'uuid' })
	event_id: string;

	@ManyToOne(() => Event, (event: Event) => event.check_out_dates)
	@JoinColumn({ name: 'id_event', referencedColumnName: 'id' })
	event: Event;
}
