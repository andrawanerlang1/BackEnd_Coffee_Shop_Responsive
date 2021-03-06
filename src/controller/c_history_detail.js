const {
  postHistoryDetailModel,
  getHistoryByIdModel,
  getHistoryByHistoryIdModel
} = require('../model/history_detail')
const helper = require('../helper/response')

module.exports = {
  postHistoryDetail: async (request, response) => {
    try {
      const {
        history_id,
        product_id,
        product_name,
        size_choice_id,
        deliver_id,
        history_detail_quantity,
        history_detail_total
      } = request.body
      const setData = {
        history_id,
        product_id,
        product_name,
        size_choice_id,
        deliver_id,
        history_detail_quantity,
        history_detail_total
      }
      const result = await postHistoryDetailModel(setData)
      return helper.response(
        response,
        200,
        'Success Post the History Detail',
        result
      )
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  },
  getHistory: async (request, response) => {
    try {
      const { id, history_id } = request.query
      if (id) {
        const result = await getHistoryByIdModel(id)
        if (result.length > 0) {
          return helper.response(
            response,
            200,
            `Success Get History-detail with ID ${id}`,
            result
          )
        } else {
          return helper.response(
            response,
            404,
            `History-detail with id : ${id} is not found`,
            result
          )
        }
      } else {
        const result = await getHistoryByHistoryIdModel(history_id)
        if (result.length > 0) {
          return helper.response(
            response,
            200,
            `Success Get History-detail with history-ID ${history_id}`,
            result
          )
        } else {
          return helper.response(
            response,
            404,
            `History-detail with id : ${id} is not found`,
            result
          )
        }
      }
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  }
}
