const express = require('express')

const { createPayment, getPaymentById, getAllPayment,getTotalRevenue } = require('../controllers/paymentController')
const router = express.Router()

router.post('/createPayment', createPayment)
    .get('/getPaymentById/:id', getPaymentById)
    .get('/getAllPayment', getAllPayment)
    .get('/getTotalRevenue', getTotalRevenue)

module.exports = router