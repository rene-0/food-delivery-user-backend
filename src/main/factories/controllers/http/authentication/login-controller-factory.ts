import { makeAuthentication } from 'main/factories/usecases/authentication/authentication-factory'
import { LoginController } from 'presentation/controllers/http/authentication/login-controller'

export const makeLoginController = (): LoginController => {
  return new LoginController(makeAuthentication())
}
