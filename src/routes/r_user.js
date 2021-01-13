const router = require('express').Router()
const { authorization, isAdmin } = require('../middleware/auth')

const {
  registerUser,
  loginUser,
  editUser,
  deleteUser,
  editPassword,
  getUserById
} = require('../controller/c_user')

router.get('/:id', authorization, getUserById)
router.post('/register', registerUser)
router.post('/login', loginUser)
router.patch('/:id', authorization, editUser)
router.patch('/password/:id', authorization, editPassword)
router.delete('/:id', authorization, isAdmin, deleteUser)

module.exports = router
