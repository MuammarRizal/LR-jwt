import express from 'express'
import db from './config/Database'
import { logger } from './utils/logger'
import Users from './models/UserModel'
const app = express()

try {
  ;(async () => {
    await db.authenticate()
    logger.info('Database Connected ....')
    await Users.sync()
  })()
} catch (error) {
  logger.error(error)
}

app.listen(4000, () => {
  logger.info('Server berjalan di port ', 4000)
})
