import { Date } from '../value-objects/Date'

export class User {
  private readonly createdAt: Date
  private readonly updatedAt: Date
  constructor(
    readonly id: number,
    readonly name: string,
    readonly email: string,
    readonly password: string,
    readonly phoneNumber: string,
    readonly createdAtString: string,
    readonly updatedAtString: string
  ) {
    this.createdAt = new Date(createdAtString)
    this.updatedAt = new Date(updatedAtString)
  }
}
