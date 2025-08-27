import { HttpResponse } from '../protocols/http'

/* Precisa fazer */

export function badRequest<T>(response: any): HttpResponse<any> {
  return {
    statusCode: 400,
    body: {
      response,
    },
  }
}

export function notFound<T>(response: any): HttpResponse<any> {
  return {
    statusCode: 404,
    body: {
      response,
    },
  }
}

export function serverError(error: Error): HttpResponse<any> {
  console.error(error)
  return {
    statusCode: 500,
    body: process.env.NODE_ENV === 'production' ? 'Server error' : error?.stack,
  }
}

export function ok<T>(body: T): HttpResponse<T> {
  return {
    statusCode: 200,
    body: body,
  }
}

export function unauthorized(error: Error): HttpResponse<any> {
  return {
    statusCode: 401,
    body: error.message,
  }
}

export function forbidden(error: Error): HttpResponse<any> {
  return {
    statusCode: 403,
    body: error.message,
  }
}

export function noContent(error: Error): HttpResponse<any> {
  return {
    statusCode: 204,
    body: error.message,
  }
}
