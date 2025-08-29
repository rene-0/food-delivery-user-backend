import { IUpdateUser } from '../../../../domain/use-cases/user/update-user'
import { badRequest, ok } from '../../../helpers/http-helper'
import { Controller } from '../../../protocols/controller'
import { HttpResponse } from '../../../protocols/http'
import { updateUserSchema } from '../../../validation/schemas/update-user-schema'

export class UpdateUserController implements Controller {
  constructor(private readonly updateUser: IUpdateUser) {}

  async handle(httpRequest: UpdateUserController.Request): Promise<HttpResponse<UpdateUserController.Response>> {
    const validationResult = updateUserSchema.validate(httpRequest, { abortEarly: false, allowUnknown: true })
    if (validationResult.error) {
      return badRequest(
        validationResult.error.details.map((detail) => ({
          field: detail.path.join('.'),
          message: detail.message,
        }))
      )
    }

    const user = await this.updateUser.updateUser(httpRequest)
    if (!user) {
      return badRequest([{ field: 'id', message: 'User not found' }])
    }

    return ok(user.toJson())
  }
}

export namespace UpdateUserController {
  export type Request = {
    id: string
    name?: string
    password?: string
    phoneNumber?: string
  }

  export type Response = {
    name: string
    email: string
    phoneNumber: string
  }
}
