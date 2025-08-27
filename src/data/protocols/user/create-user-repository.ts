import { User } from '../../../domain/models/entities/User'

export interface CreateUserRepository {
  createUser: (request: CreateUserRepository.Request) => Promise<CreateUserRepository.Response>
}

export namespace CreateUserRepository {
  export type Request = {
    name: User['name']
    email: User['email']
    password: User['password']
    phoneNumber: User['phoneNumber']
  }

  export type Response = {
    id: User['id']
    name: User['name']
    email: User['email']
    password: User['password']
    phoneNumber: User['phoneNumber']
    createdAt: string
    updatedAt: string
  }
}
