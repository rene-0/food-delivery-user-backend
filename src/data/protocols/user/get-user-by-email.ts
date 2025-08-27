import { User } from '../../../domain/models/entities/User'

export interface FindUserByEmailRepository {
  findUserByEmail: (request: FindUserByEmailRepository.Request) => Promise<FindUserByEmailRepository.Response>
}

export namespace FindUserByEmailRepository {
  export type Request = {
    email: string
  }

  export type Response = {
    name: User['name']
    email: User['email']
    password: User['password']
    phoneNumber: User['phoneNumber']
  }
}
