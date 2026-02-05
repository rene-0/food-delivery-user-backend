import { Date } from '../value-objects/Date'
import { Ingredient } from './Ingredient'

export class Product {
  private readonly _createdAt: Date
  private readonly _updatedAt: Date
  constructor(
    private readonly _id: string,
    private readonly _name: string,
    private readonly _price: number,
    private readonly _ingredients: Ingredient[],
    _createdAtString: string,
    _updatedAtString: string
  ) {
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
  get ingredients() {
    return this._ingredients
  }
  get createdAt() {
    return this._createdAt
  }
  get updatedAt() {
    return this._updatedAt
  }

  toJson() {
    console.log('this.ingredients', this.ingredients)
    return {
      id: this.id,
      name: this.name,
      price: this.price,
      ingredients: this.ingredients.map((ingredient) => ingredient.toJson()),
      createdAt: this.createdAt.formattedDate,
      updatedAt: this.updatedAt.formattedDate,
    }
  }
}
