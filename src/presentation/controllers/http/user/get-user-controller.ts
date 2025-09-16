import { User } from '../../../../domain/models/entities/User'
import { IGetUser } from '../../../../domain/use-cases/user/get-user'
import { badRequest, ok, serverError } from '../../../helpers/http-helper'
import { Controller } from '../../../protocols/controller'
import { HttpResponse } from '../../../protocols/http'

export class GetUserController implements Controller {
  constructor(private readonly getUser: IGetUser) {}

  async handle(httpRequest: GetUserController.Request): Promise<HttpResponse<any>> {
    try {
      const user = await this.getUser.getUser({ id: httpRequest.id })

      if (!user) {
        return badRequest([{ field: 'id', message: 'User not found' }])
      }
      return ok(user.toJson())
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace GetUserController {
  export type Request = {
    id: User['id']
  }

  export type Response = {
    name: User['name']
    email: User['email']
    phoneNumber: User['phoneNumber']
  }
}
