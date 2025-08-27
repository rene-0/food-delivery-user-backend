import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapters'
import { makeCreateUserController } from '../factories/controllers/http/create-user-controller-factory'
export default (router: Router): void => {
  router.post('/users', adaptRoute(makeCreateUserController()))
}
