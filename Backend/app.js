const express = require('express')
const cors = require('cors')
require('dotenv').config()
const { connectDB } = require('./config/connectdb')
const userRoutes = require('./routes/userRoutes')
const departmentRoutes = require('./routes/departmentRoutes')
const housekeepingtaskRoutes = require('./routes/housekeepingtaskRoutes')
const invoiceRoutes = require('./routes/invoiceRoutes')
const maintenancerequestRoutes = require('./routes/maintenancerequestRoutes')
const notificationRoutes = require('./routes/notificationRoutes')
const paymentRoutes = require('./routes/paymentRoutes')
const reservationsRoutes = require('./routes/reservationsRoutes')
const roleRoutes = require('./routes/roleRoutes')
const roomtypeRoutes = require('./routes/roomtypeRoutes')
const roomRoutes = require('./routes/roomRoutes')
const serviceRoutes = require('./routes/serviceRoutes')
const servicerequestRoutes = require('./routes/servicerequestRoutes')

const app = express()
app.use(cors())
app.use(express.json())

const PORT = process.env.PORT

connectDB()


app.get('/', (req, res) => {
    res.send('welcome')
})

app.use('/api/user', userRoutes)
app.use('/api/department', departmentRoutes)
app.use('/api/housekeepingtask',housekeepingtaskRoutes)
app.use('/api/invoice',invoiceRoutes)
app.use('/api/maintenancerequest',maintenancerequestRoutes)
app.use('/api/notification',notificationRoutes)
app.use('/api/payment',paymentRoutes)
app.use('/api/reservation',reservationsRoutes)
app.use('/api/role',roleRoutes)
app.use('/api/roomtype',roomtypeRoutes)
app.use('/api/room',roomRoutes)
app.use('/api/service',serviceRoutes)
app.use('/api/servicerequest',servicerequestRoutes)


app.listen(PORT, () =>{
    console.log(`Listening on ${PORT}`)
    
})