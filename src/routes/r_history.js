const router = require('express').Router()
const { authorization, isAdmin } = require('../middleware/auth')

const {
  getHistory,
  postHistory,
  deleteHistory,
  patchHistory
} = require('../controller/c_history')

router.get('/', authorization, getHistory)
router.post('/', authorization, postHistory)
router.delete('/', authorization, deleteHistory)
router.patch('/', authorization, isAdmin, patchHistory)

module.exports = router
