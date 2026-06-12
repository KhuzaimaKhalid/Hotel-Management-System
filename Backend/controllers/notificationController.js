const { pool } = require('../config/connectdb')

const createNotification = async (req, res) => {
    try {
        const { message, createdate, user_id} = req.body
        if (!message || !createdate || !user_id) {
            return res.status(400).json({ status: "failed", message: "All fields are required" })
        }
        const validate = await pool.query('SELECT id FROM users WHERE id = $1', [user_id])
        if (validate.rows.length === 0) {
            return res.status(400).json({ status: "failed", message: "Invalid user_id" })
        }
        const result = await pool.query('INSERT INTO notification (message, createdate, user_id) VALUES ($1, $2, $3)',  [message, createdate, user_id]);
        if (!result) {
            return res.status(400).json({ status: "failed", message: "data not fetched" })
        }
        res.status(200).json({ status: "success", message: "created notification sucessfully" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ status: "failed", message: "create notification failed" })
    }
}

const getNotificationById = async (req, res) => {
    try {
        const { id } = req.params

        const result = await pool.query('select * from notification where id = ($1)', [id])

        if (!result) {
            return res.status(400).json({ status: "failed", message: "data not fetched" })
        }
        res.status(200).json({ status: "success", data: result.rows })
    } catch (error) {
        console.log(error)
        res.status(500).json({ status: "failed", message: "get notification failed" })
    }
}

const getAllNotification = async (req, res) => {
    try {

        const result = await pool.query('SELECT * FROM notification')

        res.status(200).json({status: "success", data: result.rows})

    } catch (error) {
        console.log(error)
        res.status(500).json({status: "failed", message: "failed to fetch notification"})
    }
}

module.exports = {
    createNotification,
    getNotificationById,
    getAllNotification
}