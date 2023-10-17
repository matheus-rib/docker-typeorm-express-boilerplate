import * as request from 'supertest'
import { DataSource } from 'typeorm'

import api from '../../../src/config/API'
import { Example } from '../../../src/entities/Example'
import initializeDataSource from '../../config/datasource'

let dataSource: DataSource

beforeAll(async () => {
  dataSource = await initializeDataSource()
})

afterAll(async () => dataSource.destroy())

it('should return a new created example', async () => {
  const params = {
    foo: 'foo',
    bar: 14,
  }

  const { body, status } = await request(api.server)
    .post('/examples')
    .send(params)

  expect(status).toBe(201)
  expect(body.foo).toBe(params.foo)
  expect(body.bar).toBe(params.bar)

  const storedExample = (await Example.findOne({
    where: { id: body.id },
  })) as Example

  expect(storedExample).toBeTruthy()
  expect(storedExample.foo).toBe(params.foo)
  expect(storedExample.bar).toBe(params.bar)
})

it('should return fooRequired error if not sending foo attribute', async () => {
  const params = {
    bar: 14,
  }

  const { body, status } = await request(api.server)
    .post('/examples')
    .send(params)

  expect(status).toBe(400)
  expect(body.code).toBe('fooRequired')
})

it('should return barRequired error if not sending foo attribute', async () => {
  const params = {
    foo: 'foo',
  }

  const { body, status } = await request(api.server)
    .post('/examples')
    .send(params)

  expect(status).toBe(400)
  expect(body.code).toBe('barRequired')
})
