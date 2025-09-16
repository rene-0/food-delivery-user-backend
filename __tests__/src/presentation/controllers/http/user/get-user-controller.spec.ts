import { GetUserController } from '../../../../../../src/presentation/controllers/http/user/get-user-controller'
import { GetUserMock } from '../../../../../mocks/data/use-case/user/get-user-mock'

describe('GetUserController', () => {
  it('should return badRequest if user not found', async () => {
    const getUser = new GetUserMock()
    jest.spyOn(getUser, 'getUser').mockResolvedValueOnce(null)
    const sut = new GetUserController(getUser)
    const response = await sut.handle({ id: 'any_id' })
    expect(response.statusCode).toBe(400)
  })

  it('should return ok if user is found', async () => {
    const sut = new GetUserController(new GetUserMock())
    const response = await sut.handle({ id: 'any_id' })
    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      name: 'any_name',
      email: 'any_email@hotmail.com',
      phoneNumber: 'any_phoneNumber',
      createdAt: '1998-01-01',
      updatedAt: '1998-01-01',
    })
  })

  it('should return server error when exception is throw', async () => {
    const auth = new GetUserMock()
    jest.spyOn(auth, 'getUser').mockRejectedValueOnce(new Error('any_error'))
    const sut = new GetUserController(auth)
    const response = await sut.handle({ id: 'any_id' })
    expect(response.statusCode).toBe(500)
  })
})
