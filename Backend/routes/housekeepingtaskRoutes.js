const express = require('express')

const { createTask, getTaskById, getAlltask } = require('../controllers/housekeepingtaskController')
const router = express.Router()

router.post('/createTask', createTask)
    .get('/getTaskById/:id', getTaskById)
    .get('/getAlltask', getAlltask)


module.exports = router