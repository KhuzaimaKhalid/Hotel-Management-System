import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../CSS/style.css";

export default function Adminviewrooms() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [roomsOpen, setRoomsOpen] = useState(true);

  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const role = localStorage.getItem("role") || "admin";

  const fetchRooms = () => {
    setLoading(true);
    axios.get(`${import.meta.env.VITE_API_URL}/api/room/getAllRooms`)
      .then((res) => {
        setRooms(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching rooms:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  // 🗑️ Delete Action Function Handler
  const handleDelete = async (roomId, roomNum) => {
    const confirmDelete = window.confirm(`Are you sure you want to permanently delete Room ${roomNum}?`);
    if (!confirmDelete) return;

    try {
      const response = await axios.delete(`${import.meta.env.VITE_API_URL}/api/room/deleteRoom/${roomId}`);
      if (response.data.success) {
        alert(`🗑️ Room ${roomNum} deleted successfully.`);
        setRooms((prev) => prev.filter((room) => room.id !== roomId));
      }
    } catch (err) {
      alert("Failed to delete room: " + (err.response?.data?.error || err.message));
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="wrap" style={{ fontFamily: "Inter, sans-serif" }}>
      {/* Sidebar Layout */}
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
                <a href="/adminviewrooms" style={{ fontWeight: "600", color: "#1a202c" }}>👁 View Rooms</a>
                <a href="/bookrooms">📖 Book Rooms</a>
              </div>
            )}
          </div>
         
          <a style={{ cursor: "pointer" }} onClick={handleLogout}><span className="icon">🚪</span> Logout</a>
        </nav>
      </aside>

      {/* Main Workspace */}
      <main className="main" style={{ background: "#f8f9fa", minHeight: "100vh" }}>
        <div className="topbar" style={{ background: "#fff", padding: "15px 30px", borderBottom: "1px solid #edf2f7" }}>
          <button className="hamburger" onClick={() => setSidebarOpen(true)}>☰</button>
          <button onClick={() => navigate("/adminaddroom")} style={{ background: "#1a202c", color: "#fff", border: "none", padding: "8px 16px", borderRadius: "6px", cursor: "pointer", fontWeight: "600", float: "right" }}>
            + Add New Room
          </button>
        </div>

        <section className="content" style={{ padding: "30px" }}>
          <h2>Current Operational Rooms</h2>
          <p style={{ color: "#718096", marginBottom: "20px" }}>Overview of inventory units registered in system memory.</p>

          {loading ? (
            <div style={{ textAlign: "center", padding: "40px" }}>⏳ Loading room records...</div>
          ) : rooms.length === 0 ? (
            <div style={{ background: "#fff", padding: "40px", textAlign: "center", borderRadius: "8px", border: "1px dashed #cbd5e0" }}>
              <h3>No Rooms Registered</h3>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "25px" }}>
              {rooms.map((room) => (
                <div key={room.id} style={{ background: "#fff", borderRadius: "8px", overflow: "hidden", boxShadow: "0 4px 6px rgba(0,0,0,0.05)", display: "flex", flexDirection: "column" }}>
                 

                  <div style={{ padding: "20px", flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <div>
                      <h3 style={{ margin: "0 0 5px 0" }}>Room {room.roomnumber} (Floor {room.floor})</h3>
                      <p style={{ color: "#4a5568", fontWeight: "600", fontSize: "0.85rem", margin: "0 0 10px 0" }}>
                        🏷️ {room.typename}
                      </p>
                      <p style={{ color: "#718096", fontSize: "0.9rem", minHeight: "40px" }}>{room.description}</p>
                    </div>

                    <div style={{ borderTop: "1px solid #edf2f7", paddingTop: "15px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                     <strong>{room.typename}</strong>
                      <div>
                        {/* 📝 Update Button - Redirects to the new Edit Page */}
                        <button
                          onClick={() => navigate(`/adminupdateroom/${room.id}`)}
                          style={{ background: "#e2e8f0", color: "#4a5568", border: "none", padding: "6px 12px", borderRadius: "4px", marginRight: "8px", cursor: "pointer", fontWeight: "600" }}
                        >
                          Update
                        </button>
                        {/* 🗑️ Delete Button */}
                        <button
                          onClick={() => handleDelete(room.id, room.roomnumber)}
                          style={{ background: "#fed7d7", color: "#9b2c2c", border: "none", padding: "6px 12px", borderRadius: "4px", cursor: "pointer", fontWeight: "600" }}
                        >
                          Delete
                        </button>
                      </div>
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