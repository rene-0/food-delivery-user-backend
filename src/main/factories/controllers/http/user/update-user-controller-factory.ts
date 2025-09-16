import { UpdateUserController } from '../../../../../presentation/controllers/http/user/update-user-controller'
import { makeUpdateUser } from '../../../usecases/user/update-user-factory'

export const makeUpdateUserController = () => {
  return new UpdateUserController(makeUpdateUser())
}
