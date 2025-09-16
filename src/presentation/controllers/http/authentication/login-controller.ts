import { IAuthentication } from '../../../../domain/use-cases/authentication/authentication'
import { ok, serverError, unauthorized } from '../../../helpers/http-helper'
import { Controller } from '../../../protocols/controller'
import { HttpResponse } from '../../../protocols/http'

export class LoginController implements Controller {
  constructor(private readonly useAuthentication: IAuthentication) {}
  async handle(httpRequest: LoginController.Request): Promise<HttpResponse<any>> {
    try {
      const auth = await this.useAuthentication.authenticate(httpRequest)

      if (!auth) {
        return unauthorized(new Error('Invalid credentials'))
      }

      return ok(auth)
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace LoginController {
  export type Request = {
    email: string
    password: string
  }

  type AccessToken = {
    token: string
    expiresIn: number
  }

  export type Response = {
    email: string
    name: string
    accessToken: AccessToken
  }
}
