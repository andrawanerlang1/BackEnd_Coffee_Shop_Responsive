const {
  postHistoryModel,
  getHistoryByIdModel,
  deleteHistoryModel,
  getHistoryTotalModel,
  getHistoryByAccountIdModel,
  patchHistoryModel,
  getHistoryRevYear
} = require('../model/history')
const helper = require('../helper/response')

module.exports = {
  postHistory: async (request, response) => {
    try {
      const { history_subtotal, history_payment, user_id } = request.body
      const setData = {
        history_subtotal,
        history_payment,
        user_id
      }
      const result = await postHistoryModel(setData)
      return helper.response(response, 200, 'Success Post History', result)
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  },
  getHistory: async (request, response) => {
    try {
      const { user_id, total } = request.query
      if (total) {
        const result = await getHistoryTotalModel()
        if (result.length > 0) {
          return helper.response(
            response,
            200,
            'Success Get History Total Sell',
            result
          )
        }
      } else if (user_id) {
        const result = await getHistoryByAccountIdModel(user_id)
        if (result.length > 0) {
          return helper.response(
            response,
            200,
            `Success Get History with user id : ${user_id}`,
            result
          )
        } else {
          return helper.response(
            response,
            404,
            `History with user_id : ${user_id} is not found`,
            result
          )
        }
      }
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  },
  getHistoryById: async (request, response) => {
    try {
      const { id } = request.params
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
  },
  getHistoryChart: async (request, response) => {
    try {
      const { year } = request.query
      const result = await getHistoryRevYear(year)
      const revenue = result[0].Revenue_this_year
      if (revenue) {
        return helper.response(
          response,
          200,
          `Success Get History of year ${year}`,
          result
        )
      } else {
        result[0].Revenue_this_year = 0
        return helper.response(
          response,
          200,
          `Success Get History of year ${year}`,
          result
        )
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
      const checkId = await getHistoryByIdModel(id)
      if (checkId.length > 0) {
        const result = await patchHistoryModel(setData, id)
        return helper.response(
          response,
          200,
          'Success Patching History Status',
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
  }
}
