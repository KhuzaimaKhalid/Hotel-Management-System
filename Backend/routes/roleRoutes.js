const express = require('express')

const { createRole, getRoleById } = require('../controllers/roleController')
const router = express.Router()

router.post('/createRole', createRole)
    .get('/getRoleById/:id', getRoleById)


module.exports = router