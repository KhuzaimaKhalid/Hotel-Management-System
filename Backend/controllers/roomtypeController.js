const { pool } = require('../config/connectdb')

const createRoomType = async(req,res)=>{
    try {
        const {typename,capacity,description,baseprice} = req.body

        if(!typename || !capacity || !description || !baseprice){
            return res.status(400).json({status:"failed",message:"All fields are required"})
        }

        const result = await pool.query('INSERT INTO roomtype(typename,capacity,description,baseprice) VALUES($1,$2,$3,$4)',[typename,capacity,description,baseprice])

        if(!result){
            return res.status(400).json({status:"failed",message:"data not fetched"})
        }

        res.status(200).json({status:"success",message:"created roomtype sucessfully"})
        
    } catch (error) {
        console.log(error)
        res.status(500).json({status:"failed",message:"create roomtype failed"})
    }
}

const getRoomTypeById = async(req,res)=>{
    try {
        const {id} = req.params

        const result = await pool.query('select * from roomtype where id = $1',[id])

        if(!result){
            return res.status(400).json({status:"failed",message:"data not fetched"})
        }

        res.status(200).json({status:"success",data:result.rows})
        
    } catch (error) {
        console.log(error)
        res.status(500).json({status:"failed",message:"get roomtype failed"})
    }
}

module.exports = {
    createRoomType,
    getRoomTypeById
}