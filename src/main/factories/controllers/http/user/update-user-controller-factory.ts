import { Request, Response } from 'express'
import { UpdateUserController } from '../../../../../presentation/controllers/http/user/update-user-controller'
import { makeRefreshToken } from '../../../usecases/authentication/refresh-token-factory'
import { makeUpdateUser } from '../../../usecases/user/update-user-factory'

export const makeUpdateUserController = (request: Request, response: Response) => {
  return new UpdateUserController(request, response, makeUpdateUser(), makeRefreshToken())
}
