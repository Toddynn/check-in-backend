import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { EventsModule } from '../events/events.module';
import { Media } from './models/entities/media.entity';
import { MediasRepository } from './repository/medias.repository';
import { DeleteMediaController } from './use-cases/delete-media/delete-media.controller';
import { DeleteMediaUseCase } from './use-cases/delete-media/delete-media.use-case';
import { FindAllEventMediasForDeleteUseCase } from './use-cases/find-all-event-medias-for-delete/find-all-event-medias-for-delete.use-case';
import { FindAllEventMediasController } from './use-cases/find-all-event-medias/find-all-event-medias.controller';
import { FindAllEventMediasUseCase } from './use-cases/find-all-event-medias/find-all-event-medias.use-case';
import { FindOneMediaByIdUseCase } from './use-cases/find-one-by-id/find-one-by-id.use-case';
import { RenameMediaController } from './use-cases/rename-media/rename-media.controller';
import { RenameMediaUseCase } from './use-cases/rename-media/rename-media.use-case';
import { UploadEventMediaController } from './use-cases/upload-event-media/upload-event-media.controller';
import { UploadEventMediaUseCase } from './use-cases/upload-event-media/upload-event-media.use-case';

@Module({
	imports: [TypeOrmModule.forFeature([Media]), forwardRef(() => EventsModule), AuthModule],
	controllers: [UploadEventMediaController, FindAllEventMediasController, RenameMediaController, DeleteMediaController],
	providers: [
		{ provide: 'MediasRepositoryInterface', useExisting: MediasRepository },
		MediasRepository,
		UploadEventMediaUseCase,
		FindAllEventMediasUseCase,
		FindAllEventMediasForDeleteUseCase,
		FindOneMediaByIdUseCase,
		RenameMediaUseCase,
		DeleteMediaUseCase,
	],
	exports: [{ provide: 'MediasRepositoryInterface', useExisting: MediasRepository }],
})
export class MediasModule {}
