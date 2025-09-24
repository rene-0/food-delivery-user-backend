import { RefreshToken } from '../../../../data/use-cases/refresh-token'
import { UserRepository } from '../../../../infra/db/postgress/repositories/user-repository'

export const makeRefreshToken = () => new RefreshToken(new UserRepository())
