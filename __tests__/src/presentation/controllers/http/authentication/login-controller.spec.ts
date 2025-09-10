import { LoginController } from '../../../../../../src/presentation/controllers/http/authentication/login-controller'
import { AuthenticationMock } from '../../../../../mocks/data/use-case/authentication-mock'

describe('Login controller', () => {
  it('should return unauthorized', async () => {
    const auth = new AuthenticationMock()
    jest.spyOn(auth, 'authenticate').mockResolvedValueOnce(null)
    const sut = new LoginController(auth)
    const response = await sut.handle({ email: 'any_email', password: 'any_password' })
    console.log(response)
    expect(response.statusCode).toBe(401)
  })
})
