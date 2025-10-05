import express from 'express'
import http from 'http'
import path from 'path'
import { SequelizeHelper } from '../infra/db/postgress/helpers/sequelize-helper'

const port = process.env.SERVER_PORT
SequelizeHelper.connect()
  .then(async () => {
    const app = (await import('./config/app')).default
    const httpServer = http.createServer(app)
    app.use('/public/uploads', express.static(path.join(__dirname, '..', '..', 'public', 'uploads')))
    httpServer.listen(port)
    console.log(`Server running at http://localhost:${port}`)
  })
  .catch(console.error)
