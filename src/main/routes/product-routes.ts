import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapters'
import { makeGetProductController } from '../factories/controllers/http/product/get-product-controller-factory'
import { makeGetProductsController } from '../factories/controllers/http/product/get-products-controller-factory'
export default (router: Router): void => {
  router.get('/products/:id', adaptRoute(makeGetProductController()))
  router.get('/products', adaptRoute(makeGetProductsController()))
}
