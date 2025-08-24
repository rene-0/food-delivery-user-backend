import { Request, Response } from 'express'
import { Controller } from '../../presentation/protocols/controller'

export const adaptRoute = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const accessToken = req?.headers['Authorization'] || req?.headers['authorization']
    const request = {
      ...(req.body || {}),
      ...(req.params || {}),
      accessToken,
    }
    const httpResponse = await controller.handle(request)
    res.status(httpResponse.statusCode).json(httpResponse.body)
  }
}
