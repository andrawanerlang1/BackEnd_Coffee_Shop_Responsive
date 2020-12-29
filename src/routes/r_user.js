const router = require('express').Router()
const {
  registerUser,
  loginUser,
  editUser,
  deleteUser,
  getUserById
} = require('../controller/c_user')

router.get('/:id', getUserById)
router.post('/register', registerUser)
router.post('/login', loginUser)
router.patch('/:id', editUser)
router.delete('/:id', deleteUser)

module.exports = router
