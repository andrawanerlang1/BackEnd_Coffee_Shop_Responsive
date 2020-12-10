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
      let { page, limit, productName, productId } = request.query
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
      } else if (productId) {
        const result = await getProductByIdModel(productId)
        if (result.length > 0) {
          return helper.response(
            response,
            200,
            `Success Get Product with ID ${productId}`,
            result
          )
        } else {
          return helper.response(
            response,
            404,
            `Product with id : ${productId} is not found`,
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
      if (!product_name || !product_price || !product_desc || !fav) {
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
      let setData = {
        // category_id,
        // size_id,
        // deliver_id,
        // start_id,
        // end_id,
        // fav,
        // product_name,
        // product_price,
        // product_desc,
        // product_stock,
        product_updated_at: new Date()
      }
      category_id ? (setData.category_id = category_id) : setData
      size_id ? (setData.size_id = size_id) : setData
      deliver_id ? (setData.deliver_id = deliver_id) : setData
      start_id ? (setData.start_id = start_id) : setData
      end_id ? (setData.end_id = end_id) : setData
      fav ? (setData.fav = fav) : setData
      product_name ? (setData.product_name = product_name) : setData
      product_price ? (setData.product_price = product_price) : setData
      product_desc ? (setData.product_desc = product_desc) : setData
      product_stock ? (setData.product_stock = product_stock) : setData
      console.log(setData)
      const checkId = await getProductByIdModel(id)
      if (checkId.length > 0) {
        // proses update data
        const result = await patchProductModel(setData, id)
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
