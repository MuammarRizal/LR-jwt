export interface ProcessEnv {
  DB_NAME: string
  DB_USER: string
  DB_PASS: string
  DB_HOST: string
}

export interface ResponseJson {
  statusCode: number
  status: ['success', 'error']
  message: string
  error?: string
  stack?: string
  data?: {}[]
}
