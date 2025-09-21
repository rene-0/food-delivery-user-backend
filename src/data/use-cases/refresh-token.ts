import jwt from 'jsonwebtoken'
import { User } from '../../domain/models/entities/User'
import { IRefreshToken } from '../../domain/use-cases/authentication/refresh-token'

type JWTPayload = {
  email: User['email']
  name: User['name']
  phoneNumber: User['phoneNumber']
  iat: number
  exp: number
}

export class RefreshToken implements IRefreshToken {
  constructor() {}
  async refreshToken(request: IRefreshToken.Request): Promise<IRefreshToken.Response> {
    const expiresInSeconds = 60 * 60 // 1h
    let accessToken: string = null
    let user: JWTPayload
    jwt.verify(request.refreshToken, process.env.REFRESH_TOKEN, (err, JWTPayload: JWTPayload) => {
      if (err) {
        accessToken = null
      }
      user = JWTPayload
      delete user.iat
      delete user.exp
      accessToken = jwt.sign(user, process.env.SECRETE_TOKEN, { expiresIn: '1h' })
    })

    if (!accessToken || !user) {
      return null
    }

    return { ...user, accessToken: { token: accessToken, expiresIn: expiresInSeconds } }
  }
}
