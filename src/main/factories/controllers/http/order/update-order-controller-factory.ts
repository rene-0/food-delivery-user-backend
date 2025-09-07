import { UpdateOrderController } from '../../../../../presentation/controllers/http/order/update-order-controller'
import { makeUpdateOrder } from '../../../usecases/order/update-order-factory'

export const makeUpdateOrderController = () => new UpdateOrderController(makeUpdateOrder())
