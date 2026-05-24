const express = require('express')

const { createPayment, getPaymentById } = require('../controllers/paymentController')
const router = express.Router()

router.post('/createPayment', createPayment)
    .get('/getPaymentById/:id', getPaymentById)


module.exports = router