const express = require('express')

const { createInvoice, getInvoiceById, getInvoiceByUser } = require('../controllers/invoiceController')
const router = express.Router()

router.post('/createInvoice', createInvoice)
    .get('/getInvoiceById/:id', getInvoiceById)
    .get('/getInvoiceByUser/:user_id', getInvoiceByUser)


module.exports = router