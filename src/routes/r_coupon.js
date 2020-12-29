const router = require('express').Router()
const uploadImage = require('../middleware/multerCoupon')
const { authorization, isAdmin } = require('../middleware/auth')
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

router.get('/', authorization, getCouponRedis, getCoupon)
router.get('/:id', authorization, getCouponByIdRedis, getCouponById)
router.post(
  '/',
  authorization,
  isAdmin,
  clearDataCouponRedis,
  uploadImage,
  postCoupon
)
router.delete('/', authorization, isAdmin, clearDataCouponRedis, deleteCoupon)
router.patch(
  '/',
  authorization,
  isAdmin,
  uploadImage,
  clearDataCouponRedis,
  patchCoupon
)

module.exports = router
