import { Product } from '../../models/entities/Product'

export interface IGetProduct {
  getProduct: (request: IGetProduct.Request) => Promise<IGetProduct.Response>
}

export namespace IGetProduct {
  export type Request = {
    id: number
  }

  export type Response = Product | null
}
