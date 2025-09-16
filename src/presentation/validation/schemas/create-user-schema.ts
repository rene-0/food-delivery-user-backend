import Joi from 'joi'
import { CreateUserController } from '../../controllers/http/user/create-user-controller'

export const createUserSchema = Joi.object<CreateUserController.Request, true>({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  phoneNumber: Joi.string().min(10).max(15).required(),
})
