import { IAuthentication } from 'domain/use-cases/authentication/authentication'
import jwt from 'jsonwebtoken'
import { ok, serverError, unauthorized } from 'presentation/helpers/http-helper'
import { Controller } from 'presentation/protocols/controller'
import { HttpResponse } from 'presentation/protocols/http'

export class LoginController implements Controller {
  constructor(private readonly useAuthentication: IAuthentication) {}
  async handle(httpRequest: LoginController.Request): Promise<HttpResponse<any>> {
    try {
      const auth = await this.useAuthentication.authenticate(httpRequest)

      if (!auth) {
        return unauthorized(new Error('Invalid credentials'))
      }

      const { email, name } = auth

      const expiresInSeconds = 60 * 60 // 1h

      const token = jwt.sign(auth, 'secret', { expiresIn: expiresInSeconds })

      return ok({ email, name, accessToken: { token, expiresIn: expiresInSeconds } })
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
