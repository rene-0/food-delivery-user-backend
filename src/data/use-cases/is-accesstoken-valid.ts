import jwt from 'jsonwebtoken'
import { IIsAccessTokenValid } from '../../domain/use-cases/authentication/is-accesstoken-valid.ts'

type DecodedToken = {
  email: string
  name: string
  phoneNumber: string
}

export class IsAccessTokenValid implements IIsAccessTokenValid {
  constructor() {}
  async isAccessTokenValid({ accessToken }: IIsAccessTokenValid.Request): Promise<IIsAccessTokenValid.Response> {
    const accessTokenWithoutBearer = accessToken.split(' ')[1]
    let isTokenValid = true
    let decodedToken
    jwt.verify(accessTokenWithoutBearer, process.env.SECRETE_TOKEN, (error, decoded): void => {
      if (error) {
        isTokenValid = false
      }
      decodedToken = decoded
    })

    if (!isTokenValid) {
      return undefined
    }

    return {
      email: decodedToken.email,
    }
  }
}
