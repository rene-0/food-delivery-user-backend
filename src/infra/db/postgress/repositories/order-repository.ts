import { QueryTypes } from 'sequelize'
import { CreateOrderRepository } from '../../../../data/protocols/order/create-order-repository'
import { GetOrderRepository } from '../../../../data/protocols/order/get-order-repository'
import { GetOrdersRepository } from '../../../../data/protocols/order/get-orders-repository'
import { UpdateOrderRepository } from '../../../../data/protocols/order/update-order-repository'
import { SequelizeHelper } from '../helpers/sequelize-helper'

export class OrderRepository implements CreateOrderRepository, GetOrderRepository, GetOrdersRepository, UpdateOrderRepository {
  constructor(private readonly sequelize = SequelizeHelper.instance.sequelize) {}
  async updateOrder(request: UpdateOrderRepository.Request): Promise<UpdateOrderRepository.Response> {
    const [order] = await this.sequelize.query<{ id: string }>(
      `UPDATE "Orders"
         SET status = :status, "updatedAt" = NOW()
         WHERE id = :orderId AND "userId" = :userId
         RETURNING id
         `,
      {
        replacements: {
          orderId: request.orderId,
          status: request.status,
          userId: request.userId,
        },
        type: QueryTypes.SELECT,
      },
    )
    return order?.id
  }

  async getOrders(request: GetOrdersRepository.Request): Promise<GetOrdersRepository.Response> {
    const orders = await this.sequelize.query<GetOrdersRepository.QueryResponse>(
      `SELECT
          o.id as "order.id",
          o.status as "order.status",
          o."createdAt" as "order.createdAt",
          o."updatedAt" as "order.updatedAt",
          op.id as "orderProduct.id",
          op.quantity as "orderProduct.quantity",
          i.id as "orderProduct.ingredient.id",
          i.name as "orderProduct.ingredient.name",
          i."createdAt" as "orderProduct.ingredient.createdAt",
          i."updatedAt" as "orderProduct.ingredient.updatedAt",
          op."createdAt" as "orderProduct.createdAt",
          op."updatedAt" as "orderProduct.updatedAt",
          p.id as "product.id",
          p.name as "product.name",
          p.price as "product.price",
          p."createdAt" as "product.createdAt",
          p."updatedAt" as "product.updatedAt",
          u.id as "user.id",
          u.name as "user.name",
          u.email as "user.email",
          u."phoneNumber" as "user.phoneNumber",
          u."createdAt" as "user.createdAt",
          u."updatedAt" as "user.updatedAt"
        FROM "Orders" o
        INNER JOIN "OrderProducts" op ON o.id = op."orderId"
        INNER JOIN "Products" p ON p.id = op."productId"
        INNER JOIN "Users" u ON u.id = o."userId"
        INNER JOIN "OrderProductsIngredients" opi ON op.id = opi."orderProductId"  
        INNER JOIN "Ingredients" i ON i.id = opi."ingredientId"
        WHERE o."userId" = :userId
        ORDER BY o."createdAt" DESC`,
      {
        replacements: request.userId ? { userId: request.userId } : {},
        type: QueryTypes.SELECT,
        nest: true,
      },
    )

    if (!orders || !Array.isArray(orders) || orders.length === 0) {
      return []
    }

    // Group by order.id
    const orderMap = new Map<
      string,
      Omit<GetOrdersRepository.Response[number], 'orderProducts'> & { orderProducts: Map<string, GetOrdersRepository.Response[number]['orderProducts'][number]> }
    >()
    for (const row of orders) {
      const orderId = row.order.id
      if (!orderMap.has(orderId)) {
        const orderProductsMap = new Map<string, GetOrdersRepository.Response[number]['orderProducts'][number]>()
        orderMap.set(orderId, {
          id: row.order.id,
          status: row.order.status,
          user: row.user,
          orderProducts: orderProductsMap,
          createdAt: row.order.createdAt,
          updatedAt: row.order.updatedAt,
        })
      }
      const orderProductId = row.orderProduct.id
      if (!orderMap.get(orderId).orderProducts.has(orderProductId)) {
        orderMap.get(orderId).orderProducts.set(orderProductId, {
          id: row.orderProduct.id,
          product: { ...row.product, ingredients: [] },
          quantity: row.orderProduct.quantity,
          createdAt: row.orderProduct.createdAt,
          updatedAt: row.orderProduct.updatedAt,
        })
      }
      orderMap.get(orderId).orderProducts.get(orderProductId).product.ingredients.push({
        id: row.orderProduct.ingredient.id,
        name: row.orderProduct.ingredient.name,
        createdAt: row.orderProduct.ingredient.createdAt,
        updatedAt: row.orderProduct.ingredient.updatedAt,
      })
    }

    const ret = Array.from(orderMap.values()).map((order) => ({ ...order, orderProducts: Array.from(order.orderProducts.values()) }))
    return ret
  }
  async getOrder(request: GetOrderRepository.Request): Promise<GetOrderRepository.Response> {
    const orders = await this.sequelize.query<GetOrderRepository.QueryResponse>(
      `SELECT
          o.id as "order.id",
          o.status as "order.status",
          o."createdAt" as "order.createdAt",
          o."updatedAt" as "order.updatedAt",
          op.id as "orderProduct.id",
          op.quantity as "orderProduct.quantity",
          i.id as "orderProduct.ingredient.id",
          i.name as "orderProduct.ingredient.name",
          i."createdAt" as "orderProduct.ingredient.createdAt",
          i."updatedAt" as "orderProduct.ingredient.updatedAt",
          op."createdAt" as "orderProduct.createdAt",
          op."updatedAt" as "orderProduct.updatedAt",
          p.id as "product.id",
          p.name as "product.name",
          p.price as "product.price",
          p."createdAt" as "product.createdAt",
          p."updatedAt" as "product.updatedAt",
          u.id as "user.id",
          u.name as "user.name",
          u.email as "user.email",
          u."phoneNumber" as "user.phoneNumber",
          u."createdAt" as "user.createdAt",
          u."updatedAt" as "user.updatedAt"
        FROM "Orders" o
        INNER JOIN "OrderProducts" op ON o.id = op."orderId"
        INNER JOIN "Products" p ON p.id = op."productId"
        INNER JOIN "Users" u ON u.id = o."userId"
        INNER JOIN "OrderProductsIngredients" opi ON op.id = opi."orderProductId"  
        INNER JOIN "Ingredients" i ON i.id = opi."ingredientId"
         WHERE o.id = :orderId`,
      {
        replacements: { orderId: request.orderId },
        type: QueryTypes.SELECT,
        nest: true,
      },
    )

    if (!orders) {
      return null
    }

    if (!Array.isArray(orders)) {
      return null
    }

    const order = orders[0]

    const orderProductsMap = new Map<string, GetOrderRepository.Response['orderProducts'][number]>()

    const orderResponse: GetOrderRepository.Response = {
      id: order.order.id,
      status: order.order.status,
      user: order.user,
      orderProducts: [],
      createdAt: order.order.createdAt,
      updatedAt: order.order.updatedAt,
    }

    for (const order of orders) {
      const orderProductId = order.orderProduct.id
      if (!orderProductsMap.has(orderProductId)) {
        orderProductsMap.set(orderProductId, {
          id: order.orderProduct.id,
          product: { ...order.product, ingredients: [] },
          // ingredients: [],
          quantity: order.orderProduct.quantity,
          createdAt: order.orderProduct.createdAt,
          updatedAt: order.orderProduct.updatedAt,
        })
      }
      orderProductsMap.get(orderProductId).product.ingredients.push({
        id: order.orderProduct.ingredient.id,
        name: order.orderProduct.ingredient.name,
        createdAt: order.orderProduct.ingredient.createdAt,
        updatedAt: order.orderProduct.ingredient.updatedAt,
      })
    }

    orderResponse.orderProducts = Array.from(orderProductsMap.values())
    return orderResponse
  }

  async createOrder(request: CreateOrderRepository.Request): Promise<CreateOrderRepository.Response> {
    const transaction = await this.sequelize.transaction()
    try {
      // Insert order
      const [order] = await this.sequelize.query<{ id: string }>(
        `INSERT INTO "Orders" (status, "userId", "createdAt", "updatedAt")
         VALUES (:status, :userId, NOW(), NOW())
         RETURNING id`,
        {
          replacements: {
            userId: request.userId,
            status: request.status,
          },
          type: QueryTypes.SELECT,
          transaction,
        },
      )

      // Insert order items
      for (const item of request.products) {
        const [orderProduct] = await this.sequelize.query<{ id: string }>(
          `INSERT INTO "OrderProducts" ("orderId", "productId", quantity, "createdAt", "updatedAt")
           VALUES (:orderId, :productId, :quantity, NOW(), NOW())
           RETURNING id`,
          {
            replacements: {
              orderId: order.id,
              productId: item.id,
              quantity: item.quantity,
            },
            type: QueryTypes.SELECT,
            transaction,
          },
        )
        for (const ingredientId of item.ingredientIds) {
          await this.sequelize.query(
            `INSERT INTO "OrderProductsIngredients"
              ("orderProductId", "ingredientId", "createdAt", "updatedAt")
              VALUES (:orderProductId, :ingredientId, NOW(), NOW())`,
            {
              replacements: {
                orderProductId: orderProduct.id,
                ingredientId,
              },
              type: QueryTypes.INSERT,
              transaction,
            },
          )
        }
      }

      await transaction.commit()

      return {
        id: order.id,
      }
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }
}
