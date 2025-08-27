import { CreateUser } from '../../../../data/use-cases/user/create-user'
import { UserRepository } from '../../../../infra/db/postgress/repositories/user-repository'

export const makeCreateUser = () => new CreateUser(new UserRepository())
