import { CreateOrderController } from '../../../../../../src/presentation/controllers/http/order/create-order-controller'
import { CreateOrderMock } from '../../../../../mocks/data/use-case/order/create-order-mock'

describe('CreateOrderController', () => {
  it('should return badRequest if validation fails', async () => {
    const sut = new CreateOrderController(new CreateOrderMock())
    const response = await sut.handle({} as unknown as any)
    expect(response.statusCode).toBe(400)
  })

  it('should return ok if order is created', async () => {
    const sut = new CreateOrderController(new CreateOrderMock())
    const response = await sut.handle({
      user: { id: 'any_user_id' },
      products: [{ id: 'any_product_id', quantity: 1 }],
    })
    expect(response.statusCode).toBe(200)
    expect(response.body).toStrictEqual({
      createdAt: '1998-01-01',
      id: 'any_id',
      products: [],
      status: 'done',
      updatedAt: '1998-01-01',
      user: {
        createdAt: '1998-01-01',
        email: 'any_email',
        name: 'any_name',
        phoneNumber: 'any_phone_number',
        updatedAt: '1998-01-01',
      },
    })
  })

  it('should return server error when exception is throw', async () => {
    const auth = new CreateOrderMock()
    jest.spyOn(auth, 'createOrder').mockRejectedValueOnce(new Error('any_error'))
    const sut = new CreateOrderController(auth)
    const response = await sut.handle({
      user: { id: 'any_user_id' },
      products: [{ id: 'any_product_id', quantity: 1 }],
    })
    expect(response.statusCode).toBe(500)
  })
})
