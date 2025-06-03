import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Event } from 'src/pass-in/events/models/entities/events.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ schema: 'passin', name: 'third_party_softwares' })
export class ThirdPartySoftwares {
	@PrimaryGeneratedColumn({ type: 'bigint' })
	@ApiProperty({ description: 'Unique identifier for the software', example: '123e4567-e89b-12d3-a456-426614174000' })
	id: number;

	@Column({ name: 'name', type: 'character varying', length: 100 })
	@ApiProperty({ description: 'name of the software', example: 'Mestres da Instalação' })
	name: string;

	@Column({ name: 'created_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
	@ApiProperty({ description: 'Timestamp when the tp-software was created', example: '2024-06-10T12:00:00Z' })
	created_at: Date;

	@Column({ name: 'updated_at', type: 'timestamptz', nullable: true })
	@ApiPropertyOptional({ description: 'Timestamp when the tp-software was last updated', example: '2024-06-11T12:00:00Z' })
	updated_at: Date;

	@OneToMany(() => Event, (event) => event.third_party_software)
	@ApiPropertyOptional({
		description: 'List of related events',
		type: () => [Event],
	})
	event: Event[];
}
