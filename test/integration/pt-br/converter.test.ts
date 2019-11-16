import { expect, request } from '../../utils/common'

describe('\n ROUTE GET /:input', () => {
	describe('200', () => {
		describe('--> Positive input', () => {
			const tests = [
				{ input: '0', expect: { extenso: 'zero' } },
				{ input: '1', expect: { extenso: 'um' } },
				{ input: '2', expect: { extenso: 'dois' } },
				{ input: '3', expect: { extenso: 'tres' } },
				{ input: '4', expect: { extenso: 'quatro' } },
				{ input: '5', expect: { extenso: 'cinco' } },
				{ input: '6', expect: { extenso: 'seis' } },
				{ input: '7', expect: { extenso: 'sete' } },
				{ input: '8', expect: { extenso: 'oito' } },
				{ input: '9', expect: { extenso: 'nove' } },
				{ input: '10', expect: { extenso: 'dez' } },
				{ input: '11', expect: { extenso: 'onze' } },
				{ input: '12', expect: { extenso: 'doze' } },
				{ input: '13', expect: { extenso: 'treze' } },
				{ input: '14', expect: { extenso: 'quatorze' } },
				{ input: '15', expect: { extenso: 'quinze' } },
				{ input: '16', expect: { extenso: 'dezesseis' } },
				{ input: '17', expect: { extenso: 'dezessete' } },
				{ input: '18', expect: { extenso: 'dezoito' } },
				{ input: '19', expect: { extenso: 'dezenove' } },
				{ input: '100', expect: { extenso: 'cem' } },
				{ input: '101', expect: { extenso: 'cento e um' } },
				{ input: '111', expect: { extenso: 'cento e onze' } },
				{ input: '121', expect: { extenso: 'cento e vinte e um' } },
				{ input: '201', expect: { extenso: 'duzentos e um' } },
				{ input: '301', expect: { extenso: 'trezentos e um' } },
				{ input: '401', expect: { extenso: 'quatrocentos e um' } },
				{ input: '501', expect: { extenso: 'quinhetos e um' } },
				{ input: '601', expect: { extenso: 'seiscentos e um' } },
				{ input: '701', expect: { extenso: 'setecentos e um' } },
				{ input: '801', expect: { extenso: 'oitocentos e um' } },
				{ input: '901', expect: { extenso: 'novecentos e um' } },
				{ input: '1000', expect: { extenso: 'mil' } },
				{ input: '1001', expect: { extenso: 'mil e um' } },
				{ input: '1011', expect: { extenso: 'mil e onze' } },
				{ input: '1100', expect: { extenso: 'mil e cem' } },
				{ input: '1101', expect: { extenso: 'mil e cento e um' } },
				{ input: '1111', expect: { extenso: 'mil e cento e onze' } },
				{ input: '1121', expect: { extenso: 'mil e cento e vinte e um' } },
				{ input: '2001', expect: { extenso: 'dois mil e um' } },
				{ input: '10000', expect: { extenso: 'dez mil' } },
				{ input: '10001', expect: { extenso: 'dez mil e um' } },
				{ input: '10011', expect: { extenso: 'dez mil e onze' } },
				{ input: '10021', expect: { extenso: 'dez mil e vinte e um' } },
				{ input: '10100', expect: { extenso: 'dez mil e cem' } },
				{ input: '10101', expect: { extenso: 'dez mil e cento e um' } },
				{ input: '10111', expect: { extenso: 'dez mil e cento e onze' } },
				{ input: '10121', expect: { extenso: 'dez mil e cento e vinte e um' } },
				{ input: '21101', expect: { extenso: 'vinte e um mil e cento e um' } },
				{ input: '21121', expect: { extenso: 'vinte e um mil e cento e vinte e um' } },
				{ input: '99999', expect: { extenso: 'noventa e nove mil e novecentos e noventa e nove' } },
				{ input: '00001', expect: { extenso: 'um' } },
				{ input: '1/1', expect: { extenso: 'um' } },
				{ input: '1/a', expect: { extenso: 'um' } },
			]

			tests.forEach(test => {
				it('should convert a positive number in words', async () => {
					const response = await request.get(`/${test.input}`)

					expect(response.status).to.equal(200)
					expect(response.body).to.deep.equal(test.expect)
				})
			})
		})

		describe('--> Negative input', () => {
			const tests = [
				{ input: '-0', expect: { extenso: 'zero' } },
				{ input: '-1', expect: { extenso: 'menos um' } },
			]

			tests.forEach(test => {
				it('should convert a negative number in words', async () => {
					const response = await request.get(`/${test.input}`)

					expect(response.status).to.equal(200)
					expect(response.body).to.deep.equal(test.expect)
				})
			})
		})
	})
})
