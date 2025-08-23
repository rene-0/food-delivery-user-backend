import { GetProductController } from '../../../../../presentation/controllers/http/product/get-product-controller'
import { makeGetProduct } from '../../../usecases/authentication/get-product-factory'

export const makeGetProductController = () => {
  return new GetProductController(makeGetProduct())
}
