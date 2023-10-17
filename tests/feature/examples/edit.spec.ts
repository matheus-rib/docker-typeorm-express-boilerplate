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

  example = await ExamplesFactory.create({ foo: 'foo', bar: 14 })
})

afterAll(async () => dataSource.destroy())

it('should update the passed fields and return a example', async () => {
  const params = {
    foo: 'baz',
    bar: 15,
  }

  const { body, status } = await request(api.server)
    .put(`/examples/${example.id}`)
    .send(params)

  expect(status).toBe(200)

  expect(body.foo).toBe(params.foo)
  expect(body.bar).toBe(params.bar)

  const storedExample = (await Example.findOne({
    where: { id: example.id },
  })) as Example
  expect(body.foo).toBe(storedExample.foo)
  expect(body.bar).toBe(storedExample.bar)
})

it('should return recordNotFound error if passing invalid ID', async () => {
  const { body, status } = await request(api.server).put(
    `/examples/${example.id + 1000}`,
  )

  expect(status).toBe(404)
  expect(body.code).toBe('recordNotFound')
  expect(body.additionalProperties).toMatchObject({
    model: 'Example',
    payload: { id: String(example.id + 1000) },
  })
})
