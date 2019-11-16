import * as dotenv from 'dotenv'

dotenv.config({ path: `${__dirname}/../../.env.test` })

describe('CONVERTER TESTS', () => {
	require('./integration')
	require('./unit')
})
