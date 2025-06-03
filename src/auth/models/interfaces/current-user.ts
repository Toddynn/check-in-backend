import { UserFromJwt } from './user-from-jwt';

export interface CurrentUser {
	user: UserFromJwt;
	token: string;
}
