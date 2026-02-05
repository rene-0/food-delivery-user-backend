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
            createdAt: original.createdAt,
            updatedAt: original.updatedAt,
            products: original.orderProducts.map((orderProduct) => ({
              ...orderProduct.product,
              quantity: orderProduct.quantity,
            })),
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

  type Ingredient = {
    id: string
    name: string
    createdAt: string
    updatedAt: string
  }

  type Product = {
    id: string
    name: string
    price: number
    quantity: number
    ingredients: Ingredient[]
  }

  export type Order = {
    id: string
    status: string
    products: Product[]
    createdAt: string
    updatedAt: string
  }

  export type Response = Order[]
}
