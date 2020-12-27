const jwt = require('jsonwebtoken')
const helper = require('../helper/response')

module.exports = {
  authorization: (request, response, next) => {
    let token = request.headers.authorization
    // console.log(token)
    // proses 1 check apakah headers dimasukan ?
    if (token) {
      // proses 2 validasi token
      token = token.split(' ')[1]
      jwt.verify(token, 'RAHASIA', (error, result) => {
        if (
          (error && error.name === 'JsonWebTokenError') ||
          (error && error.name === 'TokenExpiredError')
        ) {
          console.log(error)
          return helper.response(response, 400, error.message)
        } else {
          // proses pengecekan role
          // console.log(result)
          request.decodeToken = result
          next()
        }
      })
    } else {
      return helper.response(response, 400, 'Please Login First !')
    }
  },
  isAdmin: (request, response, next) => {
    // console.log('Middlewares is admin')

    const isAdmin = request.decodeToken.user_role
    if (isAdmin) {
      // console.log('You are admin!')
      // console.log(request.decodeToken)
      next()
    } else {
      return helper.response(
        response,
        400,
        'You are not Admin, you dont have this access!!'
      )
    }
  }
}
