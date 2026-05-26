const express = require('express')

const { guestSignup, staffSignup, loginGuest, loginStaff, loginAdmin, getGuestId} = require('../controllers/userController')
const router = express.Router()

router.post('/guestSignup', guestSignup)
.post('/staffSignup', staffSignup)
.post('/loginGuest', loginGuest)
.post('/loginStaff', loginStaff)
.post('/staffSignup', staffSignup)
.post('/loginAdmin', loginAdmin)
.get('/getGuestId/:user_id',getGuestId)


module.exports = router