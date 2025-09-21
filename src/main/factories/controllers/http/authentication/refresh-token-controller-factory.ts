import { Request, Response } from 'express'
import { RefreshTokenController } from '../../../../../presentation/controllers/http/authentication/refresh-token-controller'
import { makeRefreshToken } from '../../../usecases/authentication/refresh-token-factory'

export const makeRefreshTokenController = (request: Request, response: Response): RefreshTokenController => {
  return new RefreshTokenController(request, response, makeRefreshToken())
}
