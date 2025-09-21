import cookieParser from 'cookie-parser'
import cors from 'cors'
import { Express } from 'express'
import { bodyParser } from '../middlewares/http/body-parser'
import { contentType } from '../middlewares/http/content-type'

export default (app: Express): void => {
  app.use(contentType)
  app.use(bodyParser)
  app.use(cors({ origin: true, credentials: true }))
  app.use(cookieParser())
}
