const router = require('express').Router()
const product = require('./routes/r_product')
const history = require('./routes/r_history')
const historyDetail = require('./routes/r_history_detail')
const coupon = require('./routes/r_coupon')
const user = require('./routes/r_user')

router.use('/product', product)
router.use('/history', history)
router.use('/historydetail', historyDetail)
router.use('/coupon', coupon)
router.use('/user', user)

module.exports = router
