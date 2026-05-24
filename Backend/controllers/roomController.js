const { pool } = require('../config/connectdb')

const createRoom = async(req,res)=>{
    try {
        const {roomnumber,floor,roomtype_id} = req.body

        if(!roomnumber || !floor || !roomtype_id){
            return res.status(400).json({status:"failed",message:"All fields are required"})
        }

        const roomtypeid = await pool.query('select r.roomtype_id,rt.id from room r inner join roomtype rt on r.roomtype_id = rt.id WHERE rt.id = $1',[roomtype_id])

        if(roomtypeid.rows.length === 0){
            return res.status(400).json({status:"failed",message:"roomtype id does not exist"})
        }

        const result = await pool.query('INSERT INTO room(roomnumber,floor,roomtype_id) VALUES($1,$2,$3)',[roomnumber,floor,roomtype_id])

        if(!result){
            return res.status(400).json({status:"failed",message:"data not fetched"})
        }

        res.status(200).json({status:"success",message:"created room sucessfully"})
        
    } catch (error) {
        console.log(error)
        res.status(500).json({status:"failed",message:"create room failed"})
    }
}

const getRoomById = async(req,res)=>{
    try {
        const {id} = req.params

        const result = await pool.query('select * from room where id = $1',[id])

        if(!result){
            return res.status(400).json({status:"failed",message:"data not fetched"})
        }

        res.status(200).json({status:"success",data:result.rows})
        
    } catch (error) {
        console.log(error)
        res.status(500).json({status:"failed",message:"get room failed"})
    }
}

module.exports = {
    createRoom,
    getRoomById
}