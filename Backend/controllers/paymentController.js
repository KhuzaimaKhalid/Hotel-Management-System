const { pool } = require('../config/connectdb')

const createPayment = async(req,res)=>{
    try {
        const {paymentdate,paymentmethod,amount,transactionreference,invoice_id} = req.body
        if(!paymentdate || !paymentmethod || !amount|| !transactionreference || !invoice_id){
            return res.status(400).json({status:"failed",message:"All fields are required"})
        }
        const invoiceExists = await pool.query( 'SELECT id FROM invoice WHERE id = $1', [invoice_id]);
        
        if (invoiceExists.rows.length === 0) {
            return res.status(400).json({ status: "failed", message: "invoice id does not exist"});
        }

        const result = await pool.query('INSERT INTO payment(paymentdate,paymentmethod,amount,transactionreference,invoice_id) VALUES($1,$2,$3,$4,$5)',[paymentdate,paymentmethod,amount,transactionreference,invoice_id])

        if(!result){
            return res.status(400).json({status:"failed",message:"data not fetched"})
        }

        res.status(200).json({status:"success",message:"created payment sucessfully"})
        
    } catch (error) {
        console.log(error)
        res.status(500).json({status:"failed",message:"create payment failed"})
    }
}

const getPaymentById = async(req,res)=>{
    try {
        const {id} = req.params

        const result = await pool.query('select * from payment where id = $1',[id])

        if(!result){
            return res.status(400).json({status:"failed",message:"data not fetched"})
        }

        res.status(200).json({status:"success",data:result.rows})
        
    } catch (error) {
        console.log(error)
        res.status(500).json({status:"failed",message:"get payment failed"})
    }
}

const getAllPayment = async (req, res) => {
    try {

        const result = await pool.query('SELECT * FROM payment')

        res.status(200).json({status: "success", data: result.rows})

    } catch (error) {
        console.log(error)
        res.status(500).json({status: "failed", message: "failed to fetch payment"})
    }
}


const getTotalRevenue = async(req,res) =>{
    try {
        const result = await pool.query('select sum(amount) from payment')
        res.status(200).json({status: "success", data: result.rows[0].sum})
    } catch (error) {
         console.log(error)
        res.status(500).json({status: "failed", message: "failed to create revenue"})
    }
}

module.exports = {
    createPayment,
    getPaymentById,
    getAllPayment,
    getTotalRevenue
}