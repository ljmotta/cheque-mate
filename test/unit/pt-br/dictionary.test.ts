import { getDictionary, hundreds, tens, units } from '../../../src/locale/pt-br/dictionary'
import { expect } from '../../utils/common'

describe('NUMBERS - pt-br', () => {
	describe('getDictionary', () => {
		const tests = [
			{ inputSize: 0, expect: new Map() },
			{ inputSize: 1, expect: new Map().set(1, units) },
			{ inputSize: 2, expect: new Map().set(1, units).set(2, tens) },
			{ inputSize: 3, expect: new Map().set(1, units).set(2, tens).set(3, hundreds) },
			{ inputSize: 4, expect: new Map().set(1, units).set(2, tens).set(3, hundreds).set(4, units) },
		]

		tests.forEach(test => {
			it(`should generate a dictionary for input size (${test.inputSize})`, () => {
				const dictionary = getDictionary(test.inputSize)
				expect(dictionary).to.deep.equal(test.expect)
			})
		})
	})
})
