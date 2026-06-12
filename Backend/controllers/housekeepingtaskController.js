const { pool } = require('../config/connectdb')

const createTask = async (req, res) => {
    try {
        const { taskdate, taskstatus, notes, maintenancestatus, room_id, staff_id } = req.body
        if (!taskdate || taskstatus === undefined || !notes || maintenancestatus === undefined || !room_id || !staff_id) {
            return res.status(400).json({ status: "failed", message: "All fields are required" })
        }
        const validate = await pool.query('SELECT r.id, s.id FROM room r, staff s WHERE r.id = $1 AND s.id = $2', [room_id, staff_id])
        if (validate.rows.length === 0) {
            return res.status(400).json({ status: "failed", message: "Invalid room_id or staff_id" })
        }
        const result = await pool.query('INSERT INTO housekeepingtask (taskdate, taskstatus, notes, maintenancestatus, room_id, staff_id) VALUES ($1, $2, $3, $4, $5, $6)',  [taskdate, taskstatus, notes, maintenancestatus, room_id, staff_id]);
        if (!result) {
            return res.status(400).json({ status: "failed", message: "data not fetched" })
        }
        res.status(200).json({ status: "success", message: "created task sucessfully" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ status: "failed", message: "create task failed" })
    }
}

const getTaskById = async (req, res) => {
    try {
        const { id } = req.params

        const result = await pool.query('select * from housekeepingtask where id = ($1)', [id])

        if (!result) {
            return res.status(400).json({ status: "failed", message: "data not fetched" })
        }
        res.status(200).json({ status: "success", data: result.rows })
    } catch (error) {
        console.log(error)
        res.status(500).json({ status: "failed", message: "get task failed" })
    }
}

const getAlltask = async (req, res) => {
    try {

        const result = await pool.query('SELECT * FROM housekeepingtask')

        res.status(200).json({status: "success", data: result.rows})

    } catch (error) {
        console.log(error)
        res.status(500).json({status: "failed", message: "failed to fetch task"})
    }
}

module.exports = {
    createTask,
    getTaskById,
    getAlltask
}