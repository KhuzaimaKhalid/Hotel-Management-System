const { pool } = require('../config/connectdb')

const createService = async(req,res)=>{
    try {
        const {servicename,serviceprice,description} = req.body

        if(!servicename || !serviceprice || !description){
            return res.status(400).json({status:"failed",message:"All fields are required"})
        }

        const result = await pool.query('INSERT INTO service(servicename,serviceprice,description) VALUES($1,$2,$3)',[servicename,serviceprice,description])

        if(!result){
            return res.status(400).json({status:"failed",message:"data not fetched"})
        }

        res.status(200).json({status:"success",message:"created service sucessfully"})
        
    } catch (error) {
        console.log(error)
        res.status(500).json({status:"failed",message:"create service failed"})
    }
}

const getServiceById = async(req,res)=>{
    try {
        const {id} = req.params

        const result = await pool.query('select * from service where id = $1',[id])

        if(!result){
            return res.status(400).json({status:"failed",message:"data not fetched"})
        }

        res.status(200).json({status:"success",data:result.rows})
        
    } catch (error) {
        console.log(error)
        res.status(500).json({status:"failed",message:"get service failed"})
    }
}

const getAllService = async (req, res) => {
    try {

        const result = await pool.query('SELECT * FROM service')

        res.status(200).json({status: "success", data: result.rows})

    } catch (error) {
        console.log(error)
        res.status(500).json({status: "failed", message: "failed to fetch service"})
    }
}

module.exports = {
    createService,
    getServiceById,
    getAllService
}