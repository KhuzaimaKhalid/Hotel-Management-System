const express = require('express')

const { createService, getServiceById } = require('../controllers/serviceController')
const router = express.Router()

router.post('/createService', createService)
    .get('/getServiceById/:id', getServiceById)


module.exports = router