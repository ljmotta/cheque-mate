import { getAuxiliaryWord, getTensOrHundreds, negative, positive } from '../../../src/locale/pt-br/converter'
import { hundreds, HUNDREDS, tens, TENS } from '../../../src/locale/pt-br/dictionary'
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

	describe('getTensOrHundreds', () => {
		describe('--> Tens', () => {
			const shouldTests = [
				{
					args: { digits: ['1', '0'], digitPosition: 2, currentDictionary: tens, words: [], type: TENS },
					expect: { response: [true, 1], words: ['dez'] },
				},
				{
					args: { digits: ['1', '1'], digitPosition: 2, currentDictionary: tens, words: [], type: TENS },
					expect: { response: [true, 1], words: ['onze'] },
				},
				{
					args: { digits: ['1', '2', '0'], digitPosition: 2, currentDictionary: tens, words: [], type: TENS },
					expect: { response: [true, 1], words: ['vinte'] },
				},
			]

			shouldTests.forEach(test => {
				it(`should get ten word for ${test.args.digits.join('')}`, () => {
					const data = getTensOrHundreds(
						test.args.digits,
						test.args.currentDictionary,
						test.args.digitPosition,
						test.args.words,
						test.args.type)

					expect(data).to.deep.equal(test.expect.response)
					expect(test.args.words).to.deep.equal(test.expect.words)
				})
			})

			const shouldntTests = [
				{
					args: { digits: ['2', '1'], digitPosition: 2, currentDictionary: tens, words: [], type: TENS },
					expect: { response: [false, 2], words: [] },
				},
				{
					args: { digits: ['9', '9'], digitPosition: 2, currentDictionary: tens, words: [], type: TENS },
					expect: { response: [false, 2], words: [] },
				},
				{
					args: { digits: ['2', '3', '0'], digitPosition: 3, currentDictionary: tens, words: [], type: TENS },
					expect: { response: [false, 3], words: [] },
				},
			]

			shouldntTests.forEach(test => {
				it(`shouldn't get ten word for ${test.args.digits.join('')} and position ${test.args.digitPosition}`, () => {
					const data = getTensOrHundreds(
						test.args.digits,
						test.args.currentDictionary,
						test.args.digitPosition,
						test.args.words,
						test.args.type)

					expect(data).to.deep.equal(test.expect.response)
					expect(test.args.words).to.deep.equal(test.expect.words)
				})
			})
		})

		describe('--> Hundread', () => {
			const shouldTests = [
				{
					args: { digits: ['1', '0', '0'], digitPosition: 3, currentDictionary: hundreds, words: [], type: HUNDREDS },
					expect: { response: [true, 1], words: ['cem'] },
				},
				{
					args: { digits: ['2', '0', '0'], digitPosition: 3, currentDictionary: hundreds, words: [], type: HUNDREDS },
					expect: { response: [true, 1], words: ['duzentos'] },
				},
				{
					args: { digits: ['2', '1', '0', '0'], digitPosition: 3, currentDictionary: hundreds, words: [], type: HUNDREDS },
					expect: { response: [true, 1], words: ['cem'] },
				},
			]

			shouldTests.forEach(test => {
				it(`should get hundread word for ${test.args.digits.join('')}`, () => {
					const data = getTensOrHundreds(
						test.args.digits,
						test.args.currentDictionary,
						test.args.digitPosition,
						test.args.words,
						test.args.type)

					expect(data).to.deep.equal(test.expect.response)
					expect(test.args.words).to.deep.equal(test.expect.words)
				})
			})

			const shouldntTests = [
				{
					args: { digits: ['2', '1', '0'], digitPosition: 3, currentDictionary: hundreds, words: [], type: HUNDREDS },
					expect: { response: [false, 3], words: [] },
				},
				{
					args: { digits: ['9', '9', '9'], digitPosition: 3, currentDictionary: hundreds, words: [], type: HUNDREDS },
					expect: { response: [false, 3], words: [] },
				},
				{
					args: { digits: ['3', '0'], digitPosition: 2, currentDictionary: hundreds, words: [], type: HUNDREDS },
					expect: { response: [false, 2], words: [] },
				},
				{
					args: { digits: ['3', '1', '0', '0'], digitPosition: 4, currentDictionary: hundreds, words: [], type: HUNDREDS },
					expect: { response: [false, 4], words: [] },
				},
			]

			shouldntTests.forEach(test => {
				it(`shouldn't get hundread word for ${test.args.digits.join('')} and position ${test.args.digitPosition}`, () => {
					const data = getTensOrHundreds(
						test.args.digits,
						test.args.currentDictionary,
						test.args.digitPosition,
						test.args.words,
						test.args.type)

					expect(data).to.deep.equal(test.expect.response)
					expect(test.args.words).to.deep.equal(test.expect.words)
				})
			})
		})
	})

	describe('negative', () => {
		const shouldTests = [
			{ input: '-1', expect: 'menos um' },
			{ input: '-100', expect: 'menos cem' },
			{ input: '-99999', expect: 'menos noventa e nove mil e novecentos e noventa e nove' },
		]

		shouldTests.forEach(test => {
			it(`should get negative word for input ${test.input}`, () => {
				const data = negative(test.input)

				expect(data).to.deep.equal(test.expect)
			})
		})
	})

	describe('positive', () => {
		const shouldTests = [
			{ input: '1', expect: 'um' },
			{ input: '100', expect: 'cem' },
			{ input: '99999', expect: 'noventa e nove mil e novecentos e noventa e nove' },
			{ input: '999999', expect: 'novecentos e noventa e nove mil e novecentos e noventa e nove' },
		]

		shouldTests.forEach(test => {
			it(`should get positive word for input ${test.input}`, () => {
				const data = positive(test.input)

				expect(data).to.deep.equal(test.expect)
			})
		})

		it(`shouldn't get positive word for input bigger than (default: 999999)`, () => {
			expect(() => positive('9999999')).to.throw('Missing auxiliary word for input. Auxiliary words: mil')
		})
	})
})
