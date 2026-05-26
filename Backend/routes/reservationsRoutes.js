const express = require('express')

const { createReservation, getReservationById, getAllReservations } = require('../controllers/reservationsController')
const router = express.Router()

router.post('/createReservation', createReservation)
    .get('/getReservationById/:id', getReservationById)
     .get('/getAllReservations', getAllReservations)


module.exports = router