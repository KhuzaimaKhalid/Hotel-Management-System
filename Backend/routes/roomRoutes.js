const express = require('express')

const { createRoom, getRoomById, getAllRooms, updateRoom, deleteRoom, getRoomPrice } = require('../controllers/roomController')
const router = express.Router()

router.post('/createRoom', createRoom)
    .get('/getRoomById/:id', getRoomById)
    .get('/getAllRooms',getAllRooms )
    .put('/updateRoom/:id', updateRoom)
    .delete('/deleteRoom/:id', deleteRoom)
    .get('/getRoomPrice/:id', getRoomPrice)

module.exports = router