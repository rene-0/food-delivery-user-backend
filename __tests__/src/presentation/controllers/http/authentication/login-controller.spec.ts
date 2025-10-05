import { Request, Response } from 'express'
import { LoginController } from '../../../../../../src/presentation/controllers/http/authentication/login-controller'
import { AuthenticationMock } from '../../../../../mocks/data/use-case/auth/authentication-mock'

describe('Login controller', () => {
  const req = { body: { email: 'any_email', password: 'any_password' } } as Request
  const res = { status: jest.fn().mockReturnThis(), json: jest.fn(), cookie: jest.fn() } as unknown as Response

  it('should return unauthorized', async () => {
    const auth = new AuthenticationMock()
    jest.spyOn(auth, 'authenticate').mockResolvedValueOnce(null)
    const sut = new LoginController(req, res, auth)
    const response = await sut.handle({ email: 'any_email', password: 'any_password' })
    expect(response.statusCode).toBe(401)
  })

  it('should return ok', async () => {
    const sut = new LoginController(req, res, new AuthenticationMock())
    const response = await sut.handle({ email: 'any_email', password: 'any_password' })
    expect(response.statusCode).toBe(200)
  })

  it('should return server error when exception is throw', async () => {
    const auth = new AuthenticationMock()
    jest.spyOn(auth, 'authenticate').mockRejectedValueOnce(new Error('any_error'))
    const sut = new LoginController(req, res, auth)
    const response = await sut.handle({ email: 'any_email', password: 'any_password' })
    expect(response.statusCode).toBe(500)
  })
})
