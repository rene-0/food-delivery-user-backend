import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapters'
import { makeCreateUserController } from '../factories/controllers/http/create-user-controller-factory'
import { isAuth } from '../middlewares/http/authentication/auth-middleware'
export default (router: Router): void => {
  router.post('/user', isAuth, adaptRoute(makeCreateUserController()))
}
