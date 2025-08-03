import { Router } from 'express'
import { makeLoginController } from 'main/factories/controllers/http/authentication/login-controller-factory'
import { adaptRoute } from '../adapters/express-route-adapters'

export default (router: Router): void => {
  router.post('/login', adaptRoute(makeLoginController()))
}
