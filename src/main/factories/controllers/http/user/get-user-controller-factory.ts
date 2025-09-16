import { GetUserController } from '../../../../../presentation/controllers/http/user/get-user-controller'
import { makeGetUser } from '../../../usecases/user/get-user-factory'

export const makeCreateUserController = () => {
  return new GetUserController(makeGetUser())
}
