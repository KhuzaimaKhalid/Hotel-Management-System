const { pool } = require('../config/connectdb')

const createRole = async(req,res)=>{
    try {
        const {rolename} = req.body

        if(!rolename){
            return res.status(400).json({status:"failed",message:"All fields are required"})
        }

        const result = await pool.query('INSERT INTO role(rolename) VALUES($1)',[rolename])

        if(!result){
            return res.status(400).json({status:"failed",message:"data not fetched"})
        }

        res.status(200).json({status:"success",message:"created role sucessfully"})
        
    } catch (error) {
        console.log(error)
        res.status(500).json({status:"failed",message:"create role failed"})
    }
}

const getRoleById = async(req,res)=>{
    try {
        const {id} = req.params

        const result = await pool.query('select * from role where id = $1',[id])

        if(!result){
            return res.status(400).json({status:"failed",message:"data not fetched"})
        }

        res.status(200).json({status:"success",data:result.rows})
        
    } catch (error) {
        console.log(error)
        res.status(500).json({status:"failed",message:"get role failed"})
    }
}

module.exports = {
    createRole,
    getRoleById
}