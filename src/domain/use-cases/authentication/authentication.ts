import { User } from '../../models/entities/User'

export interface IAuthentication {
  authenticate: (request: IAuthentication.Request) => Promise<IAuthentication.Response>
}

export namespace IAuthentication {
  export type Request = {
    email: string
    password: string
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
