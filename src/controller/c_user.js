const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const helper = require('../helper/response')
const nodemailer = require('nodemailer')
const {
  cekEmailModel,
  getUserByIdModel,
  editUserModel,
  editUserByTokenModel,
  deleteUserModel,
  setTokenPasswordModel,
  getUserByTokenModel
} = require('../model/user')
require('dotenv').config()

module.exports = {
  getUserById: async (request, response) => {
    try {
      const { id } = request.params
      const result = await getUserByIdModel(id)
      if (result.length > 0) {
        return helper.response(response, 200, 'Success Get User By Id', result)
      } else {
        return helper.response(response, 404, `Product By Id : ${id} Not Found`)
      }
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  },
  registerUser: async (request, response) => {
    try {
      const { user_name, user_email, user_password } = request.body
      const checkDataLogin = await cekEmailModel(user_email)
      if (checkDataLogin.length >= 1) {
        return helper.response(
          response,
          400,
          `Invalid Register ${user_email}, Your email has already been registered`
        )
      } else {
        const salt = bcrypt.genSaltSync(10)
        const encryptPassword = bcrypt.hashSync(user_password, salt)
        const setData = {
          user_name,
          user_email,
          user_password: encryptPassword,
          user_created_at: new Date()
        }
        const result = await registerUserModel(setData)
        return helper.response(
          response,
          200,
          `Success Register ${user_email}`,
          result
        )
      }
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  },
  forgotPassword: async (request, response) => {
    try {
      const { email } = request.body
      const token_password = require('crypto').randomBytes(15).toString('hex')
      const checkDataLogin = await cekEmailModel(email)
      if (checkDataLogin.length < 1) {
        return helper.response(
          response,
          400,
          `Invalid ${email}, email is not registered `
        )
      }
      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: 'kostkost169@gmail.com',
          pass: 'admin@123456'
        }
      })
      const mailOptions = {
        from: '"Coffee Shop 👻" <memo.in.aja@gmail.com>',
        to: `${email}`,
        subject: 'Password Reset',
        html: `<a href="http://localhost:8080/changePassword?keys=${token_password}">Click Here To Change Password</a>`
      }
      await transporter.sendMail(mailOptions, async function (error) {
        if (error) {
          console.log(error)
          return helper.response(response, 400, 'Email not send !')
        } else {
          console.log('nodemailer sukses')
          try {
            const setData = { token_password: token_password }
            console.log(setData)
            console.log(email)
            const tokenPassword = await setTokenPasswordModel(email, setData)
            return helper.response(
              response,
              200,
              `Success! check your email for futher step!`,
              tokenPassword
            )
          } catch (error) {
            return helper.response(response, 400, 'Bad Request 2', error)
          }
        }
      })
    } catch (error) {
      return helper.response(response, 400, 'Bad Request 1', error)
    }
  },
  resetPassword: async (request, response) => {
    try {
      const { token_password, user_password } = request.body
      const salt = bcrypt.genSaltSync(10)
      const encryptPassword = bcrypt.hashSync(user_password, salt)
      const setData = {
        user_password: encryptPassword,
        user_updated_at: new Date()
      }
      const checkToken = await getUserByTokenModel(token_password)
      if (checkToken.length > 0) {
        const result = await editUserByTokenModel(setData, token_password)
        return helper.response(response, 200, 'Success reset Password', result)
      } else {
        return helper.response(
          response,
          404,
          `Invalid Token ${token_password} `
        )
      }
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  },
  editUser: async (request, response) => {
    try {
      const { id } = request.params
      const {
        user_email,
        user_display_name,
        user_first_name,
        user_last_name,
        user_number,
        user_address,
        user_gender,
        user_birthday
      } = request.body
      const setData = {
        user_email,
        user_display_name,
        user_first_name,
        user_last_name,
        user_number,
        user_address,
        user_gender,
        user_birthday,
        user_updated_at: new Date()
      }
      const checkId = await getUserByIdModel(id)
      if (checkId.length > 0) {
        const result = await editUserModel(setData, id)
        return helper.response(response, 200, 'Success edit user', result)
      } else {
        return helper.response(
          response,
          404,
          `User with id : ${id} is not found`
        )
      }
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  },
  editPassword: async (request, response) => {
    try {
      const { id } = request.params
      const { user_password } = request.body
      const salt = bcrypt.genSaltSync(10)
      const encryptPassword = bcrypt.hashSync(user_password, salt)
      const setData = {
        user_password: encryptPassword,
        user_updated_at: new Date()
      }
      const checkId = await getUserByIdModel(id)
      if (checkId.length > 0) {
        const result = await editUserModel(setData, id)
        return helper.response(
          response,
          200,
          'Success edit user Password',
          result
        )
      } else {
        return helper.response(
          response,
          404,
          `User with id : ${id} is not found`
        )
      }
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  },
  deleteUser: async (request, response) => {
    try {
      const { id } = request.params
      const checkId = await getUserByIdModel(id)

      if (checkId.length > 0) {
        const result = await deleteUserModel(id)
        return helper.response(
          response,
          200,
          `Succeed Deleting the User by id ${id}, username: ${checkId[0].user_name}`,
          result
        )
      } else {
        return helper.response(
          response,
          404,
          `Product with id : ${id} is not found`
        )
      }
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
          console.log(checkDataUser[0].status)
          if (checkDataUser[0].status !== 1) {
            return helper.response(
              response,
              400,
              'You have not activated your account, please check your email'
            )
          } else {
            const { user_id, user_name, user_email, status } = checkDataUser[0]
            const payload = {
              user_id,
              user_name,
              user_email,
              status
            }
            const token = jwt.sign(payload, 'RAHASIA', { expiresIn: '3h' })
            const result = { ...payload, token }
            return helper.response(response, 200, 'Success Login!', result)
          }
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
