import { IDoesAccountExists } from '../../../../domain/use-cases/authentication/does-account-exists'
import { IIsAccessTokenValid } from '../../../../domain/use-cases/authentication/is-accesstoken-valid.ts'
import { forbidden, ok, serverError } from '../../../helpers/http-helper'
import { HttpResponse } from '../../../protocols/http'
import { Middleware } from '../../../protocols/middleware'

export class AuthMiddleware implements Middleware {
  constructor(private readonly doesAccountExists: IDoesAccountExists, private readonly isAccessTokenValid: IIsAccessTokenValid) {}

  async handle(httpRequest: AuthMiddleware.Request): Promise<HttpResponse<any>> {
    try {
      const { accessToken } = httpRequest

      if (!accessToken) {
        return forbidden(new Error('Access denied'))
      }
      const isAccessTokenValid = await this.isAccessTokenValid.isAccessTokenValid({ accessToken })

      if (!isAccessTokenValid) {
        return forbidden(new Error('Access denied'))
      }

      const accountExists = await this.doesAccountExists.doesAccountExists({ email: isAccessTokenValid.email })

      if (!accountExists) {
        return forbidden(new Error('Access denied'))
      }

      return ok({})
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace AuthMiddleware {
  export type Request = {
    accessToken: string
  }
}
