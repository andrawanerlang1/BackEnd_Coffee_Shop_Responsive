const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
// =========================================================================
const routesNavigation = require('./src/routesNavigation')
// =========================================================================
const app = express()
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/', routesNavigation)
// ==================================================================================

app.get('*', (request, response) => {
  response.status(404).send('Path Not Found')
})

app.listen(3000, () => {
  console.log('Express app is listening on port 3000')
})
