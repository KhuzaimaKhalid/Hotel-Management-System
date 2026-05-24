const express = require('express')

const { createRequest, getRequestById } = require('../controllers/maintenancerequestController')
const router = express.Router()

router.post('/createRequest', createRequest)
    .get('/getRequestById/:id', getRequestById)


module.exports = router