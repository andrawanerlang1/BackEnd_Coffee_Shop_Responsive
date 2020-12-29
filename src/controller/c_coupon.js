const {
  postCouponModel,
  getCouponByIdModel,
  getCouponModel,
  deleteCouponModel,
  patchCouponModel
} = require('../model/Coupon')
const helper = require('../helper/response')
// const qs = require('querystring')
// const response = require('../helper/response')
const redis = require('redis')
const client = redis.createClient()
const fs = require('fs')

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
        coupon_image: request.file === undefined ? '' : request.file.filename,
        coupon_created_at: new Date(),
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
      const result = await getCouponModel()
      client.setex(`getcouponall`, 3600, JSON.stringify(result))
      return helper.response(
        response,
        200,
        `Success Get All Available Coupon `,
        result
      )
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  },
  getCouponById: async (request, response) => {
    const { id } = request.params
    const result = await getCouponByIdModel(id)
    if (result.length > 0) {
      client.setex(`getcouponbyid:${id}`, 3600, JSON.stringify(result))
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
  },
  deleteCoupon: async (request, response) => {
    try {
      const { id } = request.query
      const checkId = await getCouponByIdModel(id)
      if (checkId.length > 0) {
        const image = checkId[0].coupon_image
        fs.unlink(`./uploads/coupon/${image}`, (err) => {
          if (!err) {
            console.log(`successfully deleted ${image}`)
          } else {
            console.log('Image that would be deleted does not exist')
          }
        })
        const result = await deleteCouponModel(id)
        return helper.response(
          response,
          200,
          `Succeed Deleting the Coupon by id ${id} and image ${image}`,
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
          coupon_image: request.file === undefined ? '' : request.file.filename,
          coupon_updated_at: new Date(),
          coupon_code
        }
        const image = checkId[0].coupon_image // ====================unlink untuk menghapus image dan mengupdatenya
        await fs.unlink(`./uploads/coupon/${image}`, (err) => {
          if (!err) {
            console.log(
              `successfully updated ${image} with ${setData.coupon_image}`
            )
          } else {
            console.log('Image that would be deleted does not exist')
          }
        })
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
