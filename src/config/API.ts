import * as cors from 'cors'
import * as express from 'express'
import * as http from 'http'
import * as responseTime from 'response-time'
import { DataSource } from 'typeorm'

import errorHandler from '../middlewares/errorHandler'
import notFound from '../middlewares/notFound'
import routes from '../routes'
import ormConfig from './ormConfig'

class API {
  public app: express.Application
  public server: http.Server
  public databaseConnection: DataSource

  public constructor() {
    this.app = express()
    this.server = http.createServer(this.app)
    this.databaseConnection = ormConfig
    this.app.use(express.json({ limit: '50mb' }))
    this.app.use(express.urlencoded({ extended: true }))

    this.app.use(cors())
    this.app.use(responseTime())

    this.app.use(routes)

    this.app.use(notFound)
    this.app.use(errorHandler)
  }
}

export default new API()
