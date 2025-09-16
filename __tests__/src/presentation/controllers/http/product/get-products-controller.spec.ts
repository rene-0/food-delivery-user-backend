import { GetProductsController } from '../../../../../../src/presentation/controllers/http/product/get-products-controller'
import { GetProductsMock } from '../../../../../mocks/data/use-case/product/get-products-mock'

describe('GetProductsController', () => {
  it('should return ok if product is found', async () => {
    const sut = new GetProductsController(new GetProductsMock())
    const response = await sut.handle()
    expect(response.statusCode).toBe(200)
    expect(response.body).toStrictEqual([
      {
        id: 1,
        name: 'any_name',
        price: 10,
        createdAt: '1998-01-01',
        updatedAt: '1998-01-01',
      },
    ])
  })

  it('should return server error when exception is throw', async () => {
    const getProducts = new GetProductsMock()
    jest.spyOn(getProducts, 'getProducts').mockRejectedValueOnce(new Error('any_error'))
    const sut = new GetProductsController(getProducts)
    const response = await sut.handle()
    expect(response.statusCode).toBe(500)
  })
})
