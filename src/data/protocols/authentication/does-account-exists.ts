export interface DoesAccountExistsRepository {
  doesItExists: (request: DoesAccountExistsRepository.Request) => Promise<DoesAccountExistsRepository.Response>
}

export namespace DoesAccountExistsRepository {
  export type Request = {
    email: string
  }

  export type Response = boolean
}
