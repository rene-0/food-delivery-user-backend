import Joi from 'joi'
import { UpdateUserController } from '../../controllers/http/user/update-user-controller'

export const updateUserSchema = Joi.object<UpdateUserController.Request, true>({
  user: Joi.object({ id: Joi.string().required() }).required(),
  name: Joi.string().min(3).max(30),
  password: Joi.string().min(6),
  phoneNumber: Joi.string().min(10).max(15),
})
