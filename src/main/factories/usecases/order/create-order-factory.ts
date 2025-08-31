import { CreateOrder } from '../../../../data/use-cases/order/create-order'
import { OrderRepository } from '../../../../infra/db/postgress/repositories/order-repository'

export const makeCreateOrder = () => new CreateOrder(new OrderRepository())
