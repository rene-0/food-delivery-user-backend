import { GetProductsController } from '../../../../../presentation/controllers/http/product/get-products-controller'
import { makeGetProducts } from '../../../usecases/authentication/get-products-factory'

export const makeGetProductsController = () => {
  return new GetProductsController(makeGetProducts())
}
