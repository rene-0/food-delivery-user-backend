import { Product } from '../../../../../src/domain/models/entities/Product'
import { IGetProducts } from '../../../../../src/domain/use-cases/product/get-products'

export class GetProductsMock implements IGetProducts {
  async getProducts(): Promise<IGetProducts.Response> {
    return [new Product(1, 'any_name', 10, '1998-01-01', '1998-01-01')]
  }
}
