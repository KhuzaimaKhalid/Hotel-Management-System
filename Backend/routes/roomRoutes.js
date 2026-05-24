const express = require('express')

const { createRoom, getRoomById } = require('../controllers/roomController')
const router = express.Router()

router.post('/createRoom', createRoom)
    .get('/getRoomById/:id', getRoomById)


module.exports = router