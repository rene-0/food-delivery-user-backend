import { UpdateUser } from '../../../../data/use-cases/user/update-user'
import { UserRepository } from '../../../../infra/db/postgress/repositories/user-repository'

export const makeUpdateUser = () => new UpdateUser(new UserRepository())
