import { Request, Response } from 'express'
import { User } from '../../../../domain/models/entities/User'
import { IRefreshToken } from '../../../../domain/use-cases/authentication/refresh-token'
import { IUpdateUser } from '../../../../domain/use-cases/user/update-user'
import { badRequest, forbidden, ok, serverError, unauthorized } from '../../../helpers/http-helper'
import { Controller } from '../../../protocols/controller'
import { HttpResponse } from '../../../protocols/http'
import { updateUserSchema } from '../../../validation/schemas/update-user-schema'

export class UpdateUserController implements Controller {
  constructor(private readonly request: Request, private readonly response: Response, private readonly updateUser: IUpdateUser, private readonly refreshToken: IRefreshToken) {}

  async handle(httpRequest: UpdateUserController.Request): Promise<HttpResponse<UpdateUserController.Response>> {
    try {
      const refreshToken = this.request.cookies?.refreshToken
      if (!refreshToken) {
        return unauthorized(new Error('Refresh token is missing'))
      }

      const validationResult = updateUserSchema.validate(httpRequest, { abortEarly: false, allowUnknown: true })
      if (validationResult.error) {
        return badRequest(
          validationResult.error.details.map((detail) => ({
            field: detail.path.join('.'),
            message: detail.message,
          }))
        )
      }

      const user = await this.updateUser.updateUser({
        id: httpRequest.user.id,
        name: httpRequest.name,
        password: httpRequest.password,
        phoneNumber: httpRequest.phoneNumber,
      })
      if (!user) {
        return badRequest([{ field: 'id', message: 'User not found' }])
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

export namespace UpdateUserController {
  type AccessToken = {
    token: string
    expiresIn: number
  }

  export type Request = {
    user: { id: string }
    name?: string
    password?: string
    phoneNumber?: string
  }

  export type Response = {
    email: User['email']
    name: User['name']
    phoneNumber: User['phoneNumber']
    accessToken: AccessToken
  }
}
