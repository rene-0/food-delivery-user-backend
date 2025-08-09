import { LoginController } from '../../../../../presentation/controllers/http/authentication/login-controller'
import { makeAuthentication } from '../../../usecases/authentication/authentication-factory'

export const makeLoginController = (): LoginController => {
  return new LoginController(makeAuthentication())
}
