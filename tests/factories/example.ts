import { faker } from '@faker-js/faker'

import { Example } from '../../src/entities/Example'

type ExampleParams = {
  foo?: string
  bar?: number
}

async function create(params?: ExampleParams): Promise<Example> {
  const example = Example.create({
    foo: faker.lorem.words(),
    bar: faker.number.int({ max: 100 }),
    ...params,
  })

  return example.save()
}

export default { create }
