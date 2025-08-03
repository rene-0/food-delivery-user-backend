import { User } from 'domain/models/entities/User'

export interface IAuthentication {
  authenticate: (request: IAuthentication.Request) => Promise<IAuthentication.Response>
}

export namespace IAuthentication {
  export type Request = {
    email: string
    password: string
  }

  export type Response = {
    name: User['name']
    email: User['email']
    phoneNumber: User['phoneNumber']
  }
}
