import { Product } from '../../../domain/models/entities/Product'

export interface GetProductsRepository {
  getProducts: () => Promise<GetProductsRepository.Response>
}

export namespace GetProductsRepository {
  export type Request = {}

  type ProductResponse = {
    id: Product['id']
    name: Product['name']
    price: Product['price']
    createdAt: string
    updatedAt: string
  }

  export type Response = ProductResponse[]
}
