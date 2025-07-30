import dotenv from 'dotenv'
dotenv.config()

import { Dialect } from 'sequelize'

const databaseConfig = {
  development: {
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,
    dialect: 'postgres' as Dialect,
  }
}

export = databaseConfig