const router = require('express').Router()
const { authorization, isAdmin } = require('../middleware/auth')

const {
  getHistory,
  getHistoryChart,
  postHistory,
  deleteHistory,
  getHistoryById,
  patchHistory,
  getYearIncome,
  getWeekIncome,
  getDayIncome,
  getMonthly
} = require('../controller/c_history')

router.get('/', authorization, getHistory)
router.get('/chart', authorization, getHistoryChart)
router.get('/:id', authorization, getHistoryById)
router.post('/', authorization, postHistory)
router.delete('/', authorization, deleteHistory)
router.patch('/', authorization, isAdmin, patchHistory)
router.post('/year', authorization, isAdmin, getYearIncome)
router.post('/week', authorization, isAdmin, getWeekIncome)
router.post('/day', authorization, isAdmin, getDayIncome)
router.post('/month', authorization, isAdmin, getMonthly)

module.exports = router
