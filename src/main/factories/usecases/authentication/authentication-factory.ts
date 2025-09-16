import { Authentication } from '../../../../data/use-cases/authentication'
import { UserRepository } from '../../../../infra/db/postgress/repositories/user-repository'

export const makeAuthentication = () => new Authentication(new UserRepository())
