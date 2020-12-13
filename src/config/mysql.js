const mysql = require('mysql')
require('dotenv').config()
const connection = mysql.createConnection({
  host: process.env.host,
  user: process.env.user,
  password: '',
  database: 'coffee_shop',
  timezone: 'UTC'
})

connection.connect((error) => {
  if (error) {
    throw error
  }
  console.log('You are now connected with db')
})

module.exports = connection
