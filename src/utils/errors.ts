import { getMaxInput, getMinInput } from './constants'

export function invalidQuery(queries: string[], supportedQueries?: string[]) {
	const error = new Error(`This route does not support this query. Your query: ${queries}. Supported: ${supportedQueries}`)
	error.name = 'InvalidQuery'
	return error
}

export function invalidInputType(input: any) {
	const error = new Error(`The input should be a number. Your input: ${input}`)
	error.name = 'InvalidInputType'
	return error
}

export function invalidInputValue(input: number) {
	const error = new Error(`Input out of bounds. Should be between [${getMinInput()},${getMaxInput()}]. Your input: ${input}`)
	error.name = 'InvalidInputValue'
	return error
}

export function invalidLocale() {
	const error = new Error(`Invalid locale. '${process.env.LOCALE}' is not supported. Choose one listed on README.md`)
	error.name = 'InvalidLocale'
	return error
}

export function missingAuxiliary(auxilaryWords: string[]) {
	const error = new Error(`Missing auxiliary word for input. Auxiliary words: ${auxilaryWords}`)
	error.name = 'MissingAuxiliaryWord'
	return error
}

export function missingDictionaryForDigit() {
	const error = new Error(`Something wrong on 'getDictionary'. Missing dictionary for digit.`)
	error.name = 'MissingDictionaryForDigit'
	return error
}
