import { Product } from '../../models/entities/Product'

export interface IGetProducts {
  getProducts: () => Promise<IGetProducts.Response>
}

export namespace IGetProducts {
  export type Response = Product[]
}
