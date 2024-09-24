import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import 'cookie-parser'
import Users from '../models/UserModel'
import dotenv from 'dotenv'
dotenv.config()

export const RefreshToken = async (req: Request, res: Response) => {
  const refreshToken: string | undefined = req.cookies?.refreshToken

  try {
    if (!refreshToken) return res.sendStatus(401)
    const user = await Users.findAll({
      where: {
        refresh_token: refreshToken
      }
    })
    if (!user[0]) return res.sendStatus(403)
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!, (err: any, decoded: any) => {
      if (err) return res.sendStatus(403)
      const { id, name, email }: any = user[0]
      console.log(id)
      const accessToken = jwt.sign({ id, name, email }, process.env.ACCESS_TOKEN_SECRET!, {
        expiresIn: '15s'
      })
      res.json({ accessToken })
    })
  } catch (err) {
    console.log(err)
  }
}
export const Logout = async (req: Request, res: Response) => {
  const refreshToken: string | undefined = req.cookies?.refreshToken
  if (!refreshToken) return res.sendStatus(204)
  const user = await Users.findAll({
    where: {
      refresh_token: refreshToken
    }
  })
  if (!user[0]) return res.sendStatus(204)
  const { id }: any = user[0]
  await Users.update({ refresh_token: null }, { where: { id } })
  res.clearCookie('refreshToken')
  return res.sendStatus(200)
}
