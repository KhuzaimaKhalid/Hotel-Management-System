const express = require('express')

const { guestSignup, staffSignup, loginGuest, loginStaff, loginAdmin} = require('../controllers/userController')
const router = express.Router()

router.post('/guestSignup', guestSignup)
.post('/staffSignup', staffSignup)
.post('/loginGuest', loginGuest)
.post('/loginStaff', loginStaff)
.post('/staffSignup', staffSignup)
.post('/loginAdmin', loginAdmin)


module.exports = router