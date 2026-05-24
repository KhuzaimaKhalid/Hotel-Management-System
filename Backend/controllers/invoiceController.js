const { pool } = require('../config/connectdb')

const createInvoice = async (req, res) => {
    try {
        const { invoicedate, roomcharges, servicecharges, taxamount,paymentstatus,reservation_id } = req.body
        if (!invoicedate || !roomcharges || !servicecharges || !taxamount || !reservation_id) {
            return res.status(400).json({ status: "failed", message: "All fields are required" })
        }
        
        const result = await pool.query('INSERT INTO invoice (invoicedate, roomcharges, servicecharges, taxamount, paymentstatus, reservation_id) VALUES ($1, $2, $3, $4, $5, $6)',  [invoicedate, roomcharges, servicecharges, taxamount, paymentstatus, reservation_id]);
        if (!result) {
            return res.status(400).json({ status: "failed", message: "data not fetched" })
        }
        res.status(200).json({ status: "success", message: "created invoice sucessfully" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ status: "failed", message: "create invoice failed" })
    }
}

const getInvoiceById = async (req, res) => {
    try {
        const { id } = req.params

        const result = await pool.query('select * from invoice where id = ($1)', [id])

        if (!result) {
            return res.status(400).json({ status: "failed", message: "data not fetched" })
        }
        res.status(200).json({ status: "success", data: result.rows })
    } catch (error) {
        console.log(error)
        res.status(500).json({ status: "failed", message: "get invoice failed" })
    }
}

module.exports = {
    createInvoice,
    getInvoiceById
}