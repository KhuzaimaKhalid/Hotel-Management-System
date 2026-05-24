const {Pool} = require('pg')

const pool = new Pool({
        connectionString : process.env.DB_URL,
        ssl : {rejectunauthorized : false}
    })

const connectDB = async (DATABASE_URL) => {
  try {
    await pool.query('Select 1')
    console.log('Database Connected Successfully...')
    return pool
  } catch (error) {
    console.log(error)
  }
}

module.exports = { connectDB, pool }