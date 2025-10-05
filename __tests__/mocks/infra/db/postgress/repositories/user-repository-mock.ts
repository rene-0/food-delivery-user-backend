import { DoesAccountExistsRepository } from '../../../../../../src/data/protocols/authentication/does-account-exists'
import { CreateUserRepository } from '../../../../../../src/data/protocols/user/create-user-repository'
import { FindUserByEmailRepository } from '../../../../../../src/data/protocols/user/get-user-by-email'
import { GetUserByIdRepository } from '../../../../../../src/data/protocols/user/get-user-by-id'
import { UpdateUserRepository } from '../../../../../../src/data/protocols/user/update-user-repository'

export class UserRepositoryMock implements FindUserByEmailRepository, DoesAccountExistsRepository, CreateUserRepository, UpdateUserRepository, GetUserByIdRepository {
  async findUserByEmail(request: FindUserByEmailRepository.Request): Promise<FindUserByEmailRepository.Response> {
    return {
      id: 'any_id',
      name: 'any_name',
      email: 'any_email',
      password: 'any_password',
      phoneNumber: '1234567890',
    }
  }

  async doesItExists(request: DoesAccountExistsRepository.Request): Promise<DoesAccountExistsRepository.Response> {
    return false
  }

  async createUser(request: CreateUserRepository.Request): Promise<CreateUserRepository.Response> {
    return {
      id: 'any_id',
      name: 'any_name',
      email: 'any_email',
      password: 'any_password',
      phoneNumber: '1234567890',
      createdAt: 'any_createdAt',
      updatedAt: 'any_updatedAt',
    }
  }

  async updateUser(request: UpdateUserRepository.Request): Promise<UpdateUserRepository.Response> {
    return {
      id: 'any_id',
      name: 'any_name',
      email: 'any_email',
      password: 'any_password',
      phoneNumber: '1234567890',
      createdAt: 'any_createdAt',
      updatedAt: 'any_updatedAt',
    }
  }

  async getUserById(request: GetUserByIdRepository.Request): Promise<GetUserByIdRepository.Response> {
    return null
  }
}
