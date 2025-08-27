import { User } from '../../../../domain/models/entities/User'
import { ICreateUser } from '../../../../domain/use-cases/user/create-user'
import { badRequest, ok, serverError } from '../../../helpers/http-helper'
import { Controller } from '../../../protocols/controller'
import { HttpResponse } from '../../../protocols/http'
import { createUserSchema } from '../../../validation/schemas/create-user-schema'

export class CreateUserController implements Controller {
  constructor(private readonly createUser: ICreateUser) {}
  async handle(httpRequest: CreateUserController.Request): Promise<HttpResponse<CreateUserController.Response>> {
    try {
      const validationResult = createUserSchema.validate(httpRequest, { abortEarly: false, allowUnknown: true })
      if (validationResult.error) {
        return badRequest(
          validationResult.error.details.map((detail) => ({
            field: detail.path.join('.'),
            message: detail.message,
          }))
        )
      }

      const user = await this.createUser.createUser({
        name: httpRequest.name,
        email: httpRequest.email,
        password: httpRequest.password,
        phoneNumber: httpRequest.phoneNumber,
      })

      if (!user) {
        return badRequest([{ field: 'email', message: 'Email already in use' }])
      }

      return ok(user.toJson())
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace CreateUserController {
  export type Request = {
    name: User['name']
    email: User['email']
    password: User['password']
    phoneNumber: User['phoneNumber']
  }

  export type Response = {
    name: User['name']
    email: User['email']
    phoneNumber: User['phoneNumber']
  }
}
