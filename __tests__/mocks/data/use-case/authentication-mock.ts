import { IAuthentication } from '../../../../src/domain/use-cases/authentication/authentication'

export class AuthenticationMock implements IAuthentication {
  async authenticate(request: IAuthentication.Request): Promise<IAuthentication.Response> {
    return {
      name: 'Any name',
      email: 'email@email.com',
      accessToken: {
        token: 'any_token',
        expiresIn: 3600,
      },
    }
  }
}
