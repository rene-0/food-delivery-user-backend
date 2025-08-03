import { makeAuthMiddleware } from 'main/factories/middleware/http/authentication/auth-middleware-factory'
import { adaptMiddleware } from '../../../adapters/express-middleware-adapter'

export const auth = adaptMiddleware(makeAuthMiddleware())
