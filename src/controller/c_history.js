const {
  postHistoryModel,
  getHistoryByIdModel,
  deleteHistoryModel,
  getHistoryByAccountIdModel,
  patchHistoryModel
} = require('../model/history')
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
      const { id, account_id } = request.query
      if (id) {
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
      } else if (account_id) {
        const result = await getHistoryByAccountIdModel(account_id)
        if (result.length > 0) {
          return helper.response(
            response,
            200,
            `Success Get History with Account-ID ${account_id}`,
            result
          )
        } else {
          return helper.response(
            response,
            404,
            `History with account_id : ${account_id} is not found`,
            result
          )
        }
      }
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  },
  deleteHistory: async (request, response) => {
    try {
      const { id } = request.query
      const checkId = await getHistoryByIdModel(id)
      if (checkId.length > 0) {
        const result = await deleteHistoryModel(id)
        return helper.response(
          response,
          200,
          `Succeed Deleting the History by id ${id}`,
          result
        )
      } else {
        return helper.response(
          response,
          404,
          `History with id : ${id} is not found`
        )
      }
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  },
  patchHistory: async (request, response) => {
    try {
      const { id } = request.query
      const { history_status } = request.body
      const setData = {
        history_status
      }
      const result = await patchHistoryModel(setData, id)
      return helper.response(
        response,
        200,
        'Success Patching History Status',
        result
      )
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  }
}