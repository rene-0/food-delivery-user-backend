import { QueryTypes } from 'sequelize'
import { GetProductRepository } from '../../../../data/protocols/product/get-product'
import { GetProductsRepository } from '../../../../data/protocols/product/get-products-respository'
import { SequelizeHelper } from '../helpers/sequelize-helper'

export class ProductRepository implements GetProductRepository, GetProductsRepository {
  constructor(private readonly sequelize = SequelizeHelper.instance.sequelize) {}
  async getProducts(): Promise<GetProductsRepository.Response> {
    const sql = `
      select id, name, price, "createdAt", "updatedAt"
      from "Products"
    `
    const products = await this.sequelize.query<GetProductsRepository.Response[0]>(sql, {
      type: QueryTypes.SELECT,
    })
    return products
  }

  async getProduct(request: GetProductRepository.Request): Promise<GetProductRepository.Response> {
    const sql = `
      select id, name, price, "createdAt", "updatedAt"
      from "Products"
      where id = :productId
    `
    const product = await this.sequelize.query<GetProductRepository.Response>(sql, {
      replacements: { productId: request.productId },
      type: QueryTypes.SELECT,
    })
    return product[0]
  }
}
