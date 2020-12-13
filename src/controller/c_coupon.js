const {
  postCouponModel,
  getCouponByIdModel,
  deleteCouponModel,
  patchCouponModel
} = require('../model/Coupon')
const helper = require('../helper/response')
// const qs = require('querystring')
// const response = require('../helper/response')

module.exports = {
  postCoupon: async (request, response) => {
    try {
      const {
        coupon_name,
        coupon_price,
        coupon_desc,
        size_id,
        deliver_id,
        coupon_discount,
        start_date,
        end_date,
        coupon_code
      } = request.body
      const setData = {
        coupon_name,
        coupon_price,
        coupon_desc,
        size_id,
        deliver_id,
        coupon_discount,
        start_date,
        end_date,
        coupon_code
      }
      const result = await postCouponModel(setData)
      return helper.response(response, 200, 'Success Post Coupon', result)
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  },
  getCoupon: async (request, response) => {
    try {
      const { id } = request.query

      const result = await getCouponByIdModel(id)
      if (result.length > 0) {
        return helper.response(
          response,
          200,
          `Success Get Coupon with ID ${id}`,
          result
        )
      } else {
        return helper.response(
          response,
          404,
          `Coupon with id : ${id} is not found`,
          result
        )
      }
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  },
  deleteCoupon: async (request, response) => {
    try {
      const { id } = request.query
      const checkId = await getCouponByIdModel(id)
      if (checkId.length > 0) {
        const result = await deleteCouponModel(id)
        return helper.response(
          response,
          200,
          `Succeed Deleting the Coupon by id ${id}`,
          result
        )
      } else {
        return helper.response(
          response,
          404,
          `Coupon with id : ${id} is not found`
        )
      }
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  },
  patchCoupon: async (request, response) => {
    try {
      const { id } = request.query
      const checkId = await getCouponByIdModel(id)
      if (checkId.length > 0) {
        const {
          coupon_name,
          coupon_price,
          coupon_desc,
          size_id,
          deliver_id,
          coupon_discount,
          start_date,
          end_date,
          coupon_code
        } = request.body
        const setData = {
          coupon_name,
          coupon_price,
          coupon_desc,
          size_id,
          deliver_id,
          coupon_discount,
          start_date,
          end_date,
          coupon_code
        }
        const result = await patchCouponModel(setData, id)
        return helper.response(response, 200, 'Success Patching Coupon', result)
      } else {
        return helper.response(
          response,
          404,
          `Coupon with id : ${id} is not found`
        )
      }
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  }
}
