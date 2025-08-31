import { Order } from '../../../domain/models/entities/Order'

export interface CreateOrderRepository {
  createOrder: (request: CreateOrderRepository.Request) => Promise<CreateOrderRepository.Response>
}

export namespace CreateOrderRepository {
  export type Request = {
    userId: string
    products: Array<{ id: string; quantity: number }>
    status: Order['status']
  }

  export type Response = {
    id: string
  }
}
