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
      }
    )
    return { id: order.id }
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
         WHERE o."userId" = :userId
         ORDER BY o."createdAt" DESC`,
      {
        replacements: request.userId ? { userId: request.userId } : {},
        type: QueryTypes.SELECT,
        nest: true,
      }
    )

    if (!orders || !Array.isArray(orders) || orders.length === 0) {
      return []
    }

    // Group by order.id
    const orderMap = new Map<string, GetOrdersRepository.Response[number]>()
    for (const row of orders) {
      const orderId = row.order.id
      if (!orderMap.has(orderId)) {
        orderMap.set(orderId, {
          id: row.order.id,
          status: row.order.status,
          user: row.user,
          orderProducts: [],
          createdAt: row.order.createdAt,
          updatedAt: row.order.updatedAt,
        })
      }
      orderMap.get(orderId).orderProducts.push({
        id: row.orderProduct.id,
        product: row.product,
        quantity: row.orderProduct.quantity,
        createdAt: row.orderProduct.createdAt,
        updatedAt: row.orderProduct.updatedAt,
      })
    }

    return Array.from(orderMap.values())
  }
  async getOrder(request: GetOrderRepository.Request): Promise<GetOrderRepository.Response> {
    const order = await this.sequelize.query<GetOrderRepository.QueryResponse>(
      `SELECT
          o.id as "order.id",
          o.status as "order.status",
          o."createdAt" as "order.createdAt",
          o."updatedAt" as "order.updatedAt",
          op.id as "orderProduct.id",
          op.quantity as "orderProduct.quantity",
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
         WHERE o.id = :orderId`,
      {
        replacements: { orderId: request.orderId },
        type: QueryTypes.SELECT,
        nest: true,
      }
    )

    if (!order) {
      return null
    }

    if (!Array.isArray(order)) {
      return null
    }

    const orderResponse: GetOrderRepository.Response = {
      id: order[0].order.id,
      status: order[0].order.status,
      user: order[0].user,
      orderProducts: order.map((order) => ({
        id: order.orderProduct.id,
        product: order.product,
        quantity: order.orderProduct.quantity,
        createdAt: order.orderProduct.createdAt,
        updatedAt: order.orderProduct.updatedAt,
      })),
      createdAt: order[0].order.createdAt,
      updatedAt: order[0].order.updatedAt,
    }

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
        }
      )

      // Insert order items
      for (const item of request.products) {
        await this.sequelize.query(
          `INSERT INTO "OrderProducts" ("orderId", "productId", quantity, "createdAt", "updatedAt")
           VALUES (:orderId, :productId, :quantity, NOW(), NOW())`,
          {
            replacements: {
              orderId: order.id,
              productId: item.id,
              quantity: item.quantity,
            },
            type: QueryTypes.INSERT,
            transaction,
          }
        )
      }

      await transaction.commit()

      return {
        id: order.id,
      }
    } catch (error) {
      console.log(error)
      await transaction.rollback()
      throw error
    }
  }
}
