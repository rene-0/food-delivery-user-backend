import { Product } from '../../../domain/models/entities/Product'
import { IGetProduct } from '../../../domain/use-cases/product/get-product'
import { GetProductRepository } from '../../protocols/product/get-product-repository'

export class GetProduct implements IGetProduct {
  constructor(readonly productRepository: GetProductRepository) {}
  async getProduct(request: IGetProduct.Request): Promise<IGetProduct.Response> {
    const product = await this.productRepository.getProduct({ productId: request.id })
    if (!product) {
      return null
    }
    const { id, name, price, createdAt, updatedAt } = product
    return new Product(id, name, price, createdAt, updatedAt)
  }
}
