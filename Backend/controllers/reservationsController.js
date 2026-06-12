const { pool } = require('../config/connectdb')

const createReservation = async (req, res) => {
    try {
        const { reservationdate, numberofguest, reservationstatus, guest_id, room_id, staff_id } = req.body

        if (!reservationdate || !numberofguest || reservationstatus === undefined || !guest_id || !room_id || !staff_id) {
            return res.status(400).json({ status: "failed", message: "All fields are required" })
        }

        //const guestid = await pool.query('select r.guest_id,g.id from reservations r inner join guest g on r.guest_id = g.id WHERE g.id = $1', [guest_id])
        const guestid = await pool.query('SELECT id FROM guest WHERE id = $1', [guest_id])

        if (guestid.rows.length === 0) {
            return res.status(400).json({ status: "failed", message: "guest id does not exist" })
        }

        //const roomid = await pool.query('select r.room_id,rm.id from reservations r inner join room rm on r.room_id = rm.id WHERE rm.id = $1',[room_id])
        const roomid = await pool.query('SELECT id FROM room WHERE id = $1', [room_id])
        if (roomid.rows.length === 0) {
            return res.status(400).json({ status: "failed", message: "room id does not exist" })
        }

        //const staffid = await pool.query('select r.staff_id,s.id from reservations r inner join staff s on r.staff_id = s.id WHERE s.id = $1', [staff_id])
        const staffid = await pool.query('SELECT id FROM staff WHERE id = $1', [staff_id])
        if (staffid.rows.length === 0) {
            return res.status(400).json({ status: "failed", message: "staff id does not exist" })
        }

        //const result = await pool.query('INSERT INTO reservations(reservationdate,numberofguest,reservationstatus,guest_id,room_id,staff_id) VALUES($1,$2,$3,$4,$5,$6)', [reservationdate, numberofguest, reservationstatus, guest_id, room_id, staff_id])
        //const result = await pool.query('INSERT INTO reservations(reservationdate,numberofguest,reservationstatus,guest_id,room_id,staff_id) VALUES($1,$2,$3,$4,$5,$6) RETURNING id', [reservationdate, numberofguest, reservationstatus, guest_id, room_id, staff_id])
        const result = await pool.query(
            'INSERT INTO reservations(reservationdate,numberofguest,reservationstatus,guest_id,room_id,staff_id) VALUES($1,$2,$3,$4,$5,$6) RETURNING id',
            [reservationdate, numberofguest, reservationstatus, guest_id, room_id, staff_id]
        )
        if (!result) {
            return res.status(400).json({ status: "failed", message: "data not fetched" })
        }

        res.status(200).json({ status: "success", message: "created reservation sucessfully", reservation_id: result.rows[0].id })

    } catch (error) {
        console.log(error)
        res.status(500).json({ status: "failed", message: "create reservation failed" })
    }
}

const getReservationById = async (req, res) => {
    try {
        const { id } = req.params

        const result = await pool.query('select * from reservations where id = $1', [id])

        if (!result) {
            return res.status(400).json({ status: "failed", message: "data not fetched" })
        }

        res.status(200).json({ status: "success", data: result.rows })

    } catch (error) {
        console.log(error)
        res.status(500).json({ status: "failed", message: "get reservation failed" })
    }
}

const getAllReservations = async (req, res) => {
    try {

        const result = await pool.query('SELECT * FROM reservations')

        res.status(200).json({ status: "success", data: result.rows })

    } catch (error) {
        console.log(error)
        res.status(500).json({ status: "failed", message: "failed to fetch reservations" })
    }
}

const getTotalBookings = async (req, res) => {
    try {
        const result = await pool.query('select count(*) as totalBookings from reservations')
        if (!result) {
            return res.status(400).json({ status: "failed", message: "data not fetched" })
        }
        res.status(200).json({ status: "success", data: result.rows[0].totalbookings })
    } catch (error) {
        console.log(error)
        res.status(500).json({ status: "failed", message: "failed to fetch total bookings" })
    }
}

module.exports = {
    createReservation,
    getReservationById,
    getAllReservations,
    getTotalBookings
}