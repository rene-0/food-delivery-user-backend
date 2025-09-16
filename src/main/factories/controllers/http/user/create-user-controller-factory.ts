import { CreateUserController } from '../../../../../presentation/controllers/http/user/create-user-controller'
import { makeCreateUser } from '../../../usecases/user/create-user-factory'

export const makeCreateUserController = () => {
  return new CreateUserController(makeCreateUser())
}
