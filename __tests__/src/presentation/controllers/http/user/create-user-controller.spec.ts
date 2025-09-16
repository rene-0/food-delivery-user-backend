import { CreateUserController } from '../../../../../../src/presentation/controllers/http/user/create-user-controller'
import { CreateUserMock } from '../../../../../mocks/data/use-case/user/create-user-mock'

describe('CreateUserController', () => {
  it('should return badRequest if validation fails', async () => {
    const sut = new CreateUserController(new CreateUserMock())
    const response = await sut.handle({} as unknown as any) // missing id
    expect(response.statusCode).toBe(400)
  })

  it('should return badRequest e-mail already exists', async () => {
    const createUser = new CreateUserMock()
    jest.spyOn(createUser, 'createUser').mockResolvedValueOnce(null)
    const sut = new CreateUserController(createUser)
    const response = await sut.handle({
      name: 'any_name',
      email: 'any_email@hotmail.com',
      password: 'any_password',
      phoneNumber: 'any_phoneNumber',
    })
    expect(response.statusCode).toBe(400)
  })

  it('should return ok if user is created', async () => {
    const sut = new CreateUserController(new CreateUserMock())
    const response = await sut.handle({
      name: 'any_name',
      email: 'any_email@hotmail.com',
      password: 'any_password',
      phoneNumber: 'any_phoneNumber',
    })
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
    const auth = new CreateUserMock()
    jest.spyOn(auth, 'createUser').mockRejectedValueOnce(new Error('any_error'))
    const sut = new CreateUserController(auth)
    const response = await sut.handle({
      name: 'any_name',
      email: 'any_email@hotmail.com',
      password: 'any_password',
      phoneNumber: 'any_phoneNumber',
    })
    expect(response.statusCode).toBe(500)
  })
})
