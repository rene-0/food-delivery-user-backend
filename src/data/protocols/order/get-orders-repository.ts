import { Order } from '../../../domain/models/entities/Order'
import { Product } from '../../../domain/models/entities/Product'
import { User } from '../../../domain/models/entities/User'

export interface GetOrdersRepository {
  getOrders: (request: GetOrdersRepository.Request) => Promise<GetOrdersRepository.Response>
}

export namespace GetOrdersRepository {
  export type Request = { userId: string }

  export type Response = OrderQuery[]

  type OrderQuery = {
    id: Order['id']
    status: Order['status']
    user: OrderUser
    orderProducts: Array<{
      id: string
      product: OrderProduct
      quantity: number
      createdAt: string
      updatedAt: string
    }>
    createdAt: string
    updatedAt: string
  }

  export type QueryResponse = {
    order: {
      id: Order['id']
      status: Order['status']
      createdAt: string
      updatedAt: string
    }
    user: OrderUser
    orderProduct: {
      id: string
      quantity: number
      createdAt: string
      updatedAt: string
    }
    product: OrderProduct
  }

  type OrderUser = {
    id: User['id']
    name: User['name']
    email: User['email']
    phoneNumber: User['phoneNumber']
    createdAt: string
    updatedAt: string
  }

  type OrderProduct = {
    id: Product['id']
    name: Product['name']
    price: Product['price']
    createdAt: string
    updatedAt: string
  }
}
