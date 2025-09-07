import { Order } from '../../../../domain/models/entities/Order'
import { IUpdateOrder } from '../../../../domain/use-cases/order/update-order'
import { badRequest, ok, serverError } from '../../../helpers/http-helper'
import { Controller } from '../../../protocols/controller'
import { HttpResponse } from '../../../protocols/http'
import { updateOrderSchema } from '../../../validation/schemas/order/update-order-schema'

export class UpdateOrderController implements Controller {
  constructor(private readonly updateOrder: IUpdateOrder) {}

  async handle(httpRequest: UpdateOrderController.Request): Promise<HttpResponse<any>> {
    try {
      const validationResult = updateOrderSchema.validate(httpRequest, { abortEarly: false, allowUnknown: true })
      if (validationResult.error) {
        return badRequest(
          validationResult.error.details.map((detail) => ({
            field: detail.path.join('.'),
            message: detail.message,
          }))
        )
      }
      const orders = await this.updateOrder.updateOrder({
        userId: httpRequest.user.id,
        orderId: httpRequest.orderId,
        status: httpRequest.status,
      })
      return ok(orders.toJson())
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace UpdateOrderController {
  export type Request = {
    user: { id: string }
    orderId: string
    status: Order['status']
  }

  type OrderResponse = {
    id: string
    products: Array<{ id: string; name: string; price: number; quantity: number }>
    createdAt: string
    updatedAt: string
  }

  export type Response = OrderResponse[]
}
