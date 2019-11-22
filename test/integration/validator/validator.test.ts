import { getMaxInput, getMinInput } from '../../../src/utils/constants'
import { expect, request } from '../../utils/common'

describe('\n VALIDATOR GET /:input', () => {
	describe('400', () => {
		describe('--> InvalidInputType', () => {
			const tests = [
				{ input: '-', error: 'InvalidInputType' },
				{ input: 'a', error: 'InvalidInputType' },
				{ input: '1-1', error: 'InvalidInputType' },
				{ input: '1-a', error: 'InvalidInputType' },
				{ input: '1a', error: 'InvalidInputType' },
				{ input: '--1', error: 'InvalidInputType' },
				{ input: '1.1', error: 'InvalidInputType' },
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
				{ input: getMaxInput() + 1, error: 'InvalidInputValue' },
				{ input: getMinInput() - 1, error: 'InvalidInputValue' },
			]

			tests.forEach(test => {
				it('should response a BadRequest and throw a InvalidInputValue', async () => {
					const response = await request.get(`/${test.input}`)

					expect(response.status).to.equal(400)
					expect(response.body.error).to.deep.equal(test.error)
				})
			})
		})

		describe('--> InvalidQuery', () => {
			const tests = [
				{ input: '1?a=1', error: 'InvalidQuery' },
				{ input: '1?1=1', error: 'InvalidQuery' },
			]

			tests.forEach(test => {
				it('should response a BadRequest and throw a InvalidQuery', async () => {
					const response = await request.get(`/${test.input}`)

					expect(response.status).to.equal(400)
					expect(response.body.error).to.deep.equal(test.error)
				})
			})
		})
	})
})
