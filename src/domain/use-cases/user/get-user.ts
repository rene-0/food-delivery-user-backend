import { User } from '../../models/entities/User'

export interface IGetUser {
  getUser: (request: IGetUser.Request) => Promise<IGetUser.Response>
}

export namespace IGetUser {
  export type Request = {
    id: User['id']
  }

  export type Response = User | null
}
