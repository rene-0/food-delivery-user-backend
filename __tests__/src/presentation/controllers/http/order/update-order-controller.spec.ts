import { UpdateOrderController } from '../../../../../../src/presentation/controllers/http/order/update-order-controller'
import { UpdateOrderMock } from '../../../../../mocks/data/use-case/order/update-order-mock'

describe('UpdateOrderController', () => {
  it('should return badRequest if validation fails', async () => {
    const sut = new UpdateOrderController(new UpdateOrderMock())
    const response = await sut.handle({} as unknown as any)
    expect(response.statusCode).toBe(400)
  })

  it('should return ok if order is updated', async () => {
    const sut = new UpdateOrderController(new UpdateOrderMock())
    const response = await sut.handle({
      user: { id: 'any_user_id' },
      orderId: 'any_order_id',
      status: 'canceled',
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
    const updateOrder = new UpdateOrderMock()
    jest.spyOn(updateOrder, 'updateOrder').mockRejectedValueOnce(new Error('any_error'))
    const sut = new UpdateOrderController(updateOrder)
    const response = await sut.handle({
      user: { id: 'any_user_id' },
      orderId: 'any_order_id',
      status: 'canceled',
    })
    expect(response.statusCode).toBe(500)
  })
})
