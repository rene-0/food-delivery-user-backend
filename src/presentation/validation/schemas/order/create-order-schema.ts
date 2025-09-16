import Joi from 'joi'
import { CreateOrderController } from '../../../controllers/http/order/create-order-controller'

export const createOrderSchema = Joi.object<CreateOrderController.Request, true>({
  user: Joi.object({ id: Joi.string().required() }).required(),
  products: Joi.array()
    .items(
      Joi.object({
        id: Joi.string().required(),
        quantity: Joi.number().min(1).required(),
      })
    )
    .min(1)
    .required(),
})
