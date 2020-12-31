const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const routesNavigation = require('./src/routesNavigation')
const cors = require('cors')
require('dotenv').config()

const app = express()
app.use(cors())
app.use(morgan('dev'))
app.use(express.static('uploads'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use((request, response, next) => {
  response.header('Access-Control-Allow-Origin', '*')
  response.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Request-With, Content-Type, Accept, Authorization'
  )
  next()
})

app.use('/', routesNavigation)
require('dotenv').config()

app.get('*', (request, response) => {
  response.status(404).send('Path Not Found')
})

app.listen(process.env.port, () => {
  console.log(`Express app is listening on port ${process.env.port}`)
})
