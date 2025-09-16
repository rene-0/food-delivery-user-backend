import { GetOrdersController } from '../../../../../presentation/controllers/http/order/get-orders-controller'
import { makeGetOrders } from '../../../usecases/order/get-orders-factory'

export const makeGetOrdersController = () => new GetOrdersController(makeGetOrders())
