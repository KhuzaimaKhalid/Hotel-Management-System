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

const getAllRooms = async (req, res) => {
    try {

        const result = await pool.query(`
            SELECT 
                room.id,
                room.roomnumber,
                room.floor,
                roomtype.typename
            FROM room
            JOIN roomtype
            ON room.roomtype_id = roomtype.id
        `)

        res.status(200).json({status: "success", data: result.rows})

    } catch (error) {
        console.log(error)
        res.status(500).json({status: "failed", message: "failed to fetch rooms"})
    }
}

const updateRoom = async(req,res) =>{
    try {
        const {id} = req.params
        const {roomnumber,floor,roomtype_id} = req.body

        if(!roomnumber || !floor || !roomtype_id){
            return res.status(400).json({status:"failed",message:"All fields are required"})
        }

        const result = await pool.query('UPDATE room SET roomnumber = $1, floor = $2, roomtype_id = $3 WHERE id = $4',[roomnumber,floor,roomtype_id,id])

        if(!result){
            return res.status(400).json({status:"failed",message:"data not fetched"})
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({status:"failed",message:"update room failed"})
    }
}

module.exports = {
    createRoom,
    getRoomById,
    getAllRooms
}