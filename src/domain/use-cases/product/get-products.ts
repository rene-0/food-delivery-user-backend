import { Product } from '../../models/entities/Product'

export interface IGetProducts {
  getProducts: (request: IGetProducts.Request) => Promise<IGetProducts.Response>
}

export namespace IGetProducts {
  export type Request = {}

  export type Response = Product[]
}
