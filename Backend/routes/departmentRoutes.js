const express = require('express')

const {getDeparments, postDepartment} = require('../controllers/departmentController')
const router = express.Router()

router.get('/getDeparments', getDeparments)
.post('/postDepartment', postDepartment)


module.exports = router