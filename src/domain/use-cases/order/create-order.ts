import { Order } from '../../models/entities/Order'

export interface ICreateOrder {
  createOrder: (request: ICreateOrder.Request) => Promise<ICreateOrder.Response>
}

export namespace ICreateOrder {
  export type Request = {
    userId: string
    products: Array<{ id: string; quantity: number }>
  }

  export type Response = Order | null
}
