import { Product } from './Product'

export class OrderProduct {
  private readonly createdAt: Date
  private readonly updatedAt: Date

  constructor(
    private readonly _id: string,
    private readonly _orderId: string,
    private readonly _products: Product,
    private readonly _quantity: number,
    createdAt: string,
    updatedAt: string
  ) {
    this.createdAt = new Date(createdAt)
    this.updatedAt = new Date(updatedAt)
  }

  get id(): string {
    return this._id
  }

  get orderId(): string {
    return this._orderId
  }

  get products(): Product {
    return this._products
  }

  get quantity(): number {
    return this._quantity
  }

  get getCreatedAt(): Date {
    return this.createdAt
  }

  get getUpdatedAt(): Date {
    return this.updatedAt
  }

  toJson() {
    return {
      id: this._id,
      orderId: this._orderId,
      products: this._products.toJson(),
      quantity: this._quantity,
      createdAt: this.createdAt.toString(),
      updatedAt: this.updatedAt.toString(),
    }
  }
}
