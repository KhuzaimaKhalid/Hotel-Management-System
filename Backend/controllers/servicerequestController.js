const { pool } = require('../config/connectdb')

const createServiceRequest = async(req,res)=>{
    try {
        const {requeststatus,guest_id,service_id,reservation_id} = req.body

        if(requeststatus === undefined || !guest_id || !service_id || !reservation_id){
            return res.status(400).json({status:"failed",message:"All fields are required"})
        }

        const guestid = await pool.query('select s.guest_id,g.id from servicerequest s inner join guest g on s.guest_id = g.id WHERE g.id = $1',[guest_id])

        if(guestid.rows.length === 0){
            return res.status(400).json({status:"failed",message:"guest id does not exist"})
        }

        const serviceid = await pool.query('select s.service_id,se.id from servicerequest s inner join service se on s.service_id = se.id WHERE se.id = $1',[service_id])

        if(serviceid.rows.length === 0){
            return res.status(400).json({status:"failed",message:"service id does not exist"})
        }

        const reservationid = await pool.query('select s.reservation_id,r.id from servicerequest s inner join reservations r on s.reservation_id = r.id WHERE r.id = $1',[reservation_id])

        if(reservationid.rows.length === 0){
            return res.status(400).json({status:"failed",message:"reservation id does not exist"})
        }

        const result = await pool.query('INSERT INTO servicerequest(requeststatus,guest_id,service_id,reservation_id) VALUES($1,$2,$3,$4)',[requeststatus,guest_id,service_id,reservation_id])

        if(!result){
            return res.status(400).json({status:"failed",message:"data not fetched"})
        }

        res.status(200).json({status:"success",message:"created servicerequest sucessfully"})
        
    } catch (error) {
        console.log(error)
        res.status(500).json({status:"failed",message:"create servicerequest failed"})
    }
}

const getServiceRequestById = async(req,res)=>{
    try {
        const {id} = req.params

        const result = await pool.query('select * from servicerequest where id = $1',[id])

        if(!result){
            return res.status(400).json({status:"failed",message:"data not fetched"})
        }

        res.status(200).json({status:"success",data:result.rows})
        
    } catch (error) {
        console.log(error)
        res.status(500).json({status:"failed",message:"get servicerequest failed"})
    }
}

module.exports = {
    createServiceRequest,
    getServiceRequestById
}