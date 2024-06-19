const express = require('express')
const { register, login } = require('../controllers/userController.js')

const router = express.Router()

//register API endpoint
router.post('/register', register)

//login API endpoint
router.post('/login', login)

module.exports = router