import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapters'
import { makeCreateUserController } from '../factories/controllers/http/user/create-user-controller-factory'
import { makeUpdateUserController } from '../factories/controllers/http/user/update-user-controller-factory'
import { isAuth } from '../middlewares/http/authentication/auth-middleware'
export default (router: Router): void => {
  router.post('/users', adaptRoute(makeCreateUserController()))
  router.put('/users', isAuth, adaptRoute(makeUpdateUserController()))
}
