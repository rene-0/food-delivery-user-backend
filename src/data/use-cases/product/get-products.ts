import { Product } from '../../../domain/models/entities/Product'
import { IGetProducts } from '../../../domain/use-cases/product/get-products'
import { GetProductsRepository } from '../../protocols/product/get-products-respository'

export class GetProducts implements IGetProducts {
  constructor(private readonly productRepository: GetProductsRepository) {}
  async getProducts(): Promise<IGetProducts.Response> {
    const products = await this.productRepository.getProducts()

    return products.map((product) => new Product(product.id, product.name, product.price, product.createdAt, product.updatedAt))
  }
}
