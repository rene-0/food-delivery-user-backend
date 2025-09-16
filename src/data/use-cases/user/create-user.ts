import argon2 from 'argon2'
import { User } from '../../../domain/models/entities/User'
import { ICreateUser } from '../../../domain/use-cases/user/create-user'
import { CreateUserRepository } from '../../protocols/user/create-user-repository'
import { FindUserByEmailRepository } from '../../protocols/user/get-user-by-email'

interface UserRepository extends CreateUserRepository, FindUserByEmailRepository {}

const PEPPER = process.env.PASSWORD_PEPPER ?? ''

export class CreateUser implements ICreateUser {
  constructor(readonly userRepository: UserRepository) {}
  async createUser(request: ICreateUser.Request): Promise<ICreateUser.Response> {
    const existingUser = await this.userRepository.findUserByEmail({ email: request.email })

    if (existingUser) {
      return null
    }

    const hashedPassword = await argon2.hash(PEPPER + request.password, {
      type: argon2.argon2id, // Argon2id: defesa contra GPU e side-channels
      memoryCost: 19456, // ~19 MB
      timeCost: 2, // iterações
      parallelism: 1, // threads
    })
    const user = await this.userRepository.createUser({
      name: request.name,
      email: request.email,
      password: hashedPassword,
      phoneNumber: request.phoneNumber,
    })
    return new User(user.id, user.name, user.email, user.password, user.phoneNumber, user.createdAt, user.updatedAt)
  }
}
