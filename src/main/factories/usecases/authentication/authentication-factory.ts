import { Authentication } from 'data/use-cases/authentication'
import { SequelizeHelper } from 'infra/db/postgress/helpers/sequelize-helper'
import { UserRepository } from 'infra/db/postgress/repositories/user-repository'

export const makeAuthentication = () => {
  const authenticationRepository = new UserRepository(SequelizeHelper.instance.sequelize)
  return new Authentication(authenticationRepository)
}
