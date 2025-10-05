import { Ingredient } from '../../../../../src/domain/models/entities/Ingredient'
import { Product } from '../../../../../src/domain/models/entities/Product'
import { IGetProduct } from '../../../../../src/domain/use-cases/product/get-product'

export class GetProductMock implements IGetProduct {
  async getProduct(request: IGetProduct.Request): Promise<IGetProduct.Response> {
    return new Product('1', 'any_name', 10, [new Ingredient('1', 'any_name', '1998-01-01', '1998-01-01')], '1998-01-01', '1998-01-01')
  }
}
