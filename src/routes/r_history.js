const router = require('Express').Router()
const {
  getHistory,
  postHistory
  // deleteHistory
} = require('../controller/c_history')

router.get('/', getHistory)
router.post('/', postHistory)
// router.delete('/', deleteHistory)

module.exports = router
