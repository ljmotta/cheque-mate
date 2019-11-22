import { expect, request } from '../utils/common'

describe('INTEGRATION TESTS', () => {
	require('./pt-br/converter.test')
	require('./validator/validator.test')

	describe('\n ROUTES THAT DONT EXIST', () => {
		const tests = [
			{ input: '1/1', error: 'NotFound' },
			{ input: '1/a', error: 'NotFound' },
			{ input: '1/1/1', error: 'NotFound' },
		]

		tests.forEach(test => {
			it(`should response with 404 (NotFound) error`, async () => {
				const response = await request.get(`/${test.input}`)

				expect(response.status).to.equal(404)
				expect(response.body.error).to.deep.equal(test.error)
			})
		})
	})
})
