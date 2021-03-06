const {
  getProductModel,
  getProductSortModel,
  getProductByIdModel,
  postProductModel,
  patchProductModel,
  getProductCountModel,
  getProductCategoryCountModel,
  getProductNameCountModel,
  getProductByNameModel,
  getProductByNameSortModel,
  deleteProductModel,
  getProductByCategoryModel,
  getProductByCategorySortModel,
  getProductFavCountModel,
  getProductFavModel,
  getProductFavSortModel
} = require('../model/product')
const helper = require('../helper/response')
const qs = require('querystring')
const redis = require('redis')
const client = redis.createClient()
const fs = require('fs')

module.exports = {
  getProduct: async (request, response) => {
    try {
      let {
        page,
        limit,
        productName,
        fav,
        productId,
        category,
        sort
      } = request.query
      page = parseInt(page)
      limit = parseInt(limit)
      category = parseInt(category)
      const totalData = productName
        ? await getProductNameCountModel(productName)
        : category
        ? await getProductCategoryCountModel(category)
        : fav
        ? await getProductFavCountModel()
        : await getProductCountModel()
      const totalPage = Math.ceil(totalData / limit)
      if (page > totalPage) {
        page = 1
      } else {
        page = page
      }
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
        const result = sort
          ? await getProductByNameSortModel(productName, limit, offset, sort)
          : await getProductByNameModel(productName, limit, offset)
        if (result.length > 0) {
          const newData = {
            result,
            pageInfo
          }
          client.setex(
            `getproduct:${JSON.stringify(request.query)}`,
            3600,
            JSON.stringify(newData)
          )
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
      } else if (category) {
        const result = sort
          ? await getProductByCategorySortModel(category, limit, offset, sort)
          : await getProductByCategoryModel(category, limit, offset)
        if (result.length > 0) {
          const newData = {
            result,
            pageInfo
          }
          client.setex(
            `getproduct:${JSON.stringify(request.query)}`,
            3600,
            JSON.stringify(newData)
          )
          return helper.response(
            response,
            200,
            `Success Get Product with Category ${category}`,
            result,
            pageInfo
          )
        } else {
          return helper.response(
            response,
            404,
            `Product with id : ${productId} is not found`,
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
      } else if (fav) {
        const result = sort
          ? await getProductFavSortModel(limit, offset, sort)
          : await getProductFavModel(limit, offset)
        const newData = {
          result,
          pageInfo
        }
        client.setex(
          `getproduct:${JSON.stringify(request.query)}`,
          3600,
          JSON.stringify(newData)
        )
        return helper.response(
          response,
          200,
          'Success Get Product',
          result,
          pageInfo
        )
      } else {
        const result = sort
          ? await getProductSortModel(limit, offset, sort)
          : await getProductModel(limit, offset)
        const newData = {
          result,
          pageInfo
        }
        client.setex(
          `getproduct:${JSON.stringify(request.query)}`,
          3600,
          JSON.stringify(newData)
        )
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
        client.setex(`getproductbyid:${id}`, 3600, JSON.stringify(result))
        return helper.response(
          response,
          200,
          'Success Get Product By Id',
          result
        )
      } else {
        return helper.response(response, 404, `Product By Id : ${id} Not Found`)
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
        product_name,
        product_price,
        product_desc,
        product_stock
      } = request.body

      const setData = {
        category_id,
        size_id,
        deliver_id,
        start_id,
        end_id,
        product_name,
        product_price,
        product_desc,
        product_stock,
        product_image: request.file === undefined ? '' : request.file.filename,
        product_created_at: new Date()
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
        product_stock,
        product_image: request.file === undefined ? '' : request.file.filename,
        product_updated_at: new Date()
      }
      const checkId = await getProductByIdModel(id)
      if (checkId.length > 0) {
        const image = checkId[0].product_image
        if (setData.product_image) {
          await fs.unlink(`./uploads/product/${image}`, (err) => {
            if (!err) {
              console.log(
                `successfully updated ${image} with ${setData.product_image}`
              )
            } else {
              console.log('Image that would be deleted does not exist')
            }
          })
        } else {
          setData.product_image = image
        }
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
  },
  deleteProduct: async (request, response) => {
    try {
      const { id } = request.params
      const checkId = await getProductByIdModel(id)

      if (checkId.length > 0) {
        const image = checkId[0].product_image
        fs.unlink(`./uploads/product/${image}`, (err) => {
          if (!err) {
            console.log(`successfully deleted ${image}`)
          } else {
            console.log('Image that would be deleted does not exist')
          }
        })
        const result = await deleteProductModel(id)
        return helper.response(
          response,
          200,
          `Succeed Deleting the Product by id ${id} and image ${image}`,
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
