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
  getWeekTotal,
  getDayIncome
} = require('../controller/c_history')

router.get('/', authorization, getHistory)
router.get('/chart', authorization, getHistoryChart)
router.get('/:id', authorization, getHistoryById)
router.post('/', authorization, postHistory)
router.delete('/', authorization, deleteHistory)
router.patch('/', authorization, isAdmin, patchHistory)
router.post('/year', authorization, isAdmin, getYearIncome)
router.post('/week', authorization, isAdmin, getWeekTotal)
router.post('/day', authorization, isAdmin, getDayIncome)

module.exports = router
