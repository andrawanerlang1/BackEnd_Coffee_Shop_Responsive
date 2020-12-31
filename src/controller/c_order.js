const {
  // getProductModel,
  // getProductByCategoryModel
  postOrderItemModel,
  postOrderModel,
  getOrderItemModel
} = require('../model/order')
const helper = require('../helper/response')

module.exports = {
  getOrderItem: async (request, response) => {
    try {
      let { order_id } = request.query
      order_id = parseInt(order_id)
      const result = await getOrderItemModel(order_id)
      return helper.response(
        response,
        200,
        `Success Get order item with (order ID) ${order_id}`,
        result
      )
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  },
  postOrderItem: async (request, response) => {
    try {
      const {
        product_id,
        size_choice_id,
        deliver_id,
        order_quantity,
        order_total,
        order_id
      } = request.body
      const setData = {
        product_id,
        size_choice_id,
        deliver_id,
        order_quantity,
        order_total,
        order_id
      }
      const result = await postOrderItemModel(setData)
      return helper.response(response, 200, 'Order added into cart', result)
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  },
  postOrder: async (request, response) => {
    try {
      const { id } = request.params
      const order_id = id
      const { order_subtotal, order_payment, account_id } = request.body
      const setData = {
        order_id,
        order_subtotal,
        order_payment,
        account_id
      }
      const result = await postOrderModel(setData)
      return helper.response(
        response,
        200,
        `Success Post new Order with invoice ${order_id}`,
        result
      )
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  }
}
