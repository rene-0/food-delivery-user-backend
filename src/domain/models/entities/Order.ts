import { Date } from '../value-objects/Date'
import { OrderProduct } from './OrderProduct'
import { User } from './User'

export class Order {
  private _updatedAt: Date
  private _createdAt: Date
  constructor(
    private readonly _id: string,
    private readonly _status: 'canceled' | 'pending' | 'accepted' | 'done',
    private readonly _user: User,
    private readonly _orderProducts: OrderProduct[],
    createdAt: string,
    updatedAt: string
  ) {
    this._createdAt = new Date(createdAt)
    this._updatedAt = new Date(updatedAt)
  }

  get id() {
    return this._id
  }
  get status() {
    return this._status
  }
  get user() {
    return this._user
  }
  get orderProducts() {
    return this._orderProducts
  }
  get createdAt() {
    return this._createdAt
  }
  get updatedAt() {
    return this._updatedAt
  }

  toJson() {
    return {
      id: this._id,
      status: this._status,
      user: this._user.toJson(),
      products: this._orderProducts.map((orderProduct) => orderProduct.toJson()),
      createdAt: this._createdAt.formattedDate,
      updatedAt: this._updatedAt.formattedDate,
    }
  }
}
