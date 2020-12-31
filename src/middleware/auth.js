const jwt = require('jsonwebtoken')
const helper = require('../helper/response')

module.exports = {
  authorization: (request, response, next) => {
    let token = request.headers.authorization
    if (token) {
      token = token.split(' ')[1]
      jwt.verify(token, 'RAHASIA', (error, result) => {
        if (
          (error && error.name === 'JsonWebTokenError') ||
          (error && error.name === 'TokenExpiredError')
        ) {
          console.log(error)
          return helper.response(response, 403, error.message)
        } else {
          request.decodeToken = result
          next()
        }
      })
    } else {
      return helper.response(response, 403, 'Please Login First !')
    }
  },
  isAdmin: (request, response, next) => {
    const isAdmin = request.decodeToken.user_role
    if (isAdmin) {
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
