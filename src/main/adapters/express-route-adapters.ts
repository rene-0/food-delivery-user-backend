import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { Controller } from '../../presentation/protocols/controller'

export const adaptRoute = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const accessToken = req?.headers['Authorization'] || req?.headers['authorization']
    let decodedToken = {}
    if (accessToken) {
      const accessTokenWithoutBearer = Array.isArray(accessToken) ? accessToken[0].split(' ')[1] : accessToken.split(' ')[1]
      jwt.verify(accessTokenWithoutBearer, process.env.SECRETE_TOKEN, (error, decoded): void => {
        decodedToken = decoded
      })
    }
    const request = {
      ...(req.body || {}),
      ...(req.params || {}),
      user: {
        accessToken,
        ...decodedToken,
      },
    }
    const httpResponse = await controller.handle(request)
    res.status(httpResponse.statusCode).json(httpResponse.body)
  }
}
