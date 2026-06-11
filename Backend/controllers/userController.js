const { pool } = require('../config/connectdb')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const guestSignup = async (req, res) => {
    const { firstname, lastname, phone, cnic,preferences, address, email, password, confirm_password } = req.body
    if (!firstname || !lastname || !phone || !cnic || !email || !password || !confirm_password) {
        return res.status(400).json({ status: "failed", message: "All fields are required" })
    }

    if (password !== confirm_password) {
        return res.status(400).json({ status: "failed", message: "Passwords don't match" })
    }

    try {
        const existingUser = await pool.query('SELECT id FROM users WHERE email = $1', [email])
        if (existingUser.rows.length > 0) {
            return res.status(400).json({ status: "failed", message: "User already exists" })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        await pool.query(
            'INSERT INTO users (email, password, role_id) VALUES ($1, $2, $3)',
            [email, hashedPassword, 3]
        )

        const savedUser = await pool.query('SELECT id FROM users WHERE email = $1', [email])
        const userId = savedUser.rows[0].id


        await pool.query(
            'INSERT INTO guest (user_id, firstname, lastname, phone, cnic, preferences, address) VALUES ($1, $2, $3, $4, $5, $6, $7)',
            [userId, firstname, lastname, phone, cnic, preferences || '', address || '']
        )

        const token = jwt.sign({ userID: userId, role_id: 3 }, process.env.JWT_SECRET, { expiresIn: '15m' })

        res.status(201).json({ status: "success", message: "Registration Success", token })

    } catch (error) {
        console.log(error)
        res.status(500).json({ status: "failed", message: "Registration failed" })
    }
}

const loginGuest = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({ status: "failed", message: "All fields are required" })
        }

        const result = await pool.query('select id,email,role_id,password from users where email = $1', [email])

        if (result.rows.length === 0) {
            return res.status(400).json({ status: "failed", message: "User does not exist" })
        }

        const user = result.rows[0]
        const isMatch = await bcrypt.compare(password,user.password)
        if (user.email === email && isMatch) {
            const token = jwt.sign({ userID: user.id, role_id: user.role_id }, process.env.JWT_SECRET, { expiresIn: '15m' })
            res.status(200).send({ "status": "success", "message": "Login Success", "token": token })
        } else {
            return res.status(400).json({ status: "failed", message: "email or password is wrong" })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ status: "failed", message: "Login failed" })
    }
}

const staffSignup = async (req, res) => {
    const { firstname, lastname, phone, address, hiredate, salary, email, password, confirm_password } = req.body
    if (!firstname || !lastname || !phone || !address || !hiredate || !salary || !email || !password || !confirm_password) {
        return res.status(400).json({ status: "failed", message: "All fields are required" })
    }

    if (password !== confirm_password) {
        return res.status(400).json({ status: "failed", message: "Passwords don't match" })
    }

    try {
        const existingUser = await pool.query('SELECT id FROM users WHERE email = $1', [email])
        if (existingUser.rows.length > 0) {
            return res.status(400).json({ status: "failed", message: "User already exists" })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        await pool.query(
            'INSERT INTO users (email, password, role_id) VALUES ($1, $2, $3)',
            [email, hashedPassword, 2]
        )

        const savedUser = await pool.query('SELECT id FROM users WHERE email = $1', [email])
        const userId = savedUser.rows[0].id


        await pool.query(
            'INSERT INTO staff (user_id, firstname, lastname, phone, email,address, hiredate,salary) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
            [userId, firstname, lastname, phone,email, address, hiredate, salary]
        )

        const token = jwt.sign({ userID: userId, role_id: 2 }, process.env.JWT_SECRET, { expiresIn: '15m' })

        res.status(201).json({ status: "success", message: "Registration Success", token })

    } catch (error) {
        console.log(error)
        res.status(500).json({ status: "failed", message: "Registration failed" })
    }
}

const loginStaff = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({ status: "failed", message: "All fields are required" })
        }

        const result = await pool.query('select id,email,role_id,password from users where email = $1', [email])

        if (result.rows.length === 0) {
            return res.status(400).json({ status: "failed", message: "User does not exist" })
        }

        const user = result.rows[0]
        const isMatch = await bcrypt.compare(password,user.password)
        if (user.email === email && isMatch) {
            const token = jwt.sign({ userID: user.id, role_id: user.role_id }, process.env.JWT_SECRET, { expiresIn: '15m' })
            res.status(200).send({ "status": "success", "message": "Login Success", "token": token })
        } else {
            return res.status(400).json({ status: "failed", message: "email or password is wrong" })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ status: "failed", message: "Login failed" })
    }
}

const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({ status: "failed", message: "All fields are required" })
        }

        const result = await pool.query('select id,email,role_id,password from users where email = $1', [email])

        if (result.rows.length === 0) {
            return res.status(400).json({ status: "failed", message: "User does not exist" })
        }

        const user = result.rows[0]

        if (user.role_id !== 1) {
            return res.status(403).json({ status: "failed", message: "Access denied, not an admin" })
        }

        const isMatch = password === user.password
        if (user.email === email && isMatch) {
            const token = jwt.sign({ userID: user.id, role_id: user.role_id }, process.env.JWT_SECRET, { expiresIn: '15m' })
            res.status(200).send({ "status": "success", "message": "Admin Login Success", "token": token })
        } else {
            return res.status(400).json({ status: "failed", message: "email or password is wrong" })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ status: "failed", message: "Login failed" })
    }
}

const getGuestId = async (req, res) => {
  try {
    const { user_id } = req.params
    const result = await pool.query('SELECT id FROM guest WHERE user_id = $1', [user_id])
    if (result.rows.length === 0) {
      return res.status(404).json({ status: "failed", message: "guest not found" })
    }
    res.status(200).json({ status: "success", guest_id: result.rows[0].id })
  } catch (error) {
    res.status(500).json({ status: "failed", message: "failed to get guest id" })
  }
}

const getAllGuests = async (req, res) => {
    try {

        const result = await pool.query('SELECT * FROM guest')

        res.status(200).json({status: "success", data: result.rows})

    } catch (error) {

        console.log(error)

        res.status(500).json({status: "failed", message: "failed to fetch guests"})
    }
}

const getAllStaff = async (req, res) => {
    try {

        const result = await pool.query('SELECT * FROM staff')

        res.status(200).json({status: "success", data: result.rows})

    } catch (error) {

        console.log(error)

        res.status(500).json({status: "failed", message: "failed to fetch sraff"})
    }
}

const getAllUsers = async (req, res) => {
    try {

        const result = await pool.query(`SELECT id,email,role_id FROM users`) 

        res.status(200).json({status: "success", data: result.rows})

    } catch (error) {

        console.log(error)

        res.status(500).json({status: "failed", message: "failed to fetch users"})
    }
}

const getUserById = async (req, res) => {
  try {

    const { id } = req.params;

    const result = await pool.query('SELECT * FROM users WHERE id = $1',[id]);

    if (result.rows.length === 0) {
      return res.status(404).json({status: "failed",message: "user not found"});
    }

    res.status(200).json({status: "success",data: result.rows[0]});

  } catch (error) {

    console.log(error);

    res.status(500).json({
      status: "failed", message: "failed to fetch user"});
  }
};
module.exports = {
    guestSignup,
    staffSignup,
    loginGuest,
    loginStaff,
    loginAdmin,
    getGuestId,
    getAllGuests,
    getAllStaff,
    getAllUsers,
    getUserById
}