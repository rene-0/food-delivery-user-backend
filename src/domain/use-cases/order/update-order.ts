import { Order } from '../../models/entities/Order'

export interface IUpdateOrder {
  updateOrder: (request: IUpdateOrder.Request) => Promise<IUpdateOrder.Response>
}

export namespace IUpdateOrder {
  export type Request = {
    userId: string
    orderId: string
    status: Order['status']
  }

  export type Response = Order | null
}
