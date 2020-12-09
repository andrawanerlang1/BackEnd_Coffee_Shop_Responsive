const router = require('Express').Router()
const {
  getProduct,
  getProductById,
  postProduct,
  patchProduct
} = require('../controller/c_product')

router.get('/', getProduct) // http://localhost:3000/product
router.get('/:id', getProductById) // http://localhost:3000/product/1
router.post('/', postProduct)
router.patch('/:id', patchProduct)

module.exports = router
