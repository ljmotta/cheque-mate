import * as dotenv from 'dotenv'

dotenv.config({ path: `${__dirname}/../../../.env.test` })

describe('UNIT TESTS', () => {
	require('./pt-br/converter.test')
	require('./pt-br/dictionary.test')
})
