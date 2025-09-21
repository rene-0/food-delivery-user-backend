import { Request, Response } from 'express'
import { User } from '../../../../domain/models/entities/User'
import { IRefreshToken } from '../../../../domain/use-cases/authentication/refresh-token'
import { forbidden, ok, serverError, unauthorized } from '../../../helpers/http-helper'
import { Controller } from '../../../protocols/controller'
import { HttpResponse } from '../../../protocols/http'

export class RefreshTokenController implements Controller {
  constructor(private readonly request: Request, private readonly response: Response, private readonly refreshToken: IRefreshToken) {}
  async handle(): Promise<HttpResponse<any>> {
    try {
      const refreshToken = this.request.cookies?.refreshToken

      if (!refreshToken) {
        return unauthorized(new Error('Refresh token is missing'))
      }

      const auth = await this.refreshToken.refreshToken({ refreshToken })

      if (!auth) {
        return forbidden(new Error('Invalid refresh token'))
      }

      return ok(auth)
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace RefreshTokenController {
  type AccessToken = {
    token: string
    expiresIn: number
  }

  export type Response = {
    email: User['email']
    name: User['name']
    phoneNumber: User['phoneNumber']
    accessToken: AccessToken
  }
}
