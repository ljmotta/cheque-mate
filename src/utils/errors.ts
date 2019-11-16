import { getMaxInput, getMinInput } from './constants'

export function invalidInputType(input: any) {
	const error = new Error(`The input should be a number. Your input: ${input}`)
	error.name = 'InvalidInputType'
	return error
}

export function invalidInputValue(input: number) {
	const error = new Error(`Input out of bounds. Should be between [-${getMinInput()},${getMaxInput()}]. Your input: ${input}`)
	error.name = 'InvalidInputValue'
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
