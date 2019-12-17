export const minus = 'menos'

type Tens = 'tens'
type Hundred = 'hundreds'
export type AlgorismType = Tens | Hundred

export const TENS: Tens = 'tens'
export const HUNDREDS: Hundred = 'hundreds'
export const ONE_THOUSAND = 'um mil'
export const THOUSAND = 'mil'

export const auxiliary = new Map<number, string>([
	[2, 'mil'],
])

export const units = new Map<string, string>([
	['0', 'zero'],
	['1', 'um'],
	['2', 'dois'],
	['3', 'tres'],
	['4', 'quatro'],
	['5', 'cinco'],
	['6', 'seis'],
	['7', 'sete'],
	['8', 'oito'],
	['9', 'nove'],
])

export const tens = new Map<string, string>([
	['2', 'vinte'],
	['3', 'trinta'],
	['4', 'quarenta'],
	['5', 'cinquenta'],
	['6', 'sessenta'],
	['7', 'setenta'],
	['8', 'oitenta'],
	['9', 'noventa'],
	['10', 'dez'],
	['11', 'onze'],
	['12', 'doze'],
	['13', 'treze'],
	['14', 'quatorze'],
	['15', 'quinze'],
	['16', 'dezesseis'],
	['17', 'dezessete'],
	['18', 'dezoito'],
	['19', 'dezenove'],
	['20', 'vinte'],
	['30', 'trinta'],
	['40', 'quarenta'],
	['50', 'cinquenta'],
	['60', 'sessenta'],
	['70', 'setenta'],
	['80', 'oitenta'],
	['90', 'noventa'],
])

export const hundreds = new Map<string, string>([
	['1', 'cento'],
	['2', 'duzentos'],
	['3', 'trezentos'],
	['4', 'quatrocentos'],
	['5', 'quinhentos'],
	['6', 'seiscentos'],
	['7', 'setecentos'],
	['8', 'oitocentos'],
	['9', 'novecentos'],
	['100', 'cem'],
	['200', 'duzentos'],
	['300', 'trezentos'],
	['400', 'quatrocentos'],
	['500', 'quinhentos'],
	['600', 'seiscentos'],
	['700', 'setecentos'],
	['800', 'oitocentos'],
	['900', 'novecentos'],
])

/**
 * Dinamic generate a dictionary from input size
 * @param inputSize
 * @return Map:
 *  - key: Position of digit on input
 *  - value: Possible words for that position
 */
export function getDictionary(inputSize: number): Map<number, Map<string, string>> {
	const dictionary = new Map<number, Map<string, string>>()
	for (let i = 1; i <= inputSize; i++) {
		if (i % 3 === 0) dictionary.set(i, hundreds)
		if (i % 3 === 1) dictionary.set(i, units)
		if (i % 3 === 2) dictionary.set(i, tens)
	}
	return dictionary
}
