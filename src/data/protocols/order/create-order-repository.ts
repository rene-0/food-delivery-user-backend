import { Order } from '../../../domain/models/entities/Order'

export interface CreateOrderRepository {
  createOrder: (request: CreateOrderRepository.Request) => Promise<CreateOrderRepository.Response>
}

export namespace CreateOrderRepository {
  export type Request = {
    userId: string
    products: Product[]
    status: Order['status']
  }

  type Product = {
    id: string
    quantity: number
    ingredientIds: string[]
  }

  export type Response = {
    id: string
  }
}
