const router = require('express').Router()
const { authorization, isAdmin } = require('../middleware/auth')

const {
  registerUser,
  loginUser,
  editUser,
  deleteUser,
  getUserById
} = require('../controller/c_user')

router.get('/:id', authorization, getUserById)
router.post('/register', registerUser)
router.post('/login', loginUser)
router.patch('/:id', authorization, editUser)
router.delete('/:id', authorization, isAdmin, deleteUser)

module.exports = router
