import { Order } from '../../../domain/models/entities/Order'
import { OrderProduct } from '../../../domain/models/entities/OrderProduct'
import { Product } from '../../../domain/models/entities/Product'
import { User } from '../../../domain/models/entities/User'
import { ICreateOrder } from '../../../domain/use-cases/order/create-order'
import { CreateOrderRepository } from '../../protocols/order/create-order-repository'
import { GetOrderRepository } from '../../protocols/order/get-order-repository'

interface OrderRepository extends CreateOrderRepository, GetOrderRepository {}

export class CreateOrder implements ICreateOrder {
  constructor(readonly orderRepository: OrderRepository) {}
  async createOrder(request: ICreateOrder.Request): Promise<ICreateOrder.Response> {
    const orderId = await this.orderRepository.createOrder({
      userId: request.userId,
      products: request.products,
      status: 'pending',
    })

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
