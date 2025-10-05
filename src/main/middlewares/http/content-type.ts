import { NextFunction, Request, Response } from 'express'
export const contentType = (req: Request, res: Response, next: NextFunction): void => {
  if (req.path.startsWith('/api')) {
    res.type('json')
  }
  next()
}
