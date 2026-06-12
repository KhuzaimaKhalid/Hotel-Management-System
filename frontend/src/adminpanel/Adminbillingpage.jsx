import { useLocation, useNavigate, Navigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
export default function Adminbillingpage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [roomsOpen, setRoomsOpen] = useState(false);

  const adminEmail = localStorage.getItem("adminEmail");
  const receptionistemail = localStorage.getItem("receptionistemail");
  const role = localStorage.getItem("role");

  // Authentication check protecting route from unauthenticated users
  if (
    (!adminEmail && !receptionistemail) ||
    (role !== "admin" && role !== "receptionist")
  ) {
    return <Navigate to="/" replace />;
  }

  const handleLogout = () => {
    localStorage.removeItem("adminEmail");
    localStorage.removeItem("receptionistemail");
    localStorage.removeItem("role");
    navigate("/");
  };

  // Booking data passed from AdminBookRooms.js
  const bookingData = location.state || {
    guestName: "Walking Guest",
    guestEmail: "walkin@example.com",
    roomId: "mock_102",
    roomName: "Deluxe Suite Room",
    roomDescription: "Spacious luxury room with complimentary premium room service features.",
    roomImage: "default.png",
    checkIn: new Date().toISOString().split('T')[0],
    checkOut: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    adults: 2,
    children: 0,
    roomCount: 1,
    dynamicPrice: 12500
  };

  // Frontend-only confirmation processing handler 
  const handleConfirmBooking = async () => {
    try {
  
      // Create Invoice
      const invoiceRes = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/invoice/createInvoice`,
        {
          invoicedate: new Date(),
          roomcharges: bookingData.dynamicPrice,
          servicecharges: 0,
          taxamount: 0,
          paymentstatus: true,
          reservation_id: bookingData.reservation_id
          
        }
      );
  
      const invoice_id = invoiceRes.data.invoice_id;
      console.log(invoiceRes.data);
console.log(invoice_id);
  
      // Create Payment
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/payment/createPayment`,
        {
          paymentdate: new Date(),
          paymentmethod: "CASH",
          amount: bookingData.dynamicPrice,
          transactionreference: `TXN-${new Date().getFullYear()}-${Date.now()}`,
          invoice_id
        }
      );
  
      const mockSavedBookingResult = {
        _id: "BK" + Math.random().toString(36).substr(2, 9).toUpperCase(),
        guestName: bookingData.guestName,
        guestEmail: bookingData.guestEmail,
        checkIn: bookingData.checkIn,
        checkOut: bookingData.checkOut,
        adults: bookingData.adults,
        children: bookingData.children,
        roomCount: bookingData.roomCount,
        dynamicPrice: bookingData.dynamicPrice
      };
  
      navigate("/invoice", {
        state: {
          success: true,
          bookings: [mockSavedBookingResult]
        }
      });
  
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="wrap">
      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? "active" : ""}`}>
        <button
          className="close-btn"
          onClick={() => setSidebarOpen(false)}
        >
          ✖
        </button>
        {role === "admin" && adminEmail && (
          <div className="brand">
            <div className="logo">SE</div>
            <div>
              <h2>Stayease {role}</h2>
              <p>{role} panel</p>
            </div>
          </div>
        )}
        {role === "receptionist" && receptionistemail && (
          <div className="brand">
            <div className="logo">SE</div>
            <div>
              <h2>Stayease {role}</h2>
              <p>{role} panel</p>
            </div>
          </div>
        )}
         
        <nav className="nav">
          <a href="/admindashboard"><span className="icon">👥</span> Dashboard</a>
          <div className="dropdown">
            <button className="dropdown-btn" onClick={() => setRoomsOpen(!roomsOpen)}>
              <span className="icon">📦</span> Rooms ▾
            </button>
            {roomsOpen && (
              <div className="dropdown-content">
                <a href="/addroom">➕ Add Room</a>
                <a href="/viewrooms">👁 View Rooms</a>
                <a href="/bookrooms">📖 Book Rooms</a>
              </div>
            )}
          </div>
          
          {role === "admin" && (
            <a href="/adminuser"><span className="icon">👥</span> Users</a>
          )}
          <a href="/adminfeedbacks"><span className="icon">📊</span> Feedbacks</a>
          <a style={{ cursor: "pointer" }} onClick={handleLogout}><span className="icon">🚪</span> Logout</a>
        </nav>
      </aside>

      {/* Main content */}
      <main className="main">
        <div className="topbar">
          <button className="hamburger" onClick={() => setSidebarOpen(true)}>
            ☰
          </button>
          <div className="search">
            <input placeholder="Search bookings, users..." />
          </div>
        </div>

        <div className="billing-container">
          <h2>Booking Confirmation</h2>

          <div className="room-details card">
            <img src={`/Images/${bookingData.roomImage || "default.png"}`} alt="room" style={{ width: "200px", borderRadius: "8px" }} />
            <h3>{bookingData.roomName}</h3>
            <p>{bookingData.roomDescription}</p>
            <p>
              <b>Check-In:</b> {bookingData.checkIn}
            </p>
            <p>
              <b>Check-Out:</b> {bookingData.checkOut}
            </p>
            <p>
              <b>Guests:</b> {bookingData.adults} Adults, {bookingData.children} Children
            </p>
            <p>
              <b>Rooms:</b> {bookingData.roomCount}
            </p>
            <p>
              <b>Total Price:</b>{" "}
              <span style={{ color: "green", fontWeight: "bold" }}>
                PKR {bookingData.dynamicPrice}
              </span>
            </p>
          </div>

          <div className="extra-fields card" style={{ marginTop: "20px", padding: "15px" }}>
            <h3>Guest Information</h3>
            <div style={{ marginBottom: "10px" }}>
              <label style={{ display: "block", marginBottom: "5px" }}>👤 Guest Name</label>
              <input type="text" value={bookingData.guestName} readOnly style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }} />
            </div>

            <div>
              <label style={{ display: "block", marginBottom: "5px" }}>📧 Email</label>
              <input type="text" value={bookingData.guestEmail} readOnly style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }} />
            </div>
          </div>

          <button 
            className="btn confirm-btn" 
            onClick={handleConfirmBooking}
            style={{
              marginTop: "20px",
              padding: "12px 24px",
              background: "black",
              color: "white",
              border: "none",
              borderRadius: "25px",
              cursor: "pointer",
              fontWeight: "bold"
            }}
          >
            ✅ Confirm Booking
          </button>
        </div>
      </main>
    </div>
  );
}