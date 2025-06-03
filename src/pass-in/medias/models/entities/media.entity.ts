import { ApiProperty } from '@nestjs/swagger';
import { Event } from 'src/pass-in/events/models/entities/events.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ schema: 'passin', name: 'medias' })
export class Media {
	@PrimaryGeneratedColumn('uuid')
	@ApiProperty({ description: 'Unique identifier for the media', example: '123e4567-e89b-12d3-a456-426614174000' })
	id: string;

	@Column({ name: 'file_name', type: 'character varying', length: 255 })
	@ApiProperty({ description: 'The original name of the media file', example: 'event_photo.jpg' })
	file_name: string;

	@Column({ name: 'path', type: 'character varying', length: 500 })
	@ApiProperty({ description: 'File path where the media is stored', example: '/uploads/events/123e4567-e89b/media/event_photo.jpg' })
	path: string;

	@Column({ name: 'type', type: 'character varying', length: 50 })
	@ApiProperty({ description: 'Type of the media (image or video or pdf)', example: 'image' })
	type: string;

	@CreateDateColumn({ name: 'uploaded_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
	@ApiProperty({ description: 'Timestamp when the media was uploaded', example: '2024-06-10T12:00:00Z' })
	uploaded_at: Date;

	@ApiProperty({
		description: 'Unique identifier for the event',
		example: 'e290f1ee-6c54-4b01-90e6-d701748f0852',
	})
	@Column({ name: 'id_event', type: 'uuid', nullable: true })
	event_id?: string;

	@ManyToOne(() => Event, (event) => event.medias, { onDelete: 'CASCADE' })
	@JoinColumn({ name: 'id_event', referencedColumnName: 'id' })
	event: Event;
}
