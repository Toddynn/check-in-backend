import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { ThirdPartySoftwares } from './models/entities/third-party-softwares.entity';
import { ThirdPartySoftwaresRepository } from './repository/third-party-softwares.repository';
import { FindAllThirdPartySoftwaresController } from './use-cases/find-all/find-all-third-party-softwares.controller';
import { FindAllThirdPartySoftwaresUseCase } from './use-cases/find-all/find-all-third-party-softwares.use-case';
import { FindOneThirdPartySoftwareUseCase } from './use-cases/find-one/find-one-third-party-software.use-case';

@Module({
	imports: [TypeOrmModule.forFeature([ThirdPartySoftwares]), AuthModule],
	controllers: [FindAllThirdPartySoftwaresController],
	providers: [
		{ provide: 'ThirdPartySoftwaresRepositoryInterface', useExisting: ThirdPartySoftwaresRepository },
		ThirdPartySoftwaresRepository,
		FindOneThirdPartySoftwareUseCase,
		FindAllThirdPartySoftwaresUseCase,
	],
	exports: [FindOneThirdPartySoftwareUseCase, { provide: 'ThirdPartySoftwaresRepositoryInterface', useExisting: ThirdPartySoftwaresRepository }],
})
export class ThirdPartySoftwaresModule {}
