import { NextFunction, Request, Response } from 'express'
import { logger } from '../utils/logger'

const notFound = (req: Request, res: Response, next: NextFunction) => {
  const error = new Error(`Path not found ${req.originalUrl}`)

  res.status(404)

  next(error)
}

const errorHandler = (error: any, req: Request, res: Response, next: NextFunction) => {
  let resStatusCode = res.statusCode === 200 ? 500 : res.statusCode
  let message = error.message

  logger.error(message)
  res.status(resStatusCode).json({
    message,
    stack: error.stack
  })

  // logger.error(error.message)
  // logger.error(error)
  // return res.status(error.statusCode || 500).json({
  //   success: false,
  //   message: error.message || 'Page Not Found'
  // })
}

export { errorHandler, notFound }
