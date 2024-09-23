import express from 'express'

const app = express()

app.listen(4000, () => {
  console.log('Server berjalan di port ', 4000)
})
