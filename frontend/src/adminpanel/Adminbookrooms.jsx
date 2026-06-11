import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Adminbookrooms() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [roomsOpen, setRoomsOpen] = useState(false);
  const [bookedRooms, setBookedRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  const adminEmail = localStorage.getItem("adminEmail");
  const receptionistemail = localStorage.getItem("receptionistemail");
  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  if (
    (!adminEmail && !receptionistemail) ||
    (role !== "admin" && role !== "receptionist")
  ) {
    return <Navigate to="/" replace />;
  }

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/api/room/getBookedRooms`)
      .then((res) => {
        setBookedRooms(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("adminEmail");
    localStorage.removeItem("receptionistemail");
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <div className="wrap" style={{ fontFamily: "Inter, sans-serif" }}>
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
                <a href="/adminaddroom">➕ Add Room</a>
                <a href="/adminviewrooms">👁 View Rooms</a>
                <a href="/bookrooms" style={{ fontWeight: "600", color: "#1a202c" }}>📖 Booked Rooms</a>
              </div>
            )}
          </div>
          {role === "admin" && (
            <a href="/adminuser"><span className="icon">👥</span> Users</a>
          )}
          <a style={{ cursor: "pointer" }} onClick={handleLogout}><span className="icon">🚪</span> Logout</a>
        </nav>
      </aside>

      <main className="main" style={{ background: "#f8f9fa", minHeight: "100vh" }}>
        <div className="topbar" style={{ background: "#fff", padding: "15px 30px", borderBottom: "1px solid #edf2f7" }}>
          <button className="hamburger" onClick={() => setSidebarOpen(true)}>☰</button>
        </div>

        <section className="content" style={{ padding: "30px" }}>
          <h2>Booked Rooms</h2>
          <p style={{ color: "#718096", marginBottom: "20px" }}>All currently booked rooms.</p>

          {loading ? (
            <div style={{ textAlign: "center", padding: "40px" }}>⏳ Loading...</div>
          ) : bookedRooms.length === 0 ? (
            <div style={{ background: "#fff", padding: "40px", textAlign: "center", borderRadius: "8px", border: "1px dashed #cbd5e0" }}>
              <h3>No Booked Rooms</h3>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "25px" }}>
              {bookedRooms.map((room) => (
                <div key={room.id} style={{ background: "#fff", borderRadius: "8px", padding: "20px", boxShadow: "0 4px 6px rgba(0,0,0,0.05)" }}>
                  <h3 style={{ margin: "0 0 12px 0" }}>Room {room.roomnumber} (Floor {room.floor})</h3>
                  
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "0.9rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span style={{ color: "#718096" }}>🏷️ Room Type</span>
                      <strong>{room.typename}</strong>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span style={{ color: "#718096" }}>👥 No. of Guests</span>
                      <strong>{room.numberofguest}</strong>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span style={{ color: "#718096" }}>📌 Status</span>
                      <span style={{ background: "#fed7d7", color: "#9b2c2c", padding: "2px 10px", borderRadius: "12px", fontWeight: "600", fontSize: "0.8rem" }}>
                        Booked
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}