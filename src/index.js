import 'dotenv/config'
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import bodyParser from 'body-parser'
import routes from './routes'

const initDb = require('./db').initDb
const getDb = require('./db').getDb
const app = express()

app.use(morgan('combined'))
app.use(cors())
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true
  })
)
app.use('/api', routes)

let server

initDb(err => {
  server = app.listen(process.env.PORT, () => {
    if (err) {
      throw err
    }
    console.log(`server is listening on port ${process.env.PORT}`)
  })
})

process.on('SIGINT', () => {
  let db = getDb()
  console.log(db)
  if (db) {
    db.close()
  }
  server.close()
})
