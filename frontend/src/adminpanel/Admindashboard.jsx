import React, { useState, useEffect } from "react";
import "../CSS/style.css";
import { Navigate, useNavigate } from "react-router-dom";
import BarChart from "./BarChart";

export default function Admindashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [roomsOpen, setroomsOpen] = useState(false);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const navigate = useNavigate();

  const adminEmail = localStorage.getItem("adminEmail");
  const receptionistemail = localStorage.getItem("receptionistemail");
  const role = localStorage.getItem("role");

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/payment/getTotalRevenue`)
      .then((res) => res.json())
      .then((data) => {
        setTotalRevenue(data.data);
      })
      .catch((err) => console.log(err));
  }, []);


  if (
    (!adminEmail && !receptionistemail) ||
    (role !== "admin" && role !== "receptionist")
  ) {
    return <Navigate to="/" replace />;
  }

  // Pure Local Frontend Mock Statistics State Layout
  const [stats] = useState({
    totalUsers: 142,
    totalBookings: 89,
    totalRevenue: 1200000,
    totalFeedbacks: 34
  });

  const handleCardClick = (page) => {
    navigate(page);
  };

  const handleLogout = () => {
    localStorage.removeItem("adminEmail");
    localStorage.removeItem("receptionistemail");
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <div className="wrap" style={{ fontFamily: "Inter, sans-serif" }}>
      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? "active" : ""}`} id="sidebar">
        <button
          className="close-btn"
          onClick={() => setSidebarOpen(false)}
        >
          ✖
        </button>
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
            <button className="dropdown-btn" onClick={() => setroomsOpen(!roomsOpen)}>
              <span className="icon">📦</span> Rooms ▾
            </button>
            {roomsOpen && (
              <div className="dropdown-content">
                <a href="/adminaddroom">➕ Add Room</a>
                <a href="/adminviewrooms">👁 View Rooms</a>
                <a href="/bookrooms">📖 Book Rooms</a>
              </div>
            )}
          </div>

          {role === "admin" && (
            <a href="/adminuser"><span className="icon">👥</span> Users</a>
          )}

          <a style={{ cursor: "pointer" }} onClick={handleLogout}><span className="icon">🚪</span> Logout</a>
        </nav>

        <div className="divider" style={{ margin: "20px 0", borderBottom: "1px solid #edf2f7" }}></div>

        <div>
          <h4 style={{ fontSize: "12px", color: "#a0aec0", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.05em" }}>Quick actions</h4>
          <a href="/addroom" className="quick-btn" >+ New Room Unit</a>
          <a href="#" className="quick-btn export" onClick={(e) => { e.preventDefault(); alert("📊 Exporting current report summary to local spreadsheet..."); }} >Export Records</a>
        </div>
      </aside>

      {/* Main content */}
      <main className="main" style={{ background: "#f8f9fa", minHeight: "100vh" }}>
        <div className="topbar" >
          <div style={{ display: "flex", alignItems: "center", gap: "12px", flex: 1 }}>
            <button className="hamburger" onClick={() => setSidebarOpen(true)}>☰</button>
            <div className="search">
              <input placeholder="Search bookings, users..." />
            </div>
          </div>

          <div className="profile" style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontWeight: "700", textTransform: "capitalize" }}>{role}</div>
              <small style={{ color: "#718096" }}>{adminEmail || receptionistemail}</small>
            </div>
            <div className="avatar" style={{ width: "40px", height: "40px", borderRadius: "50%", background: "#e2e8f0" }}></div>
          </div>
        </div>

        {/* Dashboard Content Metrics Reports */}
        <section style={{ padding: "40px max(20px, 4%)" }}>
          <h2 style={{ marginBottom: "24px", fontSize: "1.75rem", fontWeight: "700", color: "#1a202c" }}>System Operational Reports</h2>

          <div className="grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "24px" }}>

            <div className="card" onClick={() => handleCardClick("/adminuser")} style={{ cursor: "pointer", background: "#fff", padding: "24px", borderRadius: "12px", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)" }}>
              <h3 >Total Users</h3>
              <div className="stat" >{stats.totalUsers}</div>
            </div>

            <div className="card" onClick={() => handleCardClick("/viewrooms")} style={{ cursor: "pointer", background: "#fff", padding: "24px", borderRadius: "12px", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)" }}>
              <h3>Total Bookings</h3>
              <div className="stat" >{stats.totalBookings}</div>
            </div>

            <div className="card" onClick={() => handleCardClick("/bookings-revenue")} >
              <h3>Total Gross Revenue</h3>
              <div className="stat">
                PKR {Number(totalRevenue).toLocaleString()}
              </div>
            </div>

            <div className="card" onClick={() => handleCardClick("/adminfeedbacks")} >
              <h3 >Total Feedbacks</h3>
              <div className="stat" >{stats.totalFeedbacks}</div>
            </div>

          </div>
          <div style={{ marginTop: "40px" }}>
            <BarChart />
          </div>
        </section>
      </main>
    </div>
  );
}