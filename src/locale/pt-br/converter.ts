import { missingAuxiliary, missingDictionaryForDigit } from '../../utils/errors'
import { auxiliary, getDictionary, minus } from './numbers'

type Tens = 'tens'
type Hundread = 'hundreds'
type AlgorismType = Tens | Hundread

export const TENS: Tens = 'tens'
export const HUNDREADS: Hundread = 'hundreds'
const ONE_THOUSAND = 'um mil'
const THOUSAND = 'mil'

/**
 * Check necessity of a auxiliary word before actual word.
 * @param digitPosition Digit position into array
 * @param word Representative word for respective digit
 * @return Word with or without auxiliary word
 */
export function getAuxiliaryWord(
	digitPosition: number,
	word: string,
): string {
	if (digitPosition > 3) {
		const auxiliarWord = auxiliary.get(Math.ceil(digitPosition/3))
		if (!auxiliarWord) throw missingAuxiliary(Array.from(auxiliary.values()))
		return `${word} ${auxiliarWord}`
	}
	return word
}

/**
 * Verify the possibility of the the current digit be a specific number
 * of the tens or hundreads dictionary.
 * tens: 10, 11, 12, ..., 19 or 20, 30, 40, ..., 90
 * hundreads: 100, 200, 300, ..., 900
 *
 * @param digits Input number separated into digits
 * @param currentDictionary Dictionary for respective digit
 * @param digitPosition digit position into array
 * @param words Array of already converted numbers
 * @param type TENS or HUNDREADS
 * @return Possibilities:
 *  - true and new digit position
 *  - false and current digit position
 */
export function getTensOrHundreds(
	digits: string[],
	currentDictionary: Map<string, string>,
	digitPosition: number,
	words: string[],
	type: AlgorismType,
): [boolean, number] {
	const numberSize = (type === TENS) ? 2 : 3
	const numbersToJump = (type === TENS) ? 1 : 2

	const currentArrayPosition = digits.length - digitPosition
	const numb = digits.slice(currentArrayPosition, currentArrayPosition + numberSize).join('')
	const word = currentDictionary.get(numb)

	if (word) {
		words.push(getAuxiliaryWord(digitPosition, word))
		return [true, digitPosition - numbersToJump]
	}
	return [false, digitPosition]
}

/**
 * Convert positive number string into words.
 * @param input Positive input
 * @return Positive input in words
 */
export function positive(input: string) {
	const digits = Array.from(input)
	const dictionary = getDictionary(digits.length)

	const words: string[] = []
	for (let digitPosition = digits.length; digitPosition > 0; digitPosition--) {
		let cont = false
		const currentArrayPosition = digits.length - digitPosition
		if (digits[currentArrayPosition] === '0' && digits.length > 1) continue

		const currentDictionary = dictionary.get(digitPosition)
		if (!currentDictionary) throw missingDictionaryForDigit()

		// get tens: 10...19 or 20, 30, 40, ..., 90
		if (digits.length > 1 && ((digitPosition - 2) % 3) === 0) {
			([cont, digitPosition] = getTensOrHundreds(digits, currentDictionary, digitPosition, words, TENS))
			if (cont) continue
		}

		// get hundreads: 100, 200, 300, ..., 900
		if (digitPosition !== 0 && digitPosition % 3 === 0) {
			([cont, digitPosition] = getTensOrHundreds(digits, currentDictionary, digitPosition, words, HUNDREADS))
			if (cont) continue
		}

		let word = currentDictionary.get(digits[currentArrayPosition])
		if (!word) break

		// get auxilar word for units: 1xxx, 2xxx, 3xxx, 9xxx
		if (digits.length > 3 && (digitPosition - 1) % 3 === 0) {
			word = getAuxiliaryWord(digitPosition, word)
		}

		// handle language particularity: 'um mil' should be 'mil' if number has 4 digits
		if (word === ONE_THOUSAND && digits.length === 4) word = THOUSAND
		words.push(word)
	}
	return words.filter(word => word).join(' e ')
}

/**
 * Convert negative number string into words.
 * @param input Negative input
 * @return Negative input in words
 */
export function negative(input: string) {
	const positiveInput = Math.abs(parseInt(input, 10)).toString()
	return `${minus} ${positive(positiveInput)}`
}
