import { Request, Response } from 'express'
import { LoginController } from '../../../../../presentation/controllers/http/authentication/login-controller'
import { makeAuthentication } from '../../../usecases/authentication/authentication-factory'

export const makeLoginController = (request: Request, response: Response): LoginController => {
  return new LoginController(request, response, makeAuthentication())
}
