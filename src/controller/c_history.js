const { postHistoryModel, getHistoryByIdModel } = require('../model/history')
const helper = require('../helper/response')
// const qs = require('querystring')
// const response = require('../helper/response')

module.exports = {
  postHistory: async (request, response) => {
    try {
      const { history_subtotal, history_payment, account_id } = request.body
      const setData = {
        history_subtotal,
        history_payment,
        account_id
      }
      const result = await postHistoryModel(setData)
      return helper.response(response, 200, 'Success Post History', result)
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  },
  getHistory: async (request, response) => {
    try {
      let { id } = request.query
      const result = await getHistoryByIdModel(id)
      if (result.length > 0) {
        return helper.response(
          response,
          200,
          `Success Get History with ID ${id}`,
          result
        )
      } else {
        return helper.response(
          response,
          404,
          `History with id : ${id} is not found`,
          result
        )
      }
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  }
}
