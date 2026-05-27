const express = require('express')

const { createPayment, getPaymentById, getAllPayment } = require('../controllers/paymentController')
const router = express.Router()

router.post('/createPayment', createPayment)
    .get('/getPaymentById/:id', getPaymentById)
    .get('/getAllPayment', getAllPayment)

module.exports = router