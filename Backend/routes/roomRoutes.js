const express = require('express')

const { createRoom, getRoomById, getAllRooms } = require('../controllers/roomController')
const router = express.Router()

router.post('/createRoom', createRoom)
    .get('/getRoomById/:id', getRoomById)
    .get('/getAllRooms',getAllRooms )

module.exports = router