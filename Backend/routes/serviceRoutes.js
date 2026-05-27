const express = require('express')

const { createService, getServiceById,getAllService } = require('../controllers/serviceController')
const router = express.Router()

router.post('/createService', createService)
    .get('/getServiceById/:id', getServiceById)
 .get('/getAllService', getAllService)

module.exports = router