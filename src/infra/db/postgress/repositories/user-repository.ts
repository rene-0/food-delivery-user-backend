import { QueryTypes } from 'sequelize'
import { DoesAccountExistsRepository } from '../../../../data/protocols/authentication/does-account-exists'
import { CreateUserRepository } from '../../../../data/protocols/user/create-user-repository'
import { FindUserByEmailRepository } from '../../../../data/protocols/user/get-user-by-email'
import { GetUserByIdRepository } from '../../../../data/protocols/user/get-user-by-id'
import { UpdateUserRepository } from '../../../../data/protocols/user/update-user-repository'
import { SequelizeHelper } from '../helpers/sequelize-helper'

export class UserRepository implements FindUserByEmailRepository, DoesAccountExistsRepository, CreateUserRepository, UpdateUserRepository, GetUserByIdRepository {
  constructor(private readonly sequelize = SequelizeHelper.instance.sequelize) {}
  async getUserById(request: GetUserByIdRepository.Request): Promise<GetUserByIdRepository.Response> {
    const sql = `
      SELECT id, name, email, "phoneNumber", "createdAt", "updatedAt"
      FROM "Users"
      WHERE id = :id
    `
    const [user] = await this.sequelize.query<GetUserByIdRepository.Response>(sql, {
      replacements: { id: request.id },
      type: QueryTypes.SELECT,
    })
    return user
  }
  async updateUser(request: UpdateUserRepository.Request): Promise<UpdateUserRepository.Response> {
    const sql = `
      UPDATE "Users"
      SET
        name = COALESCE(:name, name),
        "phoneNumber" = COALESCE(:phoneNumber, "phoneNumber"),
        password = COALESCE(:password, password)
      WHERE id = :id
      RETURNING id, name, email, "phoneNumber", "createdAt", "updatedAt"
    `
    const [user] = await this.sequelize.query<UpdateUserRepository.Response>(sql, {
      replacements: {
        name: request.name ?? null,
        phoneNumber: request.phoneNumber ?? null,
        password: request.password ?? null,
        id: request.id,
      },
      type: QueryTypes.SELECT,
    })
    return user
  }
  async createUser(request: CreateUserRepository.Request): Promise<CreateUserRepository.Response> {
    const sql = `
      INSERT INTO "Users" (name, email, "phoneNumber", password)
      VALUES (:name, :email, :phoneNumber, :password)
      RETURNING id, name, email, "phoneNumber", "createdAt", "updatedAt"
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
			select id, name, email, u."phoneNumber", password, "createdAt", "updatedAt"
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
