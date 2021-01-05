const router = require('express').Router()
const uploadImage = require('../middleware/multer')
const { authorization, isAdmin } = require('../middleware/auth')
const {
  getProductByIdRedis,
  getProductRedis,
  clearDataProductRedis
} = require('../middleware/redis')
const {
  getProduct,
  getProductById,
  postProduct,
  patchProduct,
  deleteProduct
} = require('../controller/c_product')

router.get('/', authorization, getProductRedis, getProduct)
router.get('/:id', authorization, getProductByIdRedis, getProductById)
router.post(
  '/',
  authorization,
  isAdmin,
  uploadImage,
  clearDataProductRedis,
  postProduct
)
router.patch(
  '/:id',
  authorization,
  isAdmin,
  uploadImage,
  clearDataProductRedis,
  patchProduct
)
router.delete(
  '/:id',
  authorization,
  isAdmin,
  clearDataProductRedis,
  deleteProduct
)

module.exports = router
