import { Product } from '../../../domain/models/entities/Product'

export interface GetProductRepository {
  getProduct: (request: GetProductRepository.Request) => Promise<GetProductRepository.Response>
}

export namespace GetProductRepository {
  export type Request = {
    productId: number
  }

  export type Response = {
    id: Product['id']
    name: Product['name']
    price: Product['price']
    createdAt: string
    updatedAt: string
  }
}
