export interface IDoesAccountExists {
  doesAccountExists: (request: IDoesAccountExists.Request) => Promise<IDoesAccountExists.Response>
}

export namespace IDoesAccountExists {
  export type Request = {
    email: string
  }

  export type Response = boolean
}
