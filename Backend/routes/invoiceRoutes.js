const express = require('express')

const { createInvoice, getInvoiceById } = require('../controllers/invoiceController')
const router = express.Router()

router.post('/createInvoice', createInvoice)
    .get('/getInvoiceById/:id', getInvoiceById)


module.exports = router