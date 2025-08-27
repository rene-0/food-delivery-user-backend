import { GetProducts } from '../../../../data/use-cases/product/get-products'
import { Product } from '../../../../domain/models/entities/Product'
import { ok, serverError } from '../../../helpers/http-helper'
import { Controller } from '../../../protocols/controller'
import { HttpResponse } from '../../../protocols/http'

export class GetProductsController implements Controller {
  constructor(private readonly getProducts: GetProducts) {}

  async handle(): Promise<HttpResponse<GetProductsController.Response[]>> {
    try {
      const products = await this.getProducts.getProducts()
      return ok(products.map((product) => product.toJson()))
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace GetProductsController {
  export type Response = {
    id: Product['id']
    name: Product['name']
    price: Product['price']
    createdAt: string
    updatedAt: string
  }
}
