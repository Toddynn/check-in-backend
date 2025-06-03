import { UnauthorizedException } from '@nestjs/common';

export function extractToken(authorizationHeader: string): string {
	if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
		throw new UnauthorizedException('Token inválido ou ausente.');
	}

	const token = authorizationHeader.split(' ')[1];
	if (!token) {
		throw new UnauthorizedException('Token inválido.');
	}

	return token;
}
