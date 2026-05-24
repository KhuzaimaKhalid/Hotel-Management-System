const express = require('express')

const { createTask, getTaskById } = require('../controllers/housekeepingtaskController')
const router = express.Router()

router.post('/createTask', createTask)
    .get('/getTaskById/:id', getTaskById)


module.exports = router