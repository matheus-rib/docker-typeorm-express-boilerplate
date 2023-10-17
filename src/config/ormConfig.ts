import { DataSource } from 'typeorm'

const envs = {
  development: {
    synchronize: false,
    logging: true,
    entities: ['./src/entities/**/*.ts'],
    migrations: ['./src/migrations/*.ts'],
  },
  production: {
    synchronize: false,
    logging: false,
    entities: ['./build/entities/**/*.js'],
    migrations: ['./build/migrations/*.js'],
  },
  test: {
    synchronize: true,
    logging: false,
    dropSchema: true,
    entities: ['./src/entities/**/*.ts'],
  },
}

const baseConfig = {
  type: process.env.DB_TYPE,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
}

const dataSource = {
  ...baseConfig,
  ...envs[process.env.NODE_ENV],
}

export default new DataSource(dataSource)
