import React, { useEffect, useRef, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

export default function Adminbookrooms() {
  const [roomPopupOpen, setRoomPopupOpen] = useState(false);
  const [roomCount, setRoomCount] = useState(1);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [roomsOpen, setRoomsOpen] = useState(false);

  const [guestName, setGuestName] = useState("");   
  const [guestEmail, setGuestEmail] = useState(""); 
  
  // Controlled local date picking state
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");

  const adminEmail = localStorage.getItem("adminEmail");
  const receptionistemail = localStorage.getItem("receptionistemail");
  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  // Unified Clean Authentication Gatekeeping Check
  if (
    (!adminEmail && !receptionistemail) ||
    (role !== "admin" && role !== "receptionist")
  ) {
    return <Navigate to="/" replace />;
  }

  const roomPopupRef = useRef(null);
  const roomInputRef = useRef(null);

  const roomValue = `${roomCount} Room(s), ${adults} Adults, ${children} Children`;

  // Static Local Master Room Data Portfolio
  const staticRoomsData = [
    {
      _id: "RM-101",
      roomName: "Deluxe Ocean View Suite",
      image: "deluxe.jpg",
      description: "A premium luxury experience featuring a king-sized master setup, private balcony lounge, and automated climate control.",
      price: 12000,
      status: "Available"
    },
    {
      _id: "RM-102",
      roomName: "Executive Family Room",
      image: "family.jpg",
      description: "Spacious layout tailored for family comfort, including two double beds, interconnected workstation, and high-speed Wi-Fi.",
      price: 18000,
      status: "Available"
    },
    {
      _id: "RM-103",
      roomName: "Standard Cozy Twin",
      image: "twin.jpg",
      description: "Perfect blend of minimalism and utility. Comprises twin single bedding configurations with smart entertainment panels.",
      price: 7500,
      status: "Available"
    }
  ];

  // Initialize with fallback static inventory tracking state
  const [filteredRooms, setFilteredRooms] = useState([]);

  useEffect(() => {
    // Prime values with basic standard base values on screen render initialization
    const initialRoomsWithPrice = staticRoomsData.map((room) => ({
      ...room,
      dynamicPrice: room.price.toFixed(2),
    }));
    setFilteredRooms(initialRoomsWithPrice);
  }, []);

  // Close popup when clicking outside target viewport boundary boxes
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        roomPopupRef.current &&
        !roomPopupRef.current.contains(e.target) &&
        !roomInputRef.current.contains(e.target)
      ) {
        setRoomPopupOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const calculatePrice = (basePrice) => {
    let price = basePrice;
    if (roomCount > 1) price += price * 0.1 * (roomCount - 1);
    if (adults > 0) price += price * 0.15 * (adults - 1);
    if (children > 0) price += price * 0.15 * children;
    return price.toFixed(2);
  };

  // Pure Local Search Computation Process handler
  const handleSearch = () => {
    if (!checkInDate || !checkOutDate) {
      alert("Please select both check-in and check-out dates");
      return;
    }

    // Runs standard pricing math modifications mapping arrays locally
    const roomsWithUpdatedPrices = staticRoomsData.map((room) => ({
      ...room,
      dynamicPrice: calculatePrice(room.price),
    }));
    
    setFilteredRooms(roomsWithUpdatedPrices);
  };

  // Safe client-side local navigation forwarding to billing
  const goToBilling = (room) => {
    if (!checkInDate || !checkOutDate) {
      alert("Please select both check-in and check-out dates");
      return;
    }

    navigate("/billingpage", {
      state: {
        roomId: room._id,
        roomName: room.roomName,
        roomImage: room.image,
        roomDescription: room.description,
        checkIn: checkInDate,
        checkOut: checkOutDate,
        roomCount,
        adults,
        children,
        dynamicPrice: calculatePrice(room.price),
        guestName,   
        guestEmail,  
      },
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("adminEmail");
    localStorage.removeItem("receptionistemail");
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <div className="wrap" style={{ fontFamily: "Inter, sans-serif" }}>
      {/* Sidebar Navigation */}
      <aside className={`sidebar ${sidebarOpen ? "active" : ""}`}>
        <button className="close-btn" onClick={() => setSidebarOpen(false)}>✖</button>
        <div className="brand">
          <div className="logo">SE</div>
          <div>
            <h2 style={{ textTransform: "capitalize" }}>Stayease {role}</h2>
            <p style={{ textTransform: "capitalize" }}>{role} panel</p>
          </div>
        </div>
         
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

      {/* Main UI Workspace Layout */}
      <main className="main" style={{ background: "#f8f9fa", minHeight: "100vh" }}>
        <div className="topbar" style={{ background: "#fff", padding: "15px 30px", borderBottom: "1px solid #edf2f7", display: "flex", alignItems: "center" }}>
          <button className="hamburger" onClick={() => setSidebarOpen(true)}>☰</button>
          <div className="search" style={{ marginLeft: "20px" }}>
            <input placeholder="Search bookings, users..." />
          </div>
        </div>

        {/* Local Booking Filter Form Module */}
        <div className="booking-box" style={{ background: "#fff", padding: "30px", borderRadius: "12px", margin: "30px", boxShadow: "0 4px 6px rgba(0,0,0,0.02)" }}>
          <h2 style={{ marginBottom: "20px", color: "#1a202c" }}>Book Reservation Unit</h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px", marginBottom: "20px" }}>
            <div className="form-group">
              <label style={{ display: "block", marginBottom: "6px", fontWeight: "600", fontSize: "0.9rem" }}>Guest Full Name</label>
              <input
                type="text"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                placeholder="Enter client profile name"
                style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #e2e8f0" }}
              />
            </div>
            <div className="form-group">
              <label style={{ display: "block", marginBottom: "6px", fontWeight: "600", fontSize: "0.9rem" }}>Guest Email Contact</label>
              <input
                type="email"
                value={guestEmail}
                onChange={(e) => setGuestEmail(e.target.value)}
                placeholder="client@example.com"
                style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #e2e8f0" }}
              />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "20px", marginBottom: "25px" }}>
            <div className="form-group">
              <label style={{ display: "block", marginBottom: "6px", fontWeight: "600", fontSize: "0.9rem" }}>Check-in Date</label>
              <input 
                type="date" 
                value={checkInDate} 
                onChange={(e) => setCheckInDate(e.target.value)}
                style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #e2e8f0" }} 
              />
            </div>
            <div className="form-group">
              <label style={{ display: "block", marginBottom: "6px", fontWeight: "600", fontSize: "0.9rem" }}>Check-out Date</label>
              <input 
                type="date" 
                value={checkOutDate} 
                onChange={(e) => setCheckOutDate(e.target.value)}
                style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #e2e8f0" }} 
              />
            </div>

            <div className="form-group room-select" style={{ position: "relative" }}>
              <label style={{ display: "block", marginBottom: "6px", fontWeight: "600", fontSize: "0.9rem" }}>Capacity configuration</label>
              <input
                type="text"
                value={roomValue}
                readOnly
                ref={roomInputRef}
                onClick={() => setRoomPopupOpen(!roomPopupOpen)}
                style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #e2e8f0", background: "#f8f9fa", cursor: "pointer" }}
              />
              {roomPopupOpen && (
                <div className="room-popup" ref={roomPopupRef} style={{ position: "absolute", top: "100%", left: 0, right: 0, background: "#fff", border: "1px solid #e2e8f0", borderRadius: "8px", padding: "15px", boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)", zIndex: 10, display: "flex", flexDirection: "column", gap: "10px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span>Rooms</span>
                    <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                      <button style={{ padding: "2px 8px" }} onClick={() => setRoomCount(Math.max(1, roomCount - 1))}>-</button>
                      <strong>{roomCount}</strong>
                      <button style={{ padding: "2px 8px" }} onClick={() => setRoomCount(roomCount + 1)}>+</button>
                    </div>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span>Adults</span>
                    <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                      <button style={{ padding: "2px 8px" }} onClick={() => setAdults(Math.max(1, adults - 1))}>-</button>
                      <strong>{adults}</strong>
                      <button style={{ padding: "2px 8px" }} onClick={() => setAdults(adults + 1)}>+</button>
                    </div>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span>Children</span>
                    <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                      <button style={{ padding: "2px 8px" }} onClick={() => setChildren(Math.max(0, children - 1))}>-</button>
                      <strong>{children}</strong>
                      <button style={{ padding: "2px 8px" }} onClick={() => setChildren(children + 1)}>+</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <button className="btn" onClick={handleSearch} style={{ background: "#1a202c", color: "#fff", border: "none", padding: "12px 28px", borderRadius: "6px", fontWeight: "600", cursor: "pointer" }}>
            Search Match Configurations
          </button>
        </div>

        {/* Room Result Cards Display Section */}
        <section className="rooms" style={{ padding: "0 30px 40px 30px" }}>
          <h2 style={{ marginBottom: "20px", color: "#2d3748" }}>Operational Inventory Units</h2>
          <div className="room-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "25px" }}>
            {filteredRooms.length === 0 && <p style={{ color: "#718096" }}>No items matching query metrics found.</p>}
            {filteredRooms.map((room) => (
              <div
                key={room._id}
                className="room-card"
                onClick={() => goToBilling(room)}
                style={{ cursor: "pointer", background: "#fff", borderRadius: "10px", overflow: "hidden", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.03)", border: "1px solid #edf2f7" }}
              >
                <img src={`Images/${room.image}`} alt={room.roomName} onError={(e) => { e.target.src = "/Images/default.png"; }} style={{ width: "100%", height: "200px", objectFit: "cover" }} />
                <div style={{ padding: "20px" }}>
                  <h3 style={{ margin: "0 0 10px 0", fontSize: "1.2rem", color: "#2d3748" }}>{room.roomName}</h3>
                  <h3 style={{ margin: "0 0 10px 0", fontSize: "1.05rem" }}>
                    Rate: <span style={{ textDecoration: "line-through", color: "#e53e3e", marginRight: "8px", fontWeight: "normal", fontSize: "0.95rem" }}>PKR {room.price}</span>
                    <span style={{ color: "#38a169", fontWeight: "700" }}>PKR {room.dynamicPrice}</span>
                  </h3>
                  <p style={{ color: "#718096", fontSize: "0.9rem", lineHeight: "1.5", margin: "0 0 15px 0" }}>{room.description}</p>
                  <span style={{ background: "#ebf8ff", color: "#2b6cb0", padding: "4px 10px", borderRadius: "12px", fontSize: "0.8rem", fontWeight: "600" }}>{room.status}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}