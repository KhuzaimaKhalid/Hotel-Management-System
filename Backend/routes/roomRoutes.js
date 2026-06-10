const express = require('express')

const { createRoom, getRoomById, getAllRooms, updateRoom, deleteRoom } = require('../controllers/roomController')
const router = express.Router()

router.post('/createRoom', createRoom)
    .get('/getRoomById/:id', getRoomById)
    .get('/getAllRooms',getAllRooms )
    .put('/updateRoom/:id', updateRoom)
    .delete('/deleteRoom/:id', deleteRoom)

module.exports = router