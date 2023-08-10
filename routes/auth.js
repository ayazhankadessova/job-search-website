const express = require('express')
// Single routing
const router = express.Router()
const { login, register } = require('../controllers/auth')

router.post('/login', login)
router.post('/register', register)

module.exports = router
