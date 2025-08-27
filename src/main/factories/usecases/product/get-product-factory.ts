import { GetProduct } from '../../../../data/use-cases/product/get-product'
import { ProductRepository } from '../../../../infra/db/postgress/repositories/product-repository'

export const makeGetProduct = () => new GetProduct(new ProductRepository())
