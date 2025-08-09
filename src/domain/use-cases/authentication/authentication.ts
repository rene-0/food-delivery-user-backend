export interface IAuthentication {
  authenticate: (request: IAuthentication.Request) => Promise<IAuthentication.Response>
}

export namespace IAuthentication {
  export type Request = {
    email: string
    password: string
  }

  type AccessToken = {
    token: string
    expiresIn: number
  }

  export type Response = {
    email: string
    name: string
    accessToken: AccessToken
  }
}
