export function normalizePhoneNumber(input: string): string {
	if (!input) return '';

	const raw = input.replace(/\D/g, '');

	// Caso já esteja no formato completo com DDI
	if (raw.length === 13 && raw.startsWith('55')) {
		return raw;
	}

	// Se tem 11 dígitos (nacional), adiciona o 55
	if (raw.length === 11) {
		return `55${raw}`;
	}

	// Se não for nenhum dos formatos válidos, retorna como está
	return raw;
}
