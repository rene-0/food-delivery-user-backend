import argon2 from 'argon2'
import jwt from 'jsonwebtoken'
import { IAuthentication } from '../../domain/use-cases/authentication/authentication'
import { FindUserByEmailRepository } from '../protocols/user/get-user-by-email'

const PEPPER = process.env.PASSWORD_PEPPER ?? ''

export class Authentication implements IAuthentication {
  constructor(readonly userRepository: FindUserByEmailRepository) {}
  async authenticate(request: IAuthentication.Request): Promise<IAuthentication.Response> {
    const user = await this.userRepository.findUserByEmail({ email: request.email })

    if (!user) {
      return undefined
    }

    const isValid = await argon2.verify(user.password, PEPPER + request.password)

    if (!isValid) {
      return undefined
    }

    const { email, name, phoneNumber } = user

    const expiresInSeconds = 60 * 60 // 1h

    const token = jwt.sign({ email, name, phoneNumber }, process.env.SECRETE_TOKEN, { expiresIn: expiresInSeconds })
    return { name, email, accessToken: { token, expiresIn: expiresInSeconds } }
  }
}
