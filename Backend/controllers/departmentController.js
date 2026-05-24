const { pool } = require('../config/connectdb')

const getDeparments = async (req, res) => {
    try {
        const result = await pool.query('select * from department')
        if (!result) {
            return res.status(400).json({ status: "failed", message: "data not fetched" })
        }
        res.status(200).json({ status: "success", data: result.rows })
    } catch (error) {
        console.log(error)
        res.status(500).json({ status: "failed", message: "Internal Server Error" })
    }
}

const postDepartment = async (req, res) => {
    try {
        const { departmentname } = req.body
        if (!departmentname) {
            return res.status(400).json({ status: "failed", message: "All fields are required" })
        }
        const result = await pool.query('INSERT INTO department (departmentname) VALUES ($1)', [departmentname])
        if (!result) {
            return res.status(400).json({ status: "failed", message: "data not fetched" })
        }
        res.status(200).json({ status: "success", message: "department name edit sucessfully" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ status: "failed", message: "Internal Server Error" })
    }
}

module.exports = { getDeparments, postDepartment }