import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'
dotenv.config()
const dbName: string = process.env.DB_NAME || 'auth_db'
const dbPass: string = process.env.DB_PASS!
const dbHost: string = process.env.DB_HOST!
const dbUser: string = process.env.DB_USER!
console.log(dbName)

const db = new Sequelize(dbName, dbUser, dbPass, {
  host: dbHost,
  dialect: 'mysql'
})

export default db
