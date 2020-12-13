const router = require('Express').Router()
const {
  getHistory,
  postHistory,
  deleteHistory,
  patchHistory
} = require('../controller/c_history')

router.get('/', getHistory)
router.post('/', postHistory)
router.delete('/', deleteHistory)
router.patch('/', patchHistory)

module.exports = router
