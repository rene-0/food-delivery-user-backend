import { User } from '../../models/entities/User'

export interface IUpdateUser {
  updateUser(request: IUpdateUser.Request): Promise<IUpdateUser.Response>
}

export namespace IUpdateUser {
  export type Request = {
    id: string
    name?: string
    password?: string
    phoneNumber?: string
  }

  export type Response = User
}
