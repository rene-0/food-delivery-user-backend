import { User } from '../../models/entities/User'

export interface IRefreshToken {
  refreshToken: (request: IRefreshToken.Request) => Promise<IRefreshToken.Response>
}

export namespace IRefreshToken {
  export type Request = {
    refreshToken: string
  }

  type AccessToken = {
    token: string
    expiresIn: number
  }

  export type Response = {
    email: User['email']
    name: User['name']
    phoneNumber: User['phoneNumber']
    password?: never
    accessToken: AccessToken
  }
}
