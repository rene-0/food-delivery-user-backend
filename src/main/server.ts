import http from 'http'
import { SequelizeHelper } from '../infra/db/postgress/helpers/sequelize-helper'

const port = process.env.SERVER_PORT
SequelizeHelper.connect()
  .then(async () => {
    const app = (await import('./config/app')).default
    const httpServer = http.createServer(app)
    httpServer.listen(port)
    console.log(`Server running at http://localhost:${port}`)
  })
  .catch(console.error)
