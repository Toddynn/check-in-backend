const ADMIN_ROLE = process.env.ADMIN_ROLE;
const ONLY_VIEW_ROLE = process.env.ONLY_VIEW_ROLE;
const MASTER_ROLE = process.env.MASTER_ROLE;

export const roles = {
	admin: Number(ADMIN_ROLE),
	only_view: Number(ONLY_VIEW_ROLE),
	master: Number(MASTER_ROLE),
};
