import jwt, { JwtPayload } from 'jsonwebtoken'
import { User } from '../../domain/models/entities/User'
import { IRefreshToken } from '../../domain/use-cases/authentication/refresh-token'
import { GetUserByIdRepository } from '../protocols/user/get-user-by-id'

type UserData = {
  id: User['id']
  name: User['name']
  email: User['email']
  phoneNumber: User['phoneNumber']
  createdAt: string
  updatedAt: string
}

type JWTPayload = {
  id: User['id']
  email: User['email']
  name: User['name']
  phoneNumber: User['phoneNumber']
  iat: number
  exp: number
}

export class RefreshToken implements IRefreshToken {
  constructor(readonly userRepository: GetUserByIdRepository) {}
  async refreshToken(request: IRefreshToken.Request): Promise<IRefreshToken.Response> {
    const expiresInSeconds = 60 * 60 // 1h
    let tokenPayload: JwtPayload
    jwt.verify(request.refreshToken, process.env.REFRESH_TOKEN, async (err, JWTPayload: JWTPayload) => {
      if (err) {
        JWTPayload = null
      }
      tokenPayload = JWTPayload
    })

    if (!tokenPayload) {
      return null
    }

    const user = await this.userRepository.getUserById({ id: tokenPayload.id })

    if (!user) {
      return null
    }

    const accessToken = jwt.sign(user, process.env.SECRETE_TOKEN, { expiresIn: '1h' })

    if (!accessToken) {
      return null
    }

    return { ...user, accessToken: { token: accessToken, expiresIn: expiresInSeconds } }
  }
}
