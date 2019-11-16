import { missingAuxiliary, missingDictionaryForAlgarism } from '../utils/errors'
import { auxiliary, getDictionary, minus } from './numbers.pt-br'

const TENS = 'tens'
const HUNDREADS = 'hundreds'
const ONE_THOUSAND = 'um mil'
const THOUSAND = 'mil'
type AlgorismType = 'units' | 'tens' | 'hundreds'

function getAuxiliarWord(
	algorismPosition: number,
	word: string,
): string {
	if (algorismPosition > 3) {
		const auxiliarWord = auxiliary.get(Math.ceil(algorismPosition/3))
		if (!auxiliarWord) throw missingAuxiliary(Array.from(auxiliary.values()))
		return `${word} ${auxiliarWord}`
	}
	return word
}

function getTensOrHundreds(
	algarisms: string[],
	currentDictionary: Map<string, string>,
	algorismPosition: number,
	words: string[],
	type: AlgorismType,
): [boolean, number] {
	const numberSize = (type === TENS) ? 2 : 3
	const numbersToJump = (type === TENS) ? 1 : 2

	const currentArrayPosition = algarisms.length - algorismPosition
	const numb = algarisms.slice(currentArrayPosition, currentArrayPosition + numberSize).join('')
	const word = currentDictionary.get(numb)

	if (word) {
		words.push(getAuxiliarWord(algorismPosition, word))
		return [true, algorismPosition - numbersToJump]
	}
	return [false, algorismPosition]
}

export function positive(input: string) {
	const algarisms = Array.from(input)
	const dictionary = getDictionary(algarisms.length)

	const words: string[] = []
	for (let algorismPosition = algarisms.length; algorismPosition > 0; algorismPosition--) {
		let cont = false
		const currentArrayPosition = algarisms.length - algorismPosition
		if (algarisms[currentArrayPosition] === '0' && algarisms.length > 1) continue

		const currentDictionary = dictionary.get(algorismPosition)
		if (!currentDictionary) throw missingDictionaryForAlgarism()

		// get tens: 10...19 or 20, 30, 40, ..., 90
		if (algarisms.length > 1 && ((algorismPosition - 2) % 3) === 0) {
			([cont, algorismPosition] = getTensOrHundreds(algarisms, currentDictionary, algorismPosition, words, TENS))
			if (cont) continue
		}

		// get hundreads: 100, 200, 300, ..., 900
		if (algorismPosition !== 0 && algorismPosition % 3 === 0) {
			([cont, algorismPosition] = getTensOrHundreds(algarisms, currentDictionary, algorismPosition, words, HUNDREADS))
			if (cont) continue
		}

		let word = currentDictionary.get(algarisms[currentArrayPosition])
		if (!word) break

		// get auxilar word for units: 1xxx, 2xxx, 3xxx, 9xxx
		if (algarisms.length > 3 && (algorismPosition - 1) % 3 === 0) {
			word = getAuxiliarWord(algorismPosition, word)
		}

		// handle language particularity: 'um mil' should be 'mil' if number has 4 digits
		if (word === ONE_THOUSAND && algarisms.length === 4) word = THOUSAND
		words.push(word)
	}
	return words.filter(word => word).join(' e ')
}

export function negative(input: string) {
	const positiveInput = input.slice(1, input.length)
	return `${minus} ${positive(positiveInput)}`
}
