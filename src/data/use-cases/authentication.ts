import crypto from 'crypto'
import jwt from 'jsonwebtoken'
import { IAuthentication } from '../../domain/use-cases/authentication/authentication'
import { AuthenticationRepository } from '../protocols/authentication/user-authentication'

export class Authentication implements IAuthentication {
  constructor(readonly userRepository: AuthenticationRepository) {}
  async authenticate(request: IAuthentication.Request): Promise<IAuthentication.Response> {
    const hash = crypto.createHash('sha256').update(request.password).digest('hex')
    const user = await this.userRepository.authenticate({ email: request.email, password: hash })

    if (!user) {
      return undefined
    }

    const { email, name, phoneNumber } = user

    const expiresInSeconds = 60 * 60 // 1h

    const token = jwt.sign({ email, name, phoneNumber }, process.env.SECRETE_TOKEN, { expiresIn: expiresInSeconds })
    return { name, email, accessToken: { token, expiresIn: expiresInSeconds } }
  }
}
