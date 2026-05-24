const express = require('express')

const { createNotification, getNotificationById } = require('../controllers/notificationController')
const router = express.Router()

router.post('/createNotification', createNotification)
    .get('/getNotificationById/:id', getNotificationById)


module.exports = router