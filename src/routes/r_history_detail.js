const router = require('express').Router()
const {
  getHistory,
  postHistoryDetail
} = require('../controller/c_history_detail')

router.post('/', postHistoryDetail)
router.get('/', getHistory)

module.exports = router
