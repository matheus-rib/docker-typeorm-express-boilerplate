import * as request from 'supertest'
import { DataSource } from 'typeorm'

import api from '../../../src/config/API'
import { Example } from '../../../src/entities/Example'
import initializeDataSource from '../../config/datasource'
import ExamplesFactory from '../../factories/example'

let example: Example

let dataSource: DataSource

beforeAll(async () => {
  dataSource = await initializeDataSource()

  example = await ExamplesFactory.create()
})

afterAll(async () => dataSource.destroy())

it('should return an example', async () => {
  const { body, status } = await request(api.server).get(
    `/examples/${example.id}`,
  )

  expect(status).toBe(200)

  expect(body.foo).toBe(example.foo)
  expect(body.bar).toBe(example.bar)
})

it('should return recordNotFound error if passing invalid ID', async () => {
  const { body, status } = await request(api.server).get(
    `/examples/${example.id + 1000}`,
  )

  expect(status).toBe(404)
  expect(body.code).toBe('recordNotFound')
  expect(body.additionalProperties).toMatchObject({
    model: 'Example',
    payload: { id: String(example.id + 1000) },
  })
})
