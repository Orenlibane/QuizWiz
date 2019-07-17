const express = require('express')
const requireAuth = require('../../middlewares/requireAuth.middleware')
const { login, signup, logout } = require('./auth.controller')

const router = express.Router()

router.post('/login', login)
router.post('/signup', signup)
router.post('/logout', logout)
// middleware example (i'll have to add it on later): 
// router.post('/logout', requireAuth, logout)

module.exports = router