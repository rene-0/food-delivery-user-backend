import { Date } from '../value-objects/Date'

export class Product {
  private readonly _createdAt: Date
  private readonly _updatedAt: Date
  constructor(private readonly _id: string, private readonly _name: string, private readonly _price: number, _createdAtString: string, _updatedAtString: string) {
    this._createdAt = new Date(_createdAtString)
    this._updatedAt = new Date(_updatedAtString)
  }
  get id() {
    return this._id
  }
  get name() {
    return this._name
  }
  get price() {
    return this._price
  }
  get createdAt() {
    return this._createdAt
  }
  get updatedAt() {
    return this._updatedAt
  }

  toJson() {
    return {
      id: this.id,
      name: this.name,
      price: this.price,
      createdAt: this.createdAt.formattedDate,
      updatedAt: this.updatedAt.formattedDate,
    }
  }
}
