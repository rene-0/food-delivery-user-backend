import { GetProducts } from '../../../../data/use-cases/product/get-products'
import { ProductRepository } from '../../../../infra/db/postgress/repositories/product-repository'

export const makeGetProducts = () => {
  const authenticationRepository = new ProductRepository()
  return new GetProducts(authenticationRepository)
}
