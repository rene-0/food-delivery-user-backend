import { ICreateOrder } from '../../../../domain/use-cases/order/create-order'
import { badRequest, ok, serverError } from '../../../helpers/http-helper'
import { Controller } from '../../../protocols/controller'
import { HttpResponse } from '../../../protocols/http'
import { createOrderSchema } from '../../../validation/schemas/order/create-order-schema'

export class CreateOrderController implements Controller {
  constructor(private readonly createOrder: ICreateOrder) {}

  async handle(httpRequest: CreateOrderController.Request): Promise<HttpResponse<any>> {
    try {
      const validationResult = createOrderSchema.validate(httpRequest, { abortEarly: false, allowUnknown: true })
      if (validationResult.error) {
        return badRequest(
          validationResult.error.details.map((detail) => ({
            field: detail.path.join('.'),
            message: detail.message,
          }))
        )
      }
      const order = await this.createOrder.createOrder({
        userId: httpRequest.user.id,
        products: httpRequest.products,
      })
      return ok(order.toJson())
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace CreateOrderController {
  export type Request = {
    user: { id: string }
    products: Array<{ id: string; quantity: number }>
  }

  export type Response = {
    id: string
    products: Array<{ id: string; name: string; price: number; quantity: number }>
    createdAt: string
    updatedAt: string
  }
}
