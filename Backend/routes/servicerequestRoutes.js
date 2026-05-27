const express = require('express')

const { createServiceRequest, getServiceRequestById, getAllServiceRequest } = require('../controllers/servicerequestController')
const router = express.Router()

router.post('/createServiceRequest', createServiceRequest)
    .get('/getServiceRequestById/:id', getServiceRequestById)
   .get('/getAllServiceRequest', getAllServiceRequest)

module.exports = router