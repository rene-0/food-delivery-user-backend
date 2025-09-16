import { IGetOrders } from '../../../../domain/use-cases/order/get-orders'
import { ok, serverError } from '../../../helpers/http-helper'
import { Controller } from '../../../protocols/controller'
import { HttpResponse } from '../../../protocols/http'

export class GetOrdersController implements Controller {
  constructor(private readonly getOrders: IGetOrders) {}

  async handle(httpRequest: GetOrdersController.Request): Promise<HttpResponse<any>> {
    try {
      const orders = await this.getOrders.getOrders({ userId: httpRequest.user.id })
      return ok(orders.map((order) => order.toJson()))
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace GetOrdersController {
  export type Request = {
    user: { id: string }
    products: Array<{ id: string; quantity: number }>
  }

  type Order = {
    id: string
    products: Array<{ id: string; name: string; price: number; quantity: number }>
    createdAt: string
    updatedAt: string
  }

  export type Response = Order[]
}
