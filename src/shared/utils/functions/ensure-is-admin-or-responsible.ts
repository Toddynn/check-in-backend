import { NotAcceptableException } from '@nestjs/common';
import { CurrentUser } from 'src/auth/models/interfaces/current-user';
import { Event } from 'src/pass-in/events/models/entities/events.entity';
import { roles } from '../constants/roles';

export async function ensureIsCreatorOrResponsibleOfEvent({
	current_user,
	event,
	throw_message,
}: {
	event: Pick<Event, 'created_by_login_id' | 'responsible_login_ids'>;
	current_user: CurrentUser;
	throw_message: string;
}) {
	const is_responsible = event.responsible_login_ids?.some((id) => String(id) === String(current_user.user.loginId));

	const is_creator = String(event.created_by_login_id) === String(current_user.user.loginId);

	const is_master = current_user.user.roles.includes(roles.master);

	const is_only_view = current_user.user.roles.includes(roles.only_view);

	if ((!is_responsible && !is_creator && !is_master) || is_only_view)
		throw new NotAcceptableException({
			message: throw_message,
		});
}
