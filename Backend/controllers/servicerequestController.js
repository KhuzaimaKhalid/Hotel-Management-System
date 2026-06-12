const { pool } = require('../config/connectdb')

const createServiceRequest = async(req,res)=>{
    try {
        const {requeststatus,guest_id,service_id,reservation_id} = req.body

        if(requeststatus === undefined || !guest_id || !service_id || !reservation_id){
            return res.status(400).json({status:"failed",message:"All fields are required"})
        }

        const validate = await pool.query('SELECT g.id, s.id, r.id FROM guest g, service s, reservations r WHERE g.id = $1 AND s.id = $2 AND r.id = $3',[guest_id, service_id, reservation_id])
        if (validate.rows.length === 0) {
            return res.status(400).json({ status: "failed", message: "Invalid guest_id, service_id or reservation_id" })
        }

        await pool.query('INSERT INTO servicerequest(requeststatus,guest_id,service_id,reservation_id) VALUES($1,$2,$3,$4)',[requeststatus,guest_id,service_id,reservation_id])

        const serviceResult = await pool.query('SELECT serviceprice FROM service WHERE id = $1', [service_id])
        const servicePrice = serviceResult.rows[0].serviceprice

        await pool.query('UPDATE invoice SET servicecharges = servicecharges + $1 WHERE reservation_id = $2', [servicePrice, reservation_id])

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

const getAllServiceRequest = async (req, res) => {
    try {

        const result = await pool.query('SELECT * FROM servicerequest')

        res.status(200).json({status: "success", data: result.rows})

    } catch (error) {
        console.log(error)
        res.status(500).json({status: "failed", message: "failed to fetch service request"})
    }
}

module.exports = {
    createServiceRequest,
    getServiceRequestById,
    getAllServiceRequest
}