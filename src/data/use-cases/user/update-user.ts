import argon2 from 'argon2'
import { User } from '../../../domain/models/entities/User'
import { IUpdateUser } from '../../../domain/use-cases/user/update-user'
import { GetUserByIdRepository } from '../../protocols/user/get-user-by-id'
import { UpdateUserRepository } from '../../protocols/user/update-user-repository'

interface UserRepository extends UpdateUserRepository, GetUserByIdRepository {}

const PEPPER = process.env.PASSWORD_PEPPER ?? ''

export class UpdateUser implements IUpdateUser {
  constructor(readonly userRepository: UserRepository) {}
  async updateUser(request: IUpdateUser.Request): Promise<IUpdateUser.Response> {
    const existingUser = await this.userRepository.getUserById({ id: request.id })

    if (!existingUser) {
      return null
    }

    const completeUser = { ...existingUser, ...request }
    if ('password' in request) {
      completeUser.password = await argon2.hash(PEPPER + request.password, {
        type: argon2.argon2id, // Argon2id: defesa contra GPU e side-channels
        memoryCost: 19456, // ~19 MB
        timeCost: 2, // iterações
        parallelism: 1, // threads
      })
    }
    const user = await this.userRepository.updateUser(completeUser)
    return new User(user.id, user.name, user.email, user.password, user.phoneNumber, user.createdAt, user.updatedAt)
  }
}
