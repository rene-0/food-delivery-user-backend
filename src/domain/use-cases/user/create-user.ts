import { User } from '../../models/entities/User'

export interface ICreateUser {
  createUser: (request: ICreateUser.Request) => Promise<ICreateUser.Response>
}

export namespace ICreateUser {
  export type Request = {
    name: User['name']
    email: User['email']
    password: User['password']
    phoneNumber: User['phoneNumber']
  }

  export type Response = User | null
}
