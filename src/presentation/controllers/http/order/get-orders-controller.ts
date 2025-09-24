import { IGetOrders } from '../../../../domain/use-cases/order/get-orders'
import { ok, serverError } from '../../../helpers/http-helper'
import { Controller } from '../../../protocols/controller'
import { HttpResponse } from '../../../protocols/http'

export class GetOrdersController implements Controller {
  constructor(private readonly getOrders: IGetOrders) {}

  async handle(httpRequest: GetOrdersController.Request): Promise<HttpResponse<GetOrdersController.Response>> {
    try {
      const orders = await this.getOrders.getOrders({ userId: httpRequest.user.id })
      return ok(
        orders.map((order): GetOrdersController.Order => {
          const original = order.toJson()
          return {
            id: original.id,
            status: original.status,
            products: original.orderProducts.map((orderProduct) => ({
              id: orderProduct.id,
              name: orderProduct.product.name,
              price: orderProduct.product.price,
              quantity: orderProduct.quantity,
            })),
            createdAt: original.createdAt,
            updatedAt: original.updatedAt,
          }
        })
      )
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace GetOrdersController {
  export type Request = {
    user: { id: string }
  }

  export type Order = {
    id: string
    status: string
    products: Array<{ id: string; name: string; price: number; quantity: number }>
    createdAt: string
    updatedAt: string
  }

  export type Response = Order[]
}
