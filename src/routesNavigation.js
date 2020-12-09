const router = require('express').Router()
const product = require('./routes/r_product')

router.use('/product', product)
module.exports = router
