const express = require('express')

const { createReservation, getReservationById } = require('../controllers/reservationsController')
const router = express.Router()

router.post('/createReservation', createReservation)
    .get('/getReservationById/:id', getReservationById)


module.exports = router