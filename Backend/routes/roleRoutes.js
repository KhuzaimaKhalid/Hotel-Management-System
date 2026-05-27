const express = require('express')

const { createRole, getRoleById, getAllRole } = require('../controllers/roleController')
const router = express.Router()

router.post('/createRole', createRole)
    .get('/getRoleById/:id', getRoleById)
    .get('/getAllRole', getAllRole)

module.exports = router