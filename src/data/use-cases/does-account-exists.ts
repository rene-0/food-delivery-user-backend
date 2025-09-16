import { IDoesAccountExists } from '../../domain/use-cases/authentication/does-account-exists'
import { DoesAccountExistsRepository } from '../protocols/authentication/does-account-exists'

type DecodedToken = {
  email: string
  name: string
  phoneNumber: string
}

export class DoesAccountExists implements IDoesAccountExists {
  constructor(readonly dbDoesAccountExists: DoesAccountExistsRepository) {}
  async doesAccountExists({ email }: IDoesAccountExists.Request): Promise<IDoesAccountExists.Response> {
    const accountExists = await this.dbDoesAccountExists.doesItExists({ email: email })

    return accountExists
  }
}
