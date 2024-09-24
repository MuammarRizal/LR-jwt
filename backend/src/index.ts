import express, { Router } from 'express'
import db from './config/Database'
import { logger } from './utils/logger'
import cookieParser from 'cookie-parser'
import { errorHandler, notFound } from './middlewares/errorMidlleware'
import router from './routes/userRoutes'
const app = express()

// connect database
db.authenticate()
  .then(() => {
    logger.info('Database Connected ...')
  })
  .catch((err) => {
    logger.error(`Database is not connected ${err}`)
  })

// middlewares
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// routes
app.use(router)

// middleware error handler
app.use(notFound)
app.use(errorHandler)

app.listen(4000, () => {
  logger.info('Server berjalan di port ', 4000)
})
