import { Order } from '../../../domain/models/entities/Order'

export interface UpdateOrderRepository {
  updateOrder: (request: UpdateOrderRepository.Request) => Promise<UpdateOrderRepository.Response>
}

export namespace UpdateOrderRepository {
  export type Request = {
    userId: string
    orderId: string
    status: Order['status']
  }

  export type Response = {
    id: string
  }
}
