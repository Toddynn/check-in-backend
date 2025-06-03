import { ApiProperty } from '@nestjs/swagger';
import { Attendee } from 'src/pass-in/attendees/models/entities/attendee.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ schema: 'passin', name: 'check_ins' })
export class CheckIn {
	@ApiProperty({
		description: 'ID do check-in',
		example: 'checkin-789',
	})
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@ApiProperty({
		description: 'Data de criação do check-in',
		example: '2024-06-11T14:20:00Z',
	})
	@Column({ name: 'created_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
	created_at: Date;

	@ApiProperty({
		description: 'ID do participante',
		example: 'attendee-456',
	})
	@Column({ name: 'id_attendee', type: 'uuid' })
	attendee_id: string;

	@ManyToOne(() => Attendee, (attendee) => attendee.check_in)
	@JoinColumn({ name: 'id_attendee', referencedColumnName: 'id' })
	attendee: Attendee;
}
