import { NextFunction, Request, Response } from 'express'
import { logger } from '../utils/logger'

const UserControllerGetAllUsers = (req: Request, res: Response, next: NextFunction) => {
  logger.info('Get all users successfully')

  return res.send({ name: 'hellow' })
}
const UserControllerAddUser = (req: Request, res: Response, next: NextFunction) => {
  logger.info('ini telah terlewat')
  throw new Error('ErrorVad')
}
export { UserControllerGetAllUsers, UserControllerAddUser }
