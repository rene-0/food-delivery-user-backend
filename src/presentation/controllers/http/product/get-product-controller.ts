import { Product } from '../../../../domain/models/entities/Product'
import { IGetProduct } from '../../../../domain/use-cases/product/get-product'
import { notFound, ok, serverError } from '../../../helpers/http-helper'
import { Controller } from '../../../protocols/controller'
import { HttpResponse } from '../../../protocols/http'

export class GetProductController implements Controller {
  constructor(private readonly getProduct: IGetProduct) {}

  async handle(httpRequest: GetProductController.Request): Promise<HttpResponse<GetProductController.Response>> {
    try {
      const product = await this.getProduct.getProduct({ id: httpRequest.id })
      if (!product) {
        return notFound('Product not found')
      }

      return ok(product.toJson())
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace GetProductController {
  export type Request = {
    id: number
  }

  type Ingredient = {
    id: string
    name: string
    createdAt: string
    updatedAt: string
  }

  export type Response = {
    id: Product['id']
    name: Product['name']
    price: Product['price']
    ingredients: Ingredient[]
    createdAt: string
    updatedAt: string
  }
}
