import { GetOrdersController } from '../../../../../../src/presentation/controllers/http/order/get-orders-controller'
import { GetOrdersMock } from '../../../../../mocks/data/use-case/order/get-orders-mock'

describe('GetOrdersController', () => {
  it('should return ok if order is created', async () => {
    const sut = new GetOrdersController(new GetOrdersMock())
    const response = await sut.handle({ user: { id: 'any_user_id' } })
    expect(response.statusCode).toBe(200)
    expect(response.body).toStrictEqual([
      {
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
      },
    ])
  })

  it('should return server error when exception is throw', async () => {
    const getOrders = new GetOrdersMock()
    jest.spyOn(getOrders, 'getOrders').mockRejectedValueOnce(new Error('any_error'))
    const sut = new GetOrdersController(getOrders)
    const response = await sut.handle({ user: { id: 'any_user_id' } })
    expect(response.statusCode).toBe(500)
  })
})
