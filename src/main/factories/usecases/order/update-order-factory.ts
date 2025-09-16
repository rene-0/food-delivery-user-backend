import { UpdateOrder } from '../../../../data/use-cases/order/update-order'
import { OrderRepository } from '../../../../infra/db/postgress/repositories/order-repository'

export const makeUpdateOrder = () => new UpdateOrder(new OrderRepository())
