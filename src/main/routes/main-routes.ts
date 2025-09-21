import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapters'
import { makeLoginController } from '../factories/controllers/http/authentication/login-controller-factory'
import { makeRefreshTokenController } from '../factories/controllers/http/authentication/refresh-token-controller-factory'

export default (router: Router): void => {
  router.post('/login', (req, res) => adaptRoute(makeLoginController(req, res))(req, res))
  router.post('/refresh-token', (req, res) => adaptRoute(makeRefreshTokenController(req, res))(req, res))
}
