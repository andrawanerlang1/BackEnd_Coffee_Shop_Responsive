const router = require('express').Router()
const product = require('./routes/r_product')
const history = require('./routes/r_history')
const historyDetail = require('./routes/r_history_detail')

router.use('/product', product)
router.use('/history', history)
router.use('/historydetail', historyDetail)

module.exports = router
