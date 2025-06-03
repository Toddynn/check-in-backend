export function sanitizeToLatin1(input: string): string {
	return input
		.normalize('NFD') // Decompõe caracteres com acentos (por exemplo, é → e + ´)
		.replace(/[\u0300-\u036f]/g, '') // Remove marcas de diacríticos (acentos)
		.replace(/[^a-zA-Z0-9._-]/g, '_'); // Substitui caracteres não permitidos por _
}
