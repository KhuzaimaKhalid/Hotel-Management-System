import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";

export default function StaffNotifications() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [roomsOpen, setRoomsOpen] = useState(false);
  const [staffOpen, setStaffOpen] = useState(true);

  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const adminEmail = localStorage.getItem("adminEmail");
  const receptionistemail = localStorage.getItem("receptionistemail");
  const role = localStorage.getItem("role");

  if (
    (!adminEmail && !receptionistemail) ||
    (role !== "admin" && role !== "receptionist")
  ) {
    return <Navigate to="/" replace />;
  }

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/notification/getAllNotification`)
      .then((res) => {
        setNotifications(res.data.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
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
      {/* Sidebar */}
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
                <a href="/adminbookrooms">📖 Booked Rooms</a>
              </div>
            )}
          </div>

          <div className="dropdown">
            <button className="dropdown-btn" onClick={() => setStaffOpen(!staffOpen)}>
              <span className="icon">🧹</span> Staff Tasks ▾
            </button>
            {staffOpen && (
              <div className="dropdown-content">
                <a href="/staffhousekeeping">🧹 Housekeeping Tasks</a>
                <a href="/staffservicerequests">🛎 Service Requests</a>
                <a href="/staffnotifications" style={{ fontWeight: "600", color: "#1a202c" }}>🔔 Notifications</a>
              </div>
            )}
          </div>

          {role === "admin" && (
            <a href="/adminuser"><span className="icon">👥</span> Users</a>
          )}
          <a style={{ cursor: "pointer" }} onClick={handleLogout}><span className="icon">🚪</span> Logout</a>
        </nav>
      </aside>

      {/* Main */}
      <main className="main" style={{ background: "#f8f9fa", minHeight: "100vh" }}>
        <div className="topbar" style={{ background: "#fff", padding: "15px 30px", borderBottom: "1px solid #edf2f7" }}>
          <button className="hamburger" onClick={() => setSidebarOpen(true)}>☰</button>
        </div>

        <section className="content" style={{ padding: "30px" }}>
          <h2>🔔 Notifications</h2>
          <p style={{ color: "#718096", marginBottom: "24px" }}>All system notifications visible to staff.</p>

          {loading ? (
            <div style={{ textAlign: "center", padding: "40px" }}>⏳ Loading notifications...</div>
          ) : notifications.length === 0 ? (
            <div style={{ background: "#fff", padding: "40px", textAlign: "center", borderRadius: "8px", border: "1px dashed #cbd5e0" }}>
              <h3>No Notifications</h3>
              <p style={{ color: "#718096" }}>You're all caught up. No notifications at this time.</p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", maxWidth: "700px" }}>
              {notifications.map((notif) => (
                <div
                  key={notif.id}
                  style={{
                    background: "#fff",
                    borderRadius: "10px",
                    padding: "18px 22px",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "16px",
                    borderLeft: "4px solid #4299e1",
                  }}
                >
                  <div style={{ fontSize: "1.4rem", marginTop: "2px" }}>🔔</div>
                  <div style={{ flex: 1 }}>
                    <p style={{ margin: "0 0 6px 0", fontWeight: "600", color: "#2d3748" }}>{notif.message}</p>
                    <div style={{ display: "flex", gap: "20px", fontSize: "0.82rem", color: "#718096" }}>
                      <span>👤 User ID: {notif.user_id}</span>
                      <span>📅 {notif.createdate ? new Date(notif.createdate).toLocaleDateString() : "—"}</span>
                    </div>
                  </div>
                  <span style={{ background: "#ebf8ff", color: "#2b6cb0", padding: "2px 10px", borderRadius: "12px", fontWeight: "600", fontSize: "0.78rem", whiteSpace: "nowrap" }}>
                    #{notif.id}
                  </span>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}