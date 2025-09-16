import { User } from '../../../../../src/domain/models/entities/User'
import { IGetUser } from '../../../../../src/domain/use-cases/user/get-user'

export class GetUserMock implements IGetUser {
  async getUser(request: IGetUser.Request): Promise<IGetUser.Response> {
    return new User('any_id', 'any_name', 'any_email@hotmail.com', 'any_password', 'any_phoneNumber', '1998-01-01', '1998-01-01')
  }
}
