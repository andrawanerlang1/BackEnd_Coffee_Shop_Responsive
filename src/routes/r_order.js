const router = require('express').Router()
const {
  getOrderItem,
  postOrderItem,
  postOrder
} = require('../controller/c_order')

router.get('/', getOrderItem)
router.post('/', postOrderItem)
router.post('/:id', postOrder)

module.exports = router
