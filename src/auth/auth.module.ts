import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './models/strategies/jwt.strategy';
import { LogInController } from './use-cases/log-in/log-in.controller';
import { LogInUseCase } from './use-cases/log-in/log-in.use-case';
import { LogOutController } from './use-cases/log-out/log-out.controller';
import { LogOutUseCase } from './use-cases/log-out/log-out.use-case';
import { RefreshController } from './use-cases/refresh/refresh.controller';
import { RefreshUseCase } from './use-cases/refresh/refresh.use-case';
import { ValidateAndDecodeTokenUseCase } from './use-cases/validate-and-decode-token/validate-and-decode-token.use-case';

@Module({
	imports: [PassportModule],
	controllers: [LogInController, RefreshController, LogOutController],
	providers: [LogInUseCase, RefreshUseCase, LogOutUseCase, ValidateAndDecodeTokenUseCase, JwtStrategy],
	exports: [ValidateAndDecodeTokenUseCase],
})
export class AuthModule {}
