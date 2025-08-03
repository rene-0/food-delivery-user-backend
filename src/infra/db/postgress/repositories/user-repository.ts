import { AuthenticationRepository } from 'data/protocols/authentication/user-authentication'
import { QueryTypes } from 'sequelize'
import { SequelizeHelper } from '../helpers/sequelize-helper'

export class UserRepository implements AuthenticationRepository {
  constructor(private readonly sequelize = SequelizeHelper.instance.sequelize) {}
  async authenticate({ password, email }: AuthenticationRepository.Request): Promise<AuthenticationRepository.Response> {
    const sql = `
			select name, email, u."phoneNumber"
			from "Users" u
			where email = :email and u."password" = :password
		`
    const user = await this.sequelize.query<AuthenticationRepository.Response>(sql, {
      replacements: { email, password },
      type: QueryTypes.SELECT,
    })

    return user[0]
  }
}
