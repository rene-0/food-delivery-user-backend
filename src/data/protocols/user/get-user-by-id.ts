import { User } from '../../../domain/models/entities/User'

export interface GetUserByIdRepository {
  getUserById: (request: GetUserByIdRepository.Request) => Promise<GetUserByIdRepository.Response>
}

export namespace GetUserByIdRepository {
  export type Request = {
    id: string
  }

  export type Response = {
    name: User['name']
    email: User['email']
    password: User['password']
    phoneNumber: User['phoneNumber']
  }
}
