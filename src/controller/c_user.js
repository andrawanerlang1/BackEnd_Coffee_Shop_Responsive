const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const helper = require('../helper/response')
const { registerUserModel, cekEmailModel } = require('../model/user')

module.exports = {
  registerUser: async (request, response) => {
    try {
      const {
        user_name,
        user_email,
        user_display_name,
        user_first_name,
        user_last_name,
        user_number,
        user_address,
        user_gender,
        user_birthday,
        user_password
      } = request.body
      const salt = bcrypt.genSaltSync(10)
      const encryptPassword = bcrypt.hashSync(user_password, salt)
      const setData = {
        user_name,
        user_email,
        user_display_name,
        user_first_name,
        user_last_name,
        user_number,
        user_address,
        user_gender,
        user_birthday,
        user_password: encryptPassword,
        user_created_at: new Date()
      }
      const result = await registerUserModel(setData)
      return helper.response(response, 200, 'Success Register User', result)
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  },
  loginUser: async (request, response) => {
    try {
      const { user_email, user_password } = request.body
      const checkDataUser = await cekEmailModel(user_email)
      if (checkDataUser.length > 0) {
        const checkPassword = bcrypt.compareSync(
          user_password,
          checkDataUser[0].user_password
        )
        if (checkPassword) {
          const { user_id, user_email, user_role, status } = checkDataUser[0]
          const payload = {
            user_id,
            user_email,
            user_role,
            status
          }
          const token = jwt.sign(payload, 'RAHASIA', { expiresIn: '3h' })
          const result = { ...payload, token }
          return helper.response(response, 200, 'Success Login!', result)
        } else {
          return helper.response(response, 400, 'Wrong Password!')
        }
      } else {
        return helper.response(
          response,
          400,
          'Email / Account not Registered !'
        )
      }
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  }
}
