import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Attendee } from 'src/pass-in/attendees/models/entities/attendee.entity';
import { CheckInDates } from 'src/pass-in/check-in-dates/models/entities/check-in-dates.entity';
import { CheckOutDates } from 'src/pass-in/check-out-dates/models/entities/check-out-dates.entity';
import { FeedbackQuestion } from 'src/pass-in/feedback-questions/models/entities/feedback-questions.entity';
import { Feedback } from 'src/pass-in/feedbacks/models/entities/feedback.entity';
import { Media } from 'src/pass-in/medias/models/entities/media.entity';
import { Record } from 'src/pass-in/records/models/entities/records.entity';
import { ThirdPartySoftwares } from 'src/pass-in/third-party-softwares/models/entities/third-party-softwares.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ schema: 'passin', name: 'events' })
export class Event {
	@PrimaryGeneratedColumn('uuid')
	@ApiProperty({ description: 'Unique identifier for the event', example: '123e4567-e89b-12d3-a456-426614174000' })
	id: string;

	@Column({ name: 'title', type: 'character varying', length: 100 })
	@ApiProperty({ description: 'Title of the event', example: 'Annual Meeting' })
	title: string;

	@Column({ name: 'details', type: 'text' })
	@ApiProperty({ description: 'Details about the event', example: 'This is the annual meeting for all employees.' })
	details: string;

	@Column({ name: 'start_date', type: 'timestamptz' })
	@ApiProperty({ description: 'Start date and time of the event', example: '2024-06-15T09:00:00Z' })
	start_date: Date;

	@Column({ name: 'end_date', type: 'timestamptz' })
	@ApiProperty({ description: 'End date and time of the event', example: '2024-06-15T17:00:00Z' })
	end_date: Date;

	@Column({ name: 'maximum_attendees', type: 'smallint', nullable: true })
	@ApiPropertyOptional({ description: 'Maximum number of attendees allowed', example: 100 })
	maximum_attendees?: number;

	@Column({ name: 'created_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
	@ApiProperty({ description: 'Timestamp when the event was created', example: '2024-06-10T12:00:00Z' })
	created_at: Date;

	@Column({ name: 'updated_at', type: 'timestamptz', nullable: true })
	@ApiPropertyOptional({ description: 'Timestamp when the event was last updated', example: '2024-06-11T12:00:00Z' })
	updated_at?: Date;

	@Column({ name: 'is_public', type: 'boolean', default: false, nullable: true })
	@ApiProperty({ description: 'Flag indicating if the event is public', example: false })
	is_public: boolean;

	@Column({ name: 'id_third_party_software', type: 'bigint', nullable: true })
	@ApiPropertyOptional({ description: 'Id of third party software' })
	third_party_software_id?: number;

	@Column({ name: 'id_logins_responsibles', type: 'bigint', array: true, nullable: true })
	@ApiPropertyOptional({ description: 'Id of responsible of the event' })
	responsible_login_ids?: string[];

	@Column({ name: 'created_by', type: 'character varying', length: 255 })
	@ApiProperty({ description: 'Flag indicating who created the event' })
	created_by: string;

	@Column({ name: 'created_by_login_id', type: 'bigint' })
	@ApiProperty({ description: 'login id of who created the event' })
	created_by_login_id: number;

	@Column({ name: 'external_link', type: 'character varying', length: 500, nullable: true })
	@ApiPropertyOptional({ description: 'A external link that you want to create for event' })
	external_link?: string;

	@Column({ name: 'place_name', type: 'character varying', length: 500, nullable: true })
	@ApiPropertyOptional({ description: 'Name of the place', example: 'Central Park' })
	place_name?: string;

	@Column({ name: 'place_id', type: 'character varying', length: 255, nullable: true })
	@ApiPropertyOptional({ description: 'Google Place ID of the location', example: 'ChIJ4zGFAZpYwokRGUGph3Mf37k' })
	place_id?: string;

	@Column({ name: 'latitude', type: 'double precision', nullable: true })
	@ApiProperty({ description: 'Latitude of the event location', example: 40.785091 })
	lat?: number;

	@Column({ name: 'longitude', type: 'double precision', nullable: true })
	@ApiProperty({ description: 'Longitude of the event location', example: -73.968285 })
	lng?: number;

	@Column({ name: 'formatted_address', type: 'text', nullable: true })
	@ApiPropertyOptional({ description: 'Formatted address of the event location', example: 'New York, NY, USA' })
	formatted_address?: string;

	@Column({ name: 'place_url', type: 'character varying', length: 500, nullable: true })
	@ApiPropertyOptional({ description: 'URL for the location in Google Maps', example: 'https://maps.google.com/?q=Central+Park' })
	place_url?: string;

	@Column({ name: 'is_feedback_open', type: 'boolean', default: false })
	@ApiPropertyOptional({ description: 'if public feedback is open or closed', example: true })
	is_feedback_open?: boolean;

	@OneToMany(() => Attendee, (attendees) => attendees.event)
	@ApiProperty({ type: () => [Attendee], description: 'List of attendees for the event' })
	attendees: Attendee[];

	@OneToMany(() => CheckInDates, (check_in_dates) => check_in_dates.event)
	@ApiProperty({ type: () => [CheckInDates], description: 'List of check in dates associated with the event' })
	check_in_dates: CheckInDates[];

	@OneToMany(() => CheckOutDates, (check_out_dates) => check_out_dates.event)
	@ApiProperty({ type: () => [CheckOutDates], description: 'List of check out dates associated with the event' })
	check_out_dates: CheckOutDates[];

	@OneToMany(() => Feedback, (feedback) => feedback.event)
	@ApiProperty({ type: () => [Feedback], description: 'List of Feedbacks associated with the user' })
	feedbacks: Feedback[];

	@OneToMany(() => FeedbackQuestion, (feedback_question) => feedback_question.event)
	@ApiProperty({ type: () => [FeedbackQuestion], description: 'List of Feedbacks questions associated with the event' })
	feedback_questions: FeedbackQuestion[];

	@OneToMany(() => Record, (records) => records.event)
	@ApiProperty({ type: () => [Record], description: 'List of records for the event' })
	records: Record[];

	@ManyToOne(() => ThirdPartySoftwares, (third_party_software) => third_party_software.event)
	@JoinColumn({ name: 'id_third_party_software', referencedColumnName: 'id' })
	third_party_software: ThirdPartySoftwares;

	@OneToMany(() => Media, (media) => media.event)
	@ApiProperty({ type: () => [Media], description: 'List of media files for the event' })
	medias: Media[];
}
