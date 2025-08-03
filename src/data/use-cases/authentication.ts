import crypto from 'crypto'
import { AuthenticationRepository } from 'data/protocols/authentication/user-authentication'
import { IAuthentication } from 'domain/use-cases/authentication/authentication'

export class Authentication implements IAuthentication {
  constructor(readonly userRepository: AuthenticationRepository) {}
  async authenticate(request: IAuthentication.Request): Promise<IAuthentication.Response> {
    const { email, password } = request
    const hash = crypto.createHash('sha256').update(password).digest('hex')
    const user = await this.userRepository.authenticate({ email, password: hash })
    return user
  }
}
