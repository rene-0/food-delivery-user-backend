

import express from 'express'
import { SequelizeHelper } from '../infra/db/postgress/helpers/sequelize-helper'


const app = express()

app.listen(process.env.SERVER_PORT, async () => {
  await SequelizeHelper.connect()
  console.log(`Server started at ${process.env.SERVER_PORT}`)
})