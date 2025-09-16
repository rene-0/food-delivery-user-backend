import { Order } from '../../models/entities/Order'

export interface IGetOrders {
  getOrders: (request: IGetOrders.Request) => Promise<IGetOrders.Response>
}

export namespace IGetOrders {
  export type Request = {
    userId: string
  }

  export type Response = Order[] | null
}
