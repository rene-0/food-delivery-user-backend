import { Order } from '../../../domain/models/entities/Order'
import { OrderProduct } from '../../../domain/models/entities/OrderProduct'
import { Product } from '../../../domain/models/entities/Product'
import { User } from '../../../domain/models/entities/User'
import { IGetOrders } from '../../../domain/use-cases/order/get-orders'
import { GetOrdersRepository } from '../../protocols/order/get-orders-repository'

export class GetOrders implements IGetOrders {
  constructor(readonly orderRepository: GetOrdersRepository) {}
  async getOrders(request: IGetOrders.Request): Promise<IGetOrders.Response> {
    const order = await this.orderRepository.getOrders(request)

    return order
      ? order.map(
          (order) =>
            new Order(
              order.id,
              order.status,
              new User(order.user.id, order.user.name, order.user.email, '', order.user.phoneNumber, order.user.createdAt, order.user.updatedAt),
              order.orderProducts.map(
                (orderProduct) =>
                  new OrderProduct(
                    orderProduct.id,
                    order.id,
                    new Product(orderProduct.product.id, orderProduct.product.name, orderProduct.product.price, orderProduct.product.createdAt, orderProduct.product.updatedAt),
                    orderProduct.quantity,
                    orderProduct.createdAt,
                    orderProduct.updatedAt
                  )
              ),
              order.createdAt,
              order.updatedAt
            )
        )
      : null
  }
}
