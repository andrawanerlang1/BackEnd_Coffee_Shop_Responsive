const router = require('express').Router()
const {
  getCoupon,
  getCouponById,
  postCoupon,
  deleteCoupon,
  patchCoupon
} = require('../controller/c_coupon')
const {
  getCouponRedis,
  getCouponByIdRedis,
  clearDataCouponRedis
} = require('../middleware/redis')

router.get('/', getCouponRedis, getCoupon)
router.get('/:id', getCouponByIdRedis, getCouponById)
router.post('/', clearDataCouponRedis, postCoupon)
router.delete('/', clearDataCouponRedis, deleteCoupon)
router.patch('/', clearDataCouponRedis, patchCoupon)

module.exports = router
