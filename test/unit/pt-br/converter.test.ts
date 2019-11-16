import { getAuxiliaryWord } from '../../../src/locale/pt-br/converter'
import { expect } from '../../utils/common'

describe('CONVERTER - pt-br', () => {
	describe('getAuxiliaryWord', () => {
		const shouldTests = [
			{ args: { digitPosition: 4, word: '' }, expect: ' mil' },
			{ args: { digitPosition: 4, word: 'um' }, expect: 'um mil' },
			{ args: { digitPosition: 5, word: 'dois' }, expect: 'dois mil' },
		]

		shouldTests.forEach(test => {
			it('should get auxiliary word', () => {
				const data = getAuxiliaryWord(test.args.digitPosition, test.args.word)

				expect(data).to.deep.equal(test.expect)
			})
		})

		const shouldntTests = [
			{ args: { digitPosition: 1, word: '' }, expect: '' },
			{ args: { digitPosition: 2, word: '' }, expect: '' },
			{ args: { digitPosition: 3, word: '' }, expect: '' },
		]

		shouldntTests.forEach(test => {
			it('shouldn\'t get auxiliary word', () => {
				const data = getAuxiliaryWord(test.args.digitPosition, test.args.word)

				expect(data).to.deep.equal(test.expect)
			})
		})

		it('shouldn\'t get auxiliary word due to missing \'milhao\'', () => {
			expect(() => getAuxiliaryWord(7, '')).to.throw('Missing auxiliary word for input. Auxiliary words: mil')
		})
	})
})
