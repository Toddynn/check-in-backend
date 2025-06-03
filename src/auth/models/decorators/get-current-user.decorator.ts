import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { jwtDecode } from 'jwt-decode';
import { extractToken } from 'src/shared/utils/functions/extract-token';
import { CurrentUser } from '../interfaces/current-user';

export const GetCurrentUser = createParamDecorator(async (data: unknown, ctx: ExecutionContext): Promise<CurrentUser> => {
	const request = ctx.switchToHttp().getRequest();
	const authHeader = request.headers['authorization'];

	const token = extractToken(authHeader);
	const user = jwtDecode(token);

	request.user = user;

	return { user: request.user, token };
});
