import { getMaxInput, getMinInput } from '../../../src/utils/constants'
import { expect, request } from '../../utils/common'

describe('\n VALIDATOR GET /:input', () => {
	describe('400', () => {
		describe('--> InvalidInputType', () => {
			const tests = [
				{ input: '-', error: { name: 'InvalidInputType' } },
				{ input: 'a', error: { name: 'InvalidInputType' } },
				{ input: '1-1', error: { name: 'InvalidInputType' } },
				{ input: '1-a', error: { name: 'InvalidInputType' } },
				{ input: '1a', error: { name: 'InvalidInputType' } },
				{ input: '--1', error: { name: 'InvalidInputType' } },
				{ input: '1.1', error: { name: 'InvalidInputType' } },
			]

			tests.forEach(test => {
				it(`should response a BadRequest for input ${test.input} and throw a InvalidInputType`, async () => {
					const response = await request.get(`/${test.input}`)

					expect(response.status).to.equal(400)
					expect(response.body.error).to.deep.equal(test.error)
				})
			})
		})

		describe('--> InvalidInputValue', () => {
			const tests = [
				{ input: getMaxInput() + 1, error: { name: 'InvalidInputValue' } },
				{ input: getMinInput() - 1, error: { name: 'InvalidInputValue' } },
			]

			tests.forEach(test => {
				it('should response a BadRequest and throw a InvalidInputValue', async () => {
					const response = await request.get(`/${test.input}`)

					expect(response.status).to.equal(400)
					expect(response.body.error).to.deep.equal(test.error)
				})
			})
		})
	})
})
