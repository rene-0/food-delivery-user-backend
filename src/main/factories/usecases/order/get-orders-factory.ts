import { GetOrders } from '../../../../data/use-cases/order/get-orders'
import { OrderRepository } from '../../../../infra/db/postgress/repositories/order-repository'

export const makeGetOrders = () => new GetOrders(new OrderRepository())
