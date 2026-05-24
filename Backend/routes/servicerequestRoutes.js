const express = require('express')

const { createServiceRequest, getServiceRequestById } = require('../controllers/servicerequestController')
const router = express.Router()

router.post('/createServiceRequest', createServiceRequest)
    .get('/getServiceRequestById/:id', getServiceRequestById)


module.exports = router