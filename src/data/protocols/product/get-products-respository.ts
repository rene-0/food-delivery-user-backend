import { Product } from '../../../domain/models/entities/Product'

export interface GetProductsRepository {
  getProducts: () => Promise<GetProductsRepository.Response>
}

export namespace GetProductsRepository {
  export type Request = {}

  export type QueryResponse = {
    id: string
    name: string
    price: number
    ingredient: Ingredient
    createdAt: string
    updatedAt: string
  }

  type ProductResponse = {
    id: string
    name: Product['name']
    price: Product['price']
    ingredients: Ingredient[]
    createdAt: string
    updatedAt: string
  }

  type Ingredient = {
    id: string
    name: string
    createdAt: string
    updatedAt: string
  }

  export type Response = ProductResponse[]
}
