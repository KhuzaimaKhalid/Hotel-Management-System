const express = require('express')

const { createRoom, getRoomById, getAllRooms, updateRoom, deleteRoom, getRoomPrice, getBookedRooms } = require('../controllers/roomController')
const router = express.Router()

router.post('/createRoom', createRoom)
    .get('/getRoomById/:id', getRoomById)
    .get('/getAllRooms',getAllRooms )
    .put('/updateRoom/:id', updateRoom)
    .delete('/deleteRoom/:id', deleteRoom)
    .get('/getRoomPrice/:id', getRoomPrice)
    .get('/getBookedRooms', getBookedRooms)

module.exports = router