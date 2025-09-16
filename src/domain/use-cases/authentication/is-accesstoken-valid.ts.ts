export interface IIsAccessTokenValid {
  isAccessTokenValid: (request: IIsAccessTokenValid.Request) => Promise<IIsAccessTokenValid.Response>
}

export namespace IIsAccessTokenValid {
  export type Request = {
    accessToken: string
  }

  export type Response = { email: string } | undefined
}
