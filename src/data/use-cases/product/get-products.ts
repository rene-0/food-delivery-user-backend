import { Ingredient } from '../../../domain/models/entities/Ingredient'
import { Product } from '../../../domain/models/entities/Product'
import { IGetProducts } from '../../../domain/use-cases/product/get-products'
import { GetProductsRepository } from '../../protocols/product/get-products-respository'

export class GetProducts implements IGetProducts {
  constructor(private readonly productRepository: GetProductsRepository) {}
  async getProducts(): Promise<IGetProducts.Response> {
    const products = await this.productRepository.getProducts()

    return products.map(
      (product) =>
        new Product(
          +product.id,
          product.name,
          product.price,
          product.ingredients.map((ingredient) => new Ingredient(ingredient.id, ingredient.name, ingredient.createdAt, ingredient.updatedAt)),
          product.createdAt,
          product.updatedAt
        )
    )
  }
}
