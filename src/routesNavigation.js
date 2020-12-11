const router = require('express').Router()
const product = require('./routes/r_product')
const order = require('./routes/r_order')

router.use('/product', product)
router.use('/order', order)

module.exports = router
