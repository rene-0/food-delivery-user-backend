import { Request, Response } from 'express'
import { UpdateUserController } from '../../../../../../src/presentation/controllers/http/user/update-user-controller'
import { RefreshTokenMock } from '../../../../../mocks/data/use-case/auth/refresh-token-mock'
import { UpdateUserMock } from '../../../../../mocks/data/use-case/user/update-user-mock'

describe('UpdateUserController', () => {
  const req = { body: { email: 'any_email', password: 'any_password' }, cookies: { refreshToken: 'any_toke' } } as unknown as Request
  const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response

  const updateUser = new UpdateUserMock()
  const refreshToken = new RefreshTokenMock()

  it('should return badRequest if validation fails', async () => {
    const sut = new UpdateUserController(req, res, updateUser, refreshToken)
    const response = await sut.handle({} as unknown as any) // missing id
    expect(response.statusCode).toBe(400)
  })

  it('should return badRequest if user not found', async () => {
    const updateUser = new UpdateUserMock()
    jest.spyOn(updateUser, 'updateUser').mockResolvedValueOnce(null)
    const sut = new UpdateUserController(req, res, updateUser, refreshToken)
    const response = await sut.handle({ user: { id: '' } })
    expect(response.statusCode).toBe(400)
  })

  it('should return ok if user is updated', async () => {
    const sut = new UpdateUserController(req, res, updateUser, refreshToken)
    const response = await sut.handle({ user: { id: 'valid_id' }, name: 'any_name' })
    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      accessToken: {
        expiresIn: 300,
        token: 'mockAccessToken',
      },
      email: 'mock@example.com',
      name: 'Mock User',
      phoneNumber: '1234567890',
      // createdAt: '1998-01-01',
      // updatedAt: '1998-01-01',
    })
  })

  it('should return server error when exception is throw', async () => {
    const updateUserWithError = new UpdateUserMock()
    jest.spyOn(updateUserWithError, 'updateUser').mockRejectedValueOnce(new Error('any_error'))
    const sut = new UpdateUserController(req, res, updateUserWithError, refreshToken)
    const response = await sut.handle({ user: { id: 'valid_id' }, name: 'any_name' })
    expect(response.statusCode).toBe(500)
  })
})
