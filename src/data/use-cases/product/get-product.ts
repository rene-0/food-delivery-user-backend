import { Ingredient } from '../../../domain/models/entities/Ingredient'
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
    return new Product(
      id,
      name,
      price,
      product.ingredients.map((ingredient) => new Ingredient(ingredient.id, ingredient.name, ingredient.createdAt, ingredient.updatedAt)),
      createdAt,
      updatedAt
    )
  }
}
