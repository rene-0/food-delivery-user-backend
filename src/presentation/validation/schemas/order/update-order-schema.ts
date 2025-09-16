import Joi from 'joi'
import { UpdateOrderController } from '../../../controllers/http/order/update-order-controller'

export const updateOrderSchema = Joi.object<UpdateOrderController.Request, true>({
  user: Joi.object({ id: Joi.string().required() }).required(),
  orderId: Joi.string().required(),
  status: Joi.string().valid('canceled').required(),
})
