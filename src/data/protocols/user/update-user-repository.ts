import { User } from '../../../domain/models/entities/User'

export interface UpdateUserRepository {
  updateUser: (request: UpdateUserRepository.Request) => Promise<UpdateUserRepository.Response>
}

export namespace UpdateUserRepository {
  export type Request = {
    id: User['id']
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
