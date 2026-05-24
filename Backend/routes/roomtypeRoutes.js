const express = require('express')

const { createRoomType, getRoomTypeById } = require('../controllers/roomtypeController')
const router = express.Router()

router.post('/createRoomType', createRoomType)
    .get('/getRoomTypeById/:id', getRoomTypeById)


module.exports = router