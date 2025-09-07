import { Order } from '../../../domain/models/entities/Order'
import { OrderProduct } from '../../../domain/models/entities/OrderProduct'
import { Product } from '../../../domain/models/entities/Product'
import { User } from '../../../domain/models/entities/User'
import { IUpdateOrder } from '../../../domain/use-cases/order/update-order'
import { GetOrderRepository } from '../../protocols/order/get-order-repository'
import { UpdateOrderRepository } from '../../protocols/order/update-order-repository'

interface OrderRepository extends UpdateOrderRepository, GetOrderRepository {}

export class UpdateOrder implements IUpdateOrder {
  constructor(readonly orderRepository: OrderRepository) {}
  async updateOrder(request: IUpdateOrder.Request): Promise<IUpdateOrder.Response> {
    const orderId = await this.orderRepository.updateOrder({ orderId: request.orderId, status: request.status, userId: request.userId })

    const order = await this.orderRepository.getOrder({ orderId: orderId.id })
    if (order) {
      return new Order(
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
    }
    return null
  }
}
