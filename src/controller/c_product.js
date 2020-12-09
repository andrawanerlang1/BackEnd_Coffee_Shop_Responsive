const {
  getProductModel,
  getProductByIdModel,
  postProductModel,
  patchProductModel,
  getProductCountModel,
  getProductByNameModel,
  getProductNameCountModel
} = require('../model/product')
const helper = require('../helper/response')
const qs = require('querystring')

module.exports = {
  getProduct: async (request, response) => {
    try {
      let { page, limit, productName } = request.query
      page = parseInt(page)
      limit = parseInt(limit)
      const totalData = productName
        ? await getProductNameCountModel(productName)
        : await getProductCountModel()
      const totalPage = Math.ceil(totalData / limit)
      const offset = page * limit - limit
      const prevLink =
        page > 1
          ? qs.stringify({ ...request.query, ...{ page: page - 1 } })
          : null
      const nextLink =
        page < totalPage
          ? qs.stringify({ ...request.query, ...{ page: page + 1 } })
          : null
      // console.log(request.query)
      // console.log(qs.stringify(request.query))       ============================   untuk cek yang diambil dari request query
      const pageInfo = {
        page,
        totalPage,
        limit,
        totalData,
        nextLink: nextLink && `http://localhost:3000/product?${nextLink}`,
        prevLink: prevLink && `http://localhost:3000/product?${prevLink}`
      }
      if (productName) {
        const result = await getProductByNameModel(productName, limit, offset)
        if (result.length > 0) {
          return helper.response(
            response,
            200,
            `Success Get ${totalData} Product(s) by name ${productName}`,
            result,
            pageInfo
          )
        } else {
          return helper.response(
            response,
            200,
            `Product with the name ${productName} does not exist`,
            result
          )
        }
      } else {
        const result = await getProductModel(limit, offset)
        return helper.response(
          response,
          200,
          'Success Get Product',
          result,
          pageInfo
        )
      }
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  },
  getProductById: async (request, response) => {
    try {
      const { id } = request.params
      const result = await getProductByIdModel(id)
      if (result.length > 0) {
        return helper.response(
          response,
          200,
          'Success Get Product by ID',
          result
        )
      } else {
        return helper.response(
          response,
          404,
          `Product with id : ${id} is not found`,
          result
        )
      }
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  },
  postProduct: async (request, response) => {
    try {
      const {
        category_id,
        size_id,
        deliver_id,
        start_id,
        end_id,
        fav,
        product_name,
        product_price,
        product_desc,
        product_stock
      } = request.body
      if (!product_name || !product_price || !product_desc) {
        return helper.response(response, 400, 'Please Input All Data!')
      }
      const setData = {
        category_id,
        size_id,
        deliver_id,
        start_id,
        end_id,
        fav,
        product_name,
        product_price,
        product_desc,
        product_stock
      }
      const result = await postProductModel(setData)
      return helper.response(response, 200, 'Success Post new Product', result)
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  },
  patchProduct: async (request, response) => {
    try {
      const { id } = request.params
      const {
        category_id,
        product_name,
        product_price,
        product_status
      } = request.body
      const setData = {
        category_id,
        product_name,
        product_price,
        product_updated_at: new Date(),
        product_status
      }
      const checkId = await getProductByIdModel(id)
      if (checkId.length > 0) {
        // proses update data
        const result = await patchProductModel(setData, id)
        console.log(result)
        return helper.response(
          response,
          200,
          'Succeed Updating the Product',
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
  }
}
