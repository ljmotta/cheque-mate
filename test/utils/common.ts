import chai from 'chai'
import supertest from 'supertest'
import { setupServer } from '../../src/setup/listener'

export const expect = chai.expect
export const request = supertest(setupServer())
