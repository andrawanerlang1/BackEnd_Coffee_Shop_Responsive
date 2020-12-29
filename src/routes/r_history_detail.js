const router = require('express').Router()
const { authorization } = require('../middleware/auth')

const {
  getHistory,
  postHistoryDetail
} = require('../controller/c_history_detail')

router.post('/', authorization, postHistoryDetail)
router.get('/', authorization, getHistory)

module.exports = router
