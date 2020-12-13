const router = require('Express').Router()
const {
  getCoupon,
  postCoupon,
  deleteCoupon,
  patchCoupon
} = require('../controller/c_coupon')

router.get('/', getCoupon)
router.post('/', postCoupon)
router.delete('/', deleteCoupon)
router.patch('/', patchCoupon)

module.exports = router
