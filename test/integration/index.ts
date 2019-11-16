import * as dotenv from 'dotenv'

dotenv.config({ path: `${__dirname}/../../../.env.test` })

describe('INTEGRATION TESTS', () => {
	require('./pt-br/converter.test')
	require('./validator/validator.test')
})
