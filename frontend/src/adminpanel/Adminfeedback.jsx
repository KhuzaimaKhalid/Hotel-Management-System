import React, { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";

// Sample mock data to replace the API response
const mockFeedbacks = [
  {
    _id: "1",
    rating: 5,
    comments: "Excellent service! The room was spotless and the staff was incredibly helpful.",
    createdAt: "2026-05-20T14:30:00.000Z",
    guest: { username: "John Doe", email: "john@example.com" },
    room: { roomNumber: "101", roomType: "Deluxe Suite" }
  },
  {
    _id: "2",
    rating: 4,
    comments: "Very comfortable bed, though the Wi-Fi dropped out once or twice.",
    createdAt: "2026-05-22T09:15:00.000Z",
    guest: { username: "Jane Smith", email: "jane@example.com" },
    room: { roomNumber: "204", roomType: "Standard Double" }
  }
];

export default function AdminFeedback() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [roomsOpen, setRoomsOpen] = useState(false);
  const [feedbacks] = useState(mockFeedbacks);

  const navigate = useNavigate();
  const adminEmail = localStorage.getItem("adminEmail");
  const receptionistEmail = localStorage.getItem("receptionistemail");
  const role = localStorage.getItem("role");

  // Auth Guard Check
  if (
    (!adminEmail && !receptionistEmail) ||
    (role !== "admin" && role !== "receptionist")
  ) {
    return <Navigate to="/" replace />;
  }

  // ✅ Logout
  const handleLogout = () => {
    localStorage.removeItem("adminEmail");
    localStorage.removeItem("receptionistemail");
    localStorage.removeItem("role");
    navigate("/");
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

        {role === "receptionist" && receptionistEmail && (
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
          <button 
            onClick={handleLogout} 
            style={{ background: 'none', border: 'none', padding: 0, width: '100%', textAlign: 'left', cursor: 'pointer' }}
          >
            <span className="icon">🚪</span> Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main">
        <div className="topbar">
          <button className="hamburger" onClick={() => setSidebarOpen(true)}>
            ☰
          </button>
          <div className="search">
            <input placeholder="Search feedbacks..." />
          </div>
        </div>

        <div className="billing-container">
          <h2>📋 Guest Feedbacks</h2>

          {feedbacks.length === 0 ? (
            <p>No feedbacks yet</p>
          ) : (
            <div className="feedback-list">
              {feedbacks.map((fb) => (
                <div key={fb._id} className="card feedback-card">
                  <h3>
                    👤 {fb.guest?.username || "Unknown"} ({fb.guest?.email || "No Email"})
                  </h3>
                  <p>
                    ⭐ <b>{fb.rating}</b>/5
                  </p>
                  <p>{fb.comments}</p>
                  {fb.room && (
                    <p>
                      🏨 Room {fb.room.roomNumber} ({fb.room.roomType})
                    </p>
                  )}
                  <small>
                    Submitted on {new Date(fb.createdAt).toLocaleString()}
                  </small>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}