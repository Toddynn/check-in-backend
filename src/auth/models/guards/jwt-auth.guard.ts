// guards/jwt-auth.guard.ts
import { ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { ValidateAndDecodeTokenUseCase } from 'src/auth/use-cases/validate-and-decode-token/validate-and-decode-token.use-case';
import { extractToken } from 'src/shared/utils/functions/extract-token';
import { IS_PUBLIC_KEY } from '../decorators/is-public.decorator';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { CurrentUser } from '../interfaces/current-user';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
	constructor(
		private readonly reflector: Reflector,
		private readonly validateAndDecodeTokenUseCase: ValidateAndDecodeTokenUseCase,
	) {
		super();
	}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		if (this.isPublicRoute(context)) {
			return true;
		}

		const request = context.switchToHttp().getRequest();
		const token = extractToken(request.headers['authorization']);

		const user = await this.validateAndDecodeTokenUseCase.execute(token);

		request.user = user;

		this.validateRoles(user, context);

		return true;
	}

	private isPublicRoute(context: ExecutionContext): boolean {
		return this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [context.getHandler(), context.getClass()]);
	}

	private validateRoles(user: CurrentUser, context: ExecutionContext): void {
		const requiredRoles = this.reflector.getAllAndOverride<number[]>(ROLES_KEY, [context.getHandler(), context.getClass()]);

		if (!requiredRoles) {
			return; // Se não há roles necessárias, permite o acesso
		}

		const userRoles = user.user.roles;
		const hasRole = requiredRoles.some((role) => userRoles?.includes(role));

		if (!hasRole) {
			throw new ForbiddenException('Você não tem permissão para acessar este recurso.');
		}
	}
}
