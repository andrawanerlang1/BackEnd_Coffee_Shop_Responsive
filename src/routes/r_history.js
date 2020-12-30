const router = require('express').Router()
const { authorization, isAdmin } = require('../middleware/auth')

const {
  getHistory,
  getHistoryChart,
  postHistory,
  deleteHistory,
  getHistoryById,
  patchHistory
} = require('../controller/c_history')

router.get('/', authorization, getHistory)
router.get('/chart', authorization, getHistoryChart)
router.get('/:id', authorization, getHistoryById)
router.post('/', authorization, postHistory)
router.delete('/', authorization, deleteHistory)
router.patch('/', authorization, isAdmin, patchHistory)

module.exports = router
