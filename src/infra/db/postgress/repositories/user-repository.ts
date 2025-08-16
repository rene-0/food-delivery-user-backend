import { QueryTypes } from 'sequelize'
import { DoesAccountExistsRepository } from '../../../../data/protocols/authentication/does-account-exists'
import { AuthenticationRepository } from '../../../../data/protocols/authentication/user-authentication'
import { SequelizeHelper } from '../helpers/sequelize-helper'

export class UserRepository implements AuthenticationRepository, DoesAccountExistsRepository {
  constructor(private readonly sequelize = SequelizeHelper.instance.sequelize) {}
  async doesItExists({ email }: DoesAccountExistsRepository.Request): Promise<DoesAccountExistsRepository.Response> {
    const sql = `
			select 1
			from "Users" u
			where email = :email
		`
    const user = await this.sequelize.query<AuthenticationRepository.Response>(sql, {
      replacements: { email },
      type: QueryTypes.SELECT,
    })

    return user.length > 0
  }

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
