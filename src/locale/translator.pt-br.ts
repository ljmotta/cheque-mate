import { dictionary, minus } from './numbers.pt-br'

function getTensOrHundreds(
	algarisms: string[],
	currentDictionary: Map<string, string>,
	algorismPosition: number,
	words: string[],
	tens: boolean,
): [boolean, number] {
	const size = (tens) ? 2 : 3
	const jump = (tens) ? 1 : 2

	const currentArrayPosition = algarisms.length - algorismPosition
	const hundred = algarisms.slice(currentArrayPosition, currentArrayPosition + size).join('')
	const word = currentDictionary.get(hundred)

	if (word) {
		words.push(word)
		return [true, algorismPosition - jump]
	}
	return [false, algorismPosition]
}

export function positive(input: string) {
	const algarisms = Array.from(input)
	const words: string[] = []
	for (let algorismPosition = algarisms.length; algorismPosition > 0; algorismPosition--) {
		let cont = false
		const currentArrayPosition = algarisms.length - algorismPosition
		if (algarisms[currentArrayPosition] === '0' && algarisms.length > 1) continue

		const currentDictionary = dictionary.get(algorismPosition)
		if (!currentDictionary) break

		if (algarisms.length > 1 && ((algorismPosition - 2) % 3) === 0) {
			([cont, algorismPosition] = getTensOrHundreds(algarisms, currentDictionary, algorismPosition, words, true))
			if (cont) continue
		}

		if (algorismPosition !== 0 && algorismPosition % 3 === 0) {
			([cont, algorismPosition] = getTensOrHundreds(algarisms, currentDictionary, algorismPosition, words, false))
			if (cont) continue
		}

		const word = currentDictionary.get(algarisms[currentArrayPosition])
		if (word) words.push(word)
	}
	return words.filter(word => word).join(' e ')
}

export function negative(input: string) {
	const positiveInput = input.slice(1, input.length)
	return `${minus} ${positive(positiveInput)}`
}
