import { Product } from '../../../domain/models/entities/Product'

export interface GetProductRepository {
  getProduct: (request: GetProductRepository.Request) => Promise<GetProductRepository.Response>
}

export namespace GetProductRepository {
  export type Request = {
    productId: number
  }

  type Ingredient = {
    id: string
    name: string
    createdAt: string
    updatedAt: string
  }

  export type QueryResponse = {
    id: string
    name: Product['name']
    price: Product['price']
    ingredient: Ingredient
    createdAt: string
    updatedAt: string
  }

  export type Response = {
    id: string
    name: Product['name']
    price: Product['price']
    ingredients: Ingredient[]
    createdAt: string
    updatedAt: string
  }
}
