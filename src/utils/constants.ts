export function getLanguage() {
	return process.env.LOCALE || 'pt-br'
}

export function getMaxInput() {
	return parseInt(process.env.MAX_INPUT || '99999', 10)
}

export function getMinInput() {
	return parseInt(process.env.MIN_INPUT || '-99999', 10)
}
