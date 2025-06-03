import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { EventsModule } from '../events/events.module';
import { Record } from './models/entities/records.entity';
import { RecordsRepository } from './repository/records.repository';
import { CreateRecordController } from './use-cases/create/create-record.controller';
import { CreateRecordUseCase } from './use-cases/create/create-record.use-case';
import { FindLastRecordByEventIdController } from './use-cases/find-last-by-event-id/find-last-record-by-event-id.controller';
import { FindLastRecordByEventIdUseCase } from './use-cases/find-last-by-event-id/find-last-record-by-event-id.use-case';

@Module({
	imports: [TypeOrmModule.forFeature([Record]), forwardRef(() => EventsModule), AuthModule],
	controllers: [CreateRecordController, FindLastRecordByEventIdController],
	providers: [
		{ provide: 'RecordsRepositoryInterface', useExisting: RecordsRepository },
		RecordsRepository,
		CreateRecordUseCase,
		FindLastRecordByEventIdUseCase,
	],
	exports: [{ provide: 'RecordsRepositoryInterface', useExisting: RecordsRepository }, FindLastRecordByEventIdUseCase],
})
export class RecordsModule {}
