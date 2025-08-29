import { User } from '../../../domain/models/entities/User'
import { IGetUser } from '../../../domain/use-cases/user/get-user'
import { GetUserByIdRepository } from '../../protocols/user/get-user-by-id'

export class GetUser implements IGetUser {
  constructor(readonly userRepository: GetUserByIdRepository) {}
  async getUser(request: IGetUser.Request): Promise<IGetUser.Response> {
    const user = await this.userRepository.getUserById({ id: request.id })
    if (!user) {
      throw null
    }
    return new User(user.id, user.name, user.email, user.password, user.phoneNumber, user.createdAt, user.updatedAt)
  }
}
