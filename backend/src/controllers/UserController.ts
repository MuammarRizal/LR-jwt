import { NextFunction, Request, Response } from 'express'
import { logger } from '../utils/logger'
import Users from '../models/UserModel'
import bcrypt, { compareSync } from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const UserControllerGetAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  const users = await Users.findAll()
  logger.info('Get all users successfully')
  return res.status(200).json({
    message: 'Get all users successfully',
    data: users
  })
}
const UserControllerRegister = async (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password, confPassword } = req.body
  if (password !== confPassword) {
    res.status(501)
    throw new Error('Password tidak sesuai')
  }
  const salt = await bcrypt.genSalt(10)
  const hashPassword = await bcrypt.hash(password, salt)
  try {
    await Users.create({
      name,
      email,
      password: hashPassword
    })
    logger.info('Register User is succesfully')
    res.status(201)
    res.json({
      statusCode: 201,
      status: 'success',
      message: 'Register successfully'
    })
  } catch (error: any) {
    throw new Error(error.message)
  }
}

const UserControllerLogin = async (req: Request, res: Response, next: NextFunction) => {
  const dataBody = req.body
  try {
    const dataUser: any = await Users.findOne({ where: { email: dataBody.email } })
    if (!dataUser) {
      logger.warn('Username is not found')
      res.status(404)
      throw new Error('Username is not found')
    }
    const passwordCompare = compareSync(req.body.password, dataUser.password)
    if (!passwordCompare) {
      res.status(404)
      throw new Error('password is wrong')
    }

    const { id, name, email } = dataUser.dataValues
    const accessToken = jwt.sign({ id, name, email }, process.env.ACCESS_TOKEN_SECRET!, {
      expiresIn: '20s'
    })
    const refreshToken = jwt.sign({ id, name, email }, process.env.REFRESH_TOKEN_SECRET!, {
      expiresIn: '1d'
    })

    await Users.update({ refresh_token: refreshToken }, { where: { id } })
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000
    })

    res.status(200).send({
      status: 'success',
      message: `Welcome ${dataUser.name}`,
      accessToken
    })
  } catch (error: any) {
    throw new Error(error)
  }
}
export { UserControllerGetAllUsers, UserControllerRegister, UserControllerLogin }
