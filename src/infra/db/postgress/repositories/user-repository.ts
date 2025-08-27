import { QueryTypes } from 'sequelize'
import { DoesAccountExistsRepository } from '../../../../data/protocols/authentication/does-account-exists'
import { CreateUserRepository } from '../../../../data/protocols/user/create-user-repository'
import { FindUserByEmailRepository } from '../../../../data/protocols/user/get-user-by-email'
import { SequelizeHelper } from '../helpers/sequelize-helper'

export class UserRepository implements FindUserByEmailRepository, DoesAccountExistsRepository, CreateUserRepository {
  constructor(private readonly sequelize = SequelizeHelper.instance.sequelize) {}
  async createUser(request: CreateUserRepository.Request): Promise<CreateUserRepository.Response> {
    const sql = `
      INSERT INTO "Users" (name, email, "phoneNumber", password)
      VALUES (:name, :email, :phoneNumber, :password)
      RETURNING id, name, email, "phoneNumber"
    `
    const [user] = await this.sequelize.query<CreateUserRepository.Response>(sql, {
      replacements: {
        name: request.name,
        email: request.email,
        phoneNumber: request.phoneNumber,
        password: request.password,
      },
      type: QueryTypes.SELECT,
    })
    return user
  }
  async doesItExists({ email }: DoesAccountExistsRepository.Request): Promise<DoesAccountExistsRepository.Response> {
    const sql = `
			select 1
			from "Users" u
			where email = :email
		`
    const user = await this.sequelize.query<FindUserByEmailRepository.Response>(sql, {
      replacements: { email },
      type: QueryTypes.SELECT,
    })

    return user.length > 0
  }

  async findUserByEmail({ email }: FindUserByEmailRepository.Request): Promise<FindUserByEmailRepository.Response> {
    const sql = `
			select name, email, u."phoneNumber", password
			from "Users" u
			where email = :email
		`
    const user = await this.sequelize.query<FindUserByEmailRepository.Response>(sql, {
      replacements: { email },
      type: QueryTypes.SELECT,
    })

    return user[0]
  }
}
