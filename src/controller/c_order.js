const {
  // getProductModel,
  // getProductByCategoryModel
  postOrderItemModel,
  postOrderModel,
  getOrderItemModel
} = require('../model/order')
const helper = require('../helper/response')
// const qs = require('querystring')
// const response = require('../helper/response')

module.exports = {
  // getOrder: async (request, response) => {
  //   try {
  //     let { page, limit, userId, orderId, category } = request.query
  //     page = parseInt(page)
  //     limit = parseInt(limit)
  //     category = parseInt(category)
  //     const totalData = getOrderCountModel()
  //     const totalPage = Math.ceil(totalData / limit)
  //     if (page > totalPage) {
  //       page = 1
  //     } else {
  //       page = page
  //     }
  //     const offset = page * limit - limit
  //     const prevLink =
  //       page > 1
  //         ? qs.stringify({ ...request.query, ...{ page: page - 1 } })
  //         : null
  //     const nextLink =
  //       page < totalPage
  //         ? qs.stringify({ ...request.query, ...{ page: page + 1 } })
  //         : null

  //     const pageInfo = {
  //       page,
  //       totalPage,
  //       limit,
  //       totalData,
  //       nextLink: nextLink && `http://localhost:3000/product?${nextLink}`,
  //       prevLink: prevLink && `http://localhost:3000/product?${prevLink}`
  //     }
  //     if (userId) {
  //       const result = await getOrderModel(userId, limit, offset)
  //       if (result.length > 0) {
  //         return helper.response(
  //           response,
  //           200,
  //           `Success Get order for this user`,
  //           result,
  //           pageInfo
  //         )
  //       }
  //     } else if (orderId) {
  //       const result = await getOrderByIdModel(orderId)
  //         return helper.response(
  //           response,
  //           200,
  //           `Success Get Product with ID ${productId}`,
  //           result
  //         )
  //       }
  //     }
  //   } catch (error) {
  //     return helper.response(response, 400, 'Bad Request', error)
  //   }
  // },
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
  //     deleteOrder: async (request, response) => {
  //       try {
  //         const { id } = request.params
  //         const checkId = await getProductByIdModel(id)
  //         if (checkId.length > 0) {
  //           const result = await deleteProductModel(id)
  //           return helper.response(
  //             response,
  //             200,
  //             `Succeed Deleting the Product by id ${id}`,
  //             result
  //           )
  //         } else {
  //           return helper.response(
  //             response,
  //             404,
  //             `Product with id : ${id} is not found`
  //           )
  //         }
  //       } catch (error) {
  //         return helper.response(response, 400, 'Bad Request', error)
  //       }
  //     }
}
