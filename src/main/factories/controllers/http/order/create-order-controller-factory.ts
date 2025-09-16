import { CreateOrderController } from '../../../../../presentation/controllers/http/order/create-order-controller'
import { makeCreateOrder } from '../../../usecases/order/create-order-factory'

export const makeCreateOrderController = () => new CreateOrderController(makeCreateOrder())
