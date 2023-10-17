import { Container } from 'typedi'
import { DataSource } from 'typeorm'

import Api from '../../src/config/API'

export default async function initializeDataSource(): Promise<DataSource> {
  const dataSource = Api.databaseConnection

  await dataSource
    .initialize()
    .then(() => Container.set(DataSource, dataSource))

  return dataSource
}
