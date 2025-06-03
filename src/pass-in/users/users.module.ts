import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { User } from './models/entities/user.entity';
import { UsersRepository } from './repository/users.repository';
import { CreateUserController } from './use-cases/create/create.controller';
import { CreateUserUseCase } from './use-cases/create/create.use-case';
import { FindAllAdminUsersPaginatedController } from './use-cases/find-all-admins-paginated/find-all-admin-users-paginated.controller';
import { FindAllAdminUsersPaginatedUseCase } from './use-cases/find-all-admins-paginated/find-all-admin-users-paginated.use-case';
import { FindAllAdminUsersController } from './use-cases/find-all-admins/find-all-admin-users.controller';
import { FindAllAdminUsersUseCase } from './use-cases/find-all-admins/find-all-admin-users.use-case';
import { FindAllUsersController } from './use-cases/find-all/find-all.controller';
import { FindAllUsersUseCase } from './use-cases/find-all/find-all.use-case';
import { FindNotIncludedUsersInEventController } from './use-cases/find-not-included-in-event/find-not-included-in-event.controller';
import { FindNotIncludedUsersInEventUseCase } from './use-cases/find-not-included-in-event/find-not-included-in-event.use-case';
import { FindOneUserByDocumentController } from './use-cases/find-one-by-document/find-one-by-document.controller';
import { FindOneUserByDocumentUseCase } from './use-cases/find-one-by-document/find-one-by-document.use-case';
import { FindOneUserByEmailUseCase } from './use-cases/find-one-by-email/find-one-by-email.use-case';
import { FindOneUserByIdUseCase } from './use-cases/find-one-by-id/find-one-by-id.use-case';
import { FindOneUserByPhoneNumberUseCase } from './use-cases/find-one-by-phone/find-one-by-phone.use-case';
import { PublicUpdateUserController } from './use-cases/public-update/public-update.controller';
import { PublicUpdateUserUseCase } from './use-cases/public-update/public-update.use-case';
import { UpdateUserController } from './use-cases/update/update.controller';
import { UpdateUserUseCase } from './use-cases/update/update.use-case';

@Module({
	imports: [TypeOrmModule.forFeature([User]), AuthModule],
	controllers: [
		CreateUserController,
		UpdateUserController,
		PublicUpdateUserController,
		FindAllUsersController,
		FindAllAdminUsersPaginatedController,
		FindNotIncludedUsersInEventController,
		FindAllAdminUsersController,
		FindOneUserByDocumentController,
	],
	providers: [
		{ provide: 'UsersRepositoryInterface', useExisting: UsersRepository },
		UsersRepository,
		CreateUserUseCase,
		UpdateUserUseCase,
		PublicUpdateUserUseCase,
		FindAllUsersUseCase,
		FindNotIncludedUsersInEventUseCase,
		FindOneUserByDocumentUseCase,
		FindOneUserByEmailUseCase,
		FindOneUserByIdUseCase,
		FindOneUserByPhoneNumberUseCase,
		FindAllAdminUsersUseCase,
		FindAllAdminUsersPaginatedUseCase,
	],
	exports: [
		FindOneUserByEmailUseCase,
		FindOneUserByIdUseCase,
		FindAllAdminUsersUseCase,
		{ provide: 'UsersRepositoryInterface', useExisting: UsersRepository },
	],
})
export class UsersModule {}
