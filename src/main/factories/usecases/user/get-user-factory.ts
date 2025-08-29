import { GetUser } from '../../../../data/use-cases/user/get-user'
import { UserRepository } from '../../../../infra/db/postgress/repositories/user-repository'

export const makeGetUser = () => new GetUser(new UserRepository())
