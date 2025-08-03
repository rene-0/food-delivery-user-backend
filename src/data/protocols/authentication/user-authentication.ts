import { User } from 'domain/models/entities/User'

export interface AuthenticationRepository {
  authenticate: (request: AuthenticationRepository.Request) => Promise<AuthenticationRepository.Response>
}

export namespace AuthenticationRepository {
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
