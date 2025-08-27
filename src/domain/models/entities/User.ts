import { Date } from '../value-objects/Date'

export class User {
  private readonly _createdAt: Date
  private readonly _updatedAt: Date
  constructor(
    private readonly _id: number,
    private readonly _name: string,
    private readonly _email: string,
    private readonly _password: string,
    private readonly _phoneNumber: string,
    readonly createdAtString: string,
    readonly updatedAtString: string
  ) {
    this._createdAt = new Date(createdAtString)
    this._updatedAt = new Date(updatedAtString)
  }

  get id() {
    return this._id
  }

  get name() {
    return this._name
  }

  get email() {
    return this._email
  }

  get password() {
    return this._password
  }

  get phoneNumber() {
    return this._phoneNumber
  }

  get createdAt() {
    return this._createdAt
  }

  get updatedAt() {
    return this._updatedAt
  }

  toJson() {
    return {
      name: this.name,
      email: this.email,
      phoneNumber: this.phoneNumber,
      createdAt: this.createdAt.formattedDate,
      updatedAt: this.updatedAt.formattedDate,
    }
  }
}
