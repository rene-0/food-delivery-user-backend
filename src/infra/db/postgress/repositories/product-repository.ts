import { QueryTypes } from 'sequelize'
import { GetProductRepository } from '../../../../data/protocols/product/get-product'
import { SequelizeHelper } from '../helpers/sequelize-helper'

export class ProductRepository implements GetProductRepository {
  constructor(private readonly sequelize = SequelizeHelper.instance.sequelize) {}
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
