import { User } from '../../../../../src/domain/models/entities/User'
import { IUpdateUser } from '../../../../../src/domain/use-cases/user/update-user'

export class UpdateUserMock implements IUpdateUser {
  async updateUser(request: IUpdateUser.Request): Promise<IUpdateUser.Response> {
    return new User('any_id', 'any_name', 'any_email', 'any_password', '1234567890', '1998-01-01', '1998-01-01')
  }
}
