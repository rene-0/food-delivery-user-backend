import { QueryTypes } from 'sequelize'
import { GetProductRepository } from '../../../../data/protocols/product/get-product-repository'
import { GetProductsRepository } from '../../../../data/protocols/product/get-products-respository'
import { SequelizeHelper } from '../helpers/sequelize-helper'

export class ProductRepository implements GetProductRepository, GetProductsRepository {
  constructor(private readonly sequelize = SequelizeHelper.instance.sequelize) {}
  async getProducts(): Promise<GetProductsRepository.Response> {
    const sql = `
      select
        p.id,
        p.name,
        p.price,
        i.id as "ingredient.id",
        i.name as "ingredient.name",
        i."createdAt" as "ingredient.createdAt",
        i."updatedAt" as "ingredient.updatedAt",
        p."createdAt",
        p."updatedAt"
      from "Products" p
      inner join "ProductIngredients" pi on (pi."productId" = p.id)
      inner join "Ingredients" i on (i.id = pi."ingredientId")
    `
    const products = await this.sequelize.query<GetProductsRepository.QueryResponse>(sql, {
      type: QueryTypes.SELECT,
      nest: true,
    })

    if (!products || !Array.isArray(products) || products.length === 0) {
      return []
    }

    const productsMap = new Map<string, GetProductsRepository.Response[number]>()
    for (const row of products) {
      const productId = row.id
      if (!productsMap.has(productId)) {
        productsMap.set(productId, {
          id: row.id,
          name: row.name,
          price: row.price,
          ingredients: [],
          createdAt: row.createdAt,
          updatedAt: row.updatedAt,
        })
      }
      productsMap.get(productId).ingredients.push({
        id: row.ingredient.id,
        name: row.ingredient.name,
        createdAt: row.ingredient.createdAt,
        updatedAt: row.ingredient.updatedAt,
      })
    }

    return Array.from(productsMap.values())
  }

  async getProduct(request: GetProductRepository.Request): Promise<GetProductRepository.Response> {
    const sql = `
      select
        p.id,
        p.name,
        p.price,
        i.id as "ingredient.id",
        i.name as "ingredient.name",
        i."createdAt" as "ingredient.createdAt",
        i."updatedAt" as "ingredient.updatedAt",
        p."createdAt",
        p."updatedAt"
      from "Products" p
      inner join "ProductIngredients" pi on (pi."productId" = p.id)
      inner join "Ingredients" i on (i.id = pi."ingredientId")
      where p.id = :productId
    `
    const product = await this.sequelize.query<GetProductRepository.QueryResponse>(sql, {
      replacements: { productId: request.productId },
      type: QueryTypes.SELECT,
      nest: true,
    })
    if (!product || !Array.isArray(product) || product.length === 0) {
      return undefined
    }

    const productsMap = new Map<string, GetProductRepository.Response[][number]>()
    for (const row of product) {
      const productId = row.id
      if (!productsMap.has(productId)) {
        productsMap.set(productId, {
          id: row.id,
          name: row.name,
          price: row.price,
          ingredients: [],
          createdAt: row.createdAt,
          updatedAt: row.updatedAt,
        })
      }
      productsMap.get(productId).ingredients.push({
        id: row.ingredient.id,
        name: row.ingredient.name,
        createdAt: row.ingredient.createdAt,
        updatedAt: row.ingredient.updatedAt,
      })
    }

    return productsMap.values()[0]
  }
}
