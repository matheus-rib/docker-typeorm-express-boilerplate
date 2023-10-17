import * as request from 'supertest'
import { DataSource } from 'typeorm'

import api from '../../../src/config/API'
import { Example } from '../../../src/entities/Example'
import initializeDataSource from '../../config/datasource'
import ExamplesFactory from '../../factories/example'

let example1: Example
let example2: Example
let example3: Example

let dataSource: DataSource

beforeAll(async () => {
  dataSource = await initializeDataSource()

  example1 = await ExamplesFactory.create({ bar: 14 })
  example2 = await ExamplesFactory.create({ foo: 'foo' })
  example3 = await ExamplesFactory.create({ foo: 'foo', bar: 28 })
})

afterAll(async () => dataSource.destroy())

it('should return a paginated examples list with 3 rows and 1 page', async () => {
  const { body, status } = await request(api.server).get('/examples')
  expect(status).toBe(200)

  expect(body).toHaveProperty('page')
  expect(body.page).toBe(1)

  expect(body).toHaveProperty('pages')
  expect(body.pages).toBe(1)

  expect(body).toHaveProperty('count')
  expect(body.count).toBe(3)

  expect(body).toHaveProperty('rows')
  expect(body.rows).toEqual(
    expect.arrayContaining([
      expect.objectContaining({ foo: example1.foo, bar: example1.bar }),
      expect.objectContaining({ foo: example2.foo, bar: example2.bar }),
      expect.objectContaining({ foo: example3.foo, bar: example3.bar }),
    ]),
  )
})

it('should return a paginated examples list filtered by bar with 2 rows and 1 page', async () => {
  const { body, status } = await request(api.server)
    .get('/examples')
    .query({ q: { foo: 'foo' } })

  expect(status).toBe(200)

  expect(body).toHaveProperty('page')
  expect(body.page).toBe(1)

  expect(body).toHaveProperty('pages')
  expect(body.pages).toBe(1)

  expect(body).toHaveProperty('count')
  expect(body.count).toBe(2)

  expect(body).toHaveProperty('rows')
  expect(body.rows).toEqual(
    expect.arrayContaining([
      expect.objectContaining({ foo: example2.foo, bar: example2.bar }),
      expect.objectContaining({ foo: example3.foo, bar: example3.bar }),
    ]),
  )
})

it('should return a paginated examples list filtered by foo with 1 rows and 1 page', async () => {
  const { body, status } = await request(api.server)
    .get('/examples')
    .query({ q: { foo: example1.foo } })

  expect(status).toBe(200)

  expect(body).toHaveProperty('page')
  expect(body.page).toBe(1)

  expect(body).toHaveProperty('pages')
  expect(body.pages).toBe(1)

  expect(body).toHaveProperty('count')
  expect(body.count).toBe(1)

  expect(body).toHaveProperty('rows')
  expect(body.rows).toEqual(
    expect.arrayContaining([
      expect.objectContaining({ foo: example1.foo, bar: example1.bar }),
    ]),
  )
})

it('should return a paginated examples list filtered by id with 1 rows and 1 page', async () => {
  const { body, status } = await request(api.server)
    .get('/examples')
    .query({ q: { id: example1.id } })

  expect(status).toBe(200)

  expect(body).toHaveProperty('page')
  expect(body.page).toBe(1)

  expect(body).toHaveProperty('pages')
  expect(body.pages).toBe(1)

  expect(body).toHaveProperty('count')
  expect(body.count).toBe(1)

  expect(body).toHaveProperty('rows')
  expect(body.rows).toEqual(
    expect.arrayContaining([
      expect.objectContaining({ foo: example1.foo, bar: example1.bar }),
    ]),
  )
})

it('should return a paginated examples list with 1 rows, 3 pages and on page 1', async () => {
  const { body, status } = await request(api.server)
    .get('/examples')
    .query({ page: 1, take: 1 })

  expect(status).toBe(200)

  expect(body).toHaveProperty('page')
  expect(body.page).toBe(1)

  expect(body).toHaveProperty('pages')
  expect(body.pages).toBe(3)

  expect(body).toHaveProperty('count')
  expect(body.count).toBe(3)

  expect(body).toHaveProperty('rows')
  expect(body.rows).toEqual(
    expect.arrayContaining([
      expect.objectContaining({ foo: example1.foo, bar: example1.bar }),
    ]),
  )
})

it('should return a paginated examples list with 1 rows, 3 pages and on page 2', async () => {
  const { body, status } = await request(api.server)
    .get('/examples')
    .query({ page: 2, take: 1 })

  expect(status).toBe(200)

  expect(body).toHaveProperty('page')
  expect(body.page).toBe(2)

  expect(body).toHaveProperty('pages')
  expect(body.pages).toBe(3)

  expect(body).toHaveProperty('count')
  expect(body.count).toBe(3)

  expect(body).toHaveProperty('rows')
  expect(body.rows).toEqual(
    expect.arrayContaining([
      expect.objectContaining({ foo: example2.foo, bar: example2.bar }),
    ]),
  )
})
