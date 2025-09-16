import { GetProductController } from '../../../../../../src/presentation/controllers/http/product/get-product-controller'
import { GetProductMock } from '../../../../../mocks/data/use-case/product/get-product-mock'

describe('GetProductController', () => {
  it('should return ok if product is found', async () => {
    const sut = new GetProductController(new GetProductMock())
    const response = await sut.handle({ id: 1 })
    expect(response.statusCode).toBe(200)
    expect(response.body).toStrictEqual({
      id: 1,
      name: 'any_name',
      price: 10,
      createdAt: '1998-01-01',
      updatedAt: '1998-01-01',
    })
  })

  it('should return not found if product is not found', async () => {
    const getProduct = new GetProductMock()
    jest.spyOn(getProduct, 'getProduct').mockResolvedValueOnce(null)
    const sut = new GetProductController(getProduct)
    const response = await sut.handle({ id: 1 })
    expect(response.statusCode).toBe(404)
  })

  it('should return server error when exception is throw', async () => {
    const getProduct = new GetProductMock()
    jest.spyOn(getProduct, 'getProduct').mockRejectedValueOnce(new Error('any_error'))
    const sut = new GetProductController(getProduct)
    const response = await sut.handle({ id: 1 })
    expect(response.statusCode).toBe(500)
  })
})
