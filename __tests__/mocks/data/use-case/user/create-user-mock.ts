import { User } from '../../../../../src/domain/models/entities/User'
import { ICreateUser } from '../../../../../src/domain/use-cases/user/create-user'

export class CreateUserMock implements ICreateUser {
  async createUser(request: ICreateUser.Request): Promise<ICreateUser.Response> {
    return new User('any_id', 'any_name', 'any_email@hotmail.com', 'any_password', 'any_phoneNumber', '1998-01-01', '1998-01-01')
  }
}
