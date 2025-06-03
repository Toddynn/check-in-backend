export interface UserFromJwt {
	documento: string;
	dados?: {
		nome: string;
		email: string;
		usuario: string;
		setor: string;
		cargo: string;
		unidade: string;
		empresa: string;
		matricula: string;
	};
	nome: string;
	time: unknown;
	sistema: number;
	roles: number[];
	loginId: number;
	iat: number;
	exp: number;
}
