import chai from 'chai'
import * as dotenv from 'dotenv'
import supertest from 'supertest'
import { setupServer } from '../../src/setup/listener'

dotenv.config()

export const expect = chai.expect
export const request = supertest(setupServer())
