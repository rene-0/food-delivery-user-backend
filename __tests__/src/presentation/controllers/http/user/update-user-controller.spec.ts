import { UpdateUserController } from '../../../../../../src/presentation/controllers/http/user/update-user-controller'
import { UpdateUserMock } from '../../../../../mocks/data/use-case/user/update-user-mock'

describe('UpdateUserController', () => {
  it('should return badRequest if validation fails', async () => {
    const sut = new UpdateUserController(new UpdateUserMock())
    const response = await sut.handle({} as unknown as any) // missing id
    expect(response.statusCode).toBe(400)
  })

  it('should return badRequest if user not found', async () => {
    const updateUser = new UpdateUserMock()
    jest.spyOn(updateUser, 'updateUser').mockResolvedValueOnce(null)
    const sut = new UpdateUserController(updateUser)
    const response = await sut.handle({ id: 'not_found' })
    expect(response.statusCode).toBe(400)
  })

  it('should return ok if user is updated', async () => {
    const sut = new UpdateUserController(new UpdateUserMock())
    const response = await sut.handle({ id: 'valid_id', name: 'Test' })
    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      name: 'any_name',
      email: 'any_email',
      phoneNumber: '1234567890',
      createdAt: '1998-01-01',
      updatedAt: '1998-01-01',
    })
  })
})
