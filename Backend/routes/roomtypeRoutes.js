const express = require('express')

const { createRoomType, getRoomTypeById, getAllRoomTypes } = require('../controllers/roomtypeController')
const router = express.Router()

router.post('/createRoomType', createRoomType)
    .get('/getRoomTypeById/:id', getRoomTypeById)
.get('/getAllRoomTypes', getAllRoomTypes)

module.exports = router