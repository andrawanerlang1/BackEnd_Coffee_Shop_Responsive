const router = require('Express').Router()
const {
  getOrderItem,
  postOrderItem,
  postOrder
  //   deleteOrder
} = require('../controller/c_order')

router.get('/', getOrderItem)
router.post('/', postOrderItem)
router.post('/:id', postOrder)
// router.delete('/:id', deleteOrder)

module.exports = router
