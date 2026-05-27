const express = require('express')

const { createRequest, getRequestById, getAllRequest } = require('../controllers/maintenancerequestController')
const router = express.Router()

router.post('/createRequest', createRequest)
    .get('/getRequestById/:id', getRequestById)
    .get('/getAllRequest', getAllRequest)


module.exports = router