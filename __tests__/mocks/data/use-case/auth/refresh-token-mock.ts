import { IRefreshToken } from '../../../../../src/domain/use-cases/authentication/refresh-token'

export class RefreshTokenMock implements IRefreshToken {
  async refreshToken(request: IRefreshToken.Request): Promise<IRefreshToken.Response> {
    return {
      email: 'mock@example.com',
      name: 'Mock User',
      phoneNumber: '1234567890',
      accessToken: {
        expiresIn: 300,
        token: 'mockAccessToken',
      },
    }
  }
}
