import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapters'
import { makeCreateOrderController } from '../factories/controllers/http/order/create-order-controller-factory'
import { isAuth } from '../middlewares/http/authentication/auth-middleware'
export default (router: Router): void => {
  router.post('/orders', isAuth, adaptRoute(makeCreateOrderController()))
}
