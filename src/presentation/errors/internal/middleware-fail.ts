export class MiddlewareFail extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'Middleware Fail'
  }
}
