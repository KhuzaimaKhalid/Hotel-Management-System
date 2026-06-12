const express = require('express')

const { createReservation, getReservationById, getAllReservations, getTotalBookings } = require('../controllers/reservationsController')
const router = express.Router()

router.post('/createReservation', createReservation)
    .get('/getReservationById/:id', getReservationById)
    .get('/getAllReservations', getAllReservations)
    .get('/getTotalBookings', getTotalBookings)


module.exports = router