import { DoesAccountExists } from '../../../../data/use-cases/does-account-exists'
import { UserRepository } from '../../../../infra/db/postgress/repositories/user-repository'

export const makeDoesAccountExists = () => {
  return new DoesAccountExists(new UserRepository())
}
