
export function invalidInputType(input: any) {
	const error = new Error(`The input should be a number. Your input: ${input}`)
	error.name = 'InvalidInputType'
	return error
}

export function invalidInputValue(input: number) {
	const error = new Error(`The input should be between [-99999,99999]. Your input: ${input}`)
	error.name = 'InvalidInputValue'
	return error
}

export function missingAuxiliary(auxilaryWords: string[]) {
	const error = new Error(`Missing auxiliary word for input. Auxiliary words: ${auxilaryWords}`)
	error.name = 'MissingAuxiliaryWord'
	return error
}

export function missingDictionaryForDigit() {
	const error = new Error(`Something wrong. Missing dictionary for digit.`)
	error.name = 'MissingDictionaryForDigit'
	return error
}
