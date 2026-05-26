const express = require('express')

const { createInvoice, getInvoiceById, getInvoiceByUser, getAllInvoices } = require('../controllers/invoiceController')
const router = express.Router()

router.post('/createInvoice', createInvoice)
    .get('/getInvoiceById/:id', getInvoiceById)
    .get('/getInvoiceByUser/:user_id', getInvoiceByUser)
    .get('/getAllInvoices', getAllInvoices)

module.exports = router