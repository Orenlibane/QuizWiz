const express = require('express')
const requireAuth = require('../../middlewares/requireAuth.middleware')
const {getUser, getUsers, deleteUser, getLoggedIn} = require('./user.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)
// router.get('/', requireAuth, getUsers)
// router.delete('/:id',  requireAuth, deleteUser)

router.get('/', getUsers)
router.get('/getLoggedIn', getLoggedIn)
router.get('/:id', getUser)
router.delete('/:id', deleteUser)

module.exports = router