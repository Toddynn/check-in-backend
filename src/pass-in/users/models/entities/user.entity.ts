import { ApiProperty } from '@nestjs/swagger';
import { Attendee } from 'src/pass-in/attendees/models/entities/attendee.entity';
import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ schema: 'passin', name: 'users' })
export class User {
	@PrimaryGeneratedColumn('uuid')
	@ApiProperty({ description: 'The unique identifier for the user' })
	id: string;

	@Index()
	@Column({ name: 'document', type: 'character varying', length: 60, unique: true, nullable: true })
	@ApiProperty({ description: 'The document number of the user', maxLength: 60 })
	document: string;

	@Column({ name: 'document_identifier', type: 'character varying', length: 3, unique: false, nullable: true })
	document_identifier: string;

	@Column({ name: 'accept_terms', type: 'boolean' })
	@ApiProperty({ description: 'Indicates whether the user accepted the terms' })
	accept_terms: boolean;

	@Column({ name: 'name', type: 'character varying', length: 150 })
	@ApiProperty({ description: 'The name of the user', maxLength: 150 })
	name: string;

	@Column({ name: 'email', type: 'character varying', unique: true, length: 100 })
	@ApiProperty({ description: 'The email address of the user', maxLength: 100 })
	email: string;

	@Column({ name: 'phone_number', type: 'character varying', unique: true, length: 30, nullable: true })
	@ApiProperty({ description: 'The phone number of the user', maxLength: 30, required: false })
	phone_number: string;

	@Column({ name: 'created_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
	@ApiProperty({ description: 'The date and time when the user was created' })
	created_at: Date;

	@Column({ name: 'updated_at', type: 'timestamptz', nullable: true })
	@ApiProperty({ description: 'The date and time when the user was last updated', required: false })
	updated_at: Date;

	@OneToMany(() => Attendee, (attendee) => attendee.user)
	@ApiProperty({ type: () => [Attendee], description: 'List of attendees associated with the user' })
	attendee: Attendee[];
}
