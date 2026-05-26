const express = require('express')

const { guestSignup, staffSignup, loginGuest, loginStaff, loginAdmin, getGuestId, getAllGuests, getAllStaff,getAllUsers, getUserById} = require('../controllers/userController')
const router = express.Router()

router.post('/guestSignup', guestSignup)
.post('/staffSignup', staffSignup)
.post('/loginGuest', loginGuest)
.post('/loginStaff', loginStaff)
.post('/staffSignup', staffSignup)
.post('/loginAdmin', loginAdmin)
.get('/getGuestId/:user_id',getGuestId)
.get('/getAllGuests',getAllGuests)
.get('/getAllStaff',getAllStaff)
.get('/getAllUsers',getAllUsers)
router.get('/getUserById/:id', getUserById)

module.exports = router