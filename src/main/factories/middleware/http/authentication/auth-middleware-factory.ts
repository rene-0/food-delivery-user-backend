import { AuthMiddleware } from '../../../../../presentation/middleware/http/authentication/auth-middleware'
import { makeDoesAccountExists } from '../../../usecases/authentication/does-account-exists-factory'
import { makeIsAccessTokenValid } from '../../../usecases/authentication/is-access-token-valid-factory'

export const makeAuthMiddleware = (): AuthMiddleware => {
  return new AuthMiddleware(makeDoesAccountExists(), makeIsAccessTokenValid())
}
