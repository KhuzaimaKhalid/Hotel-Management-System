import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";

export default function AdminNotifications() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [roomsOpen, setRoomsOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(true);

  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  // Form fields
  const [message, setMessage] = useState("");
  const [createdate, setCreatedate] = useState("");
  const [user_id, setUserId] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const adminEmail = localStorage.getItem("adminEmail");
  const receptionistemail = localStorage.getItem("receptionistemail");
  const role = localStorage.getItem("role");

  if (
    (!adminEmail && !receptionistemail) ||
    (role !== "admin" && role !== "receptionist")
  ) {
    return <Navigate to="/" replace />;
  }

  const fetchNotifications = () => {
    setLoading(true);
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
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("adminEmail");
    localStorage.removeItem("receptionistemail");
    localStorage.removeItem("role");
    navigate("/");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim() || !createdate || !user_id) {
      alert("⚠️ All fields are required.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/notification/createNotification`,
        {
          message,
          createdate,
          user_id: parseInt(user_id),
        }
      );
      if (res.data.status === "success") {
        alert("✅ Notification sent successfully!");
        setMessage("");
        setCreatedate("");
        setUserId("");
        setShowForm(false);
        fetchNotifications();
      }
    } catch (err) {
      alert("Failed: " + (err.response?.data?.message || err.message));
    } finally {
      setSubmitting(false);
    }
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

          {/* Admin-only management section */}
          <div className="dropdown">
            <button className="dropdown-btn" onClick={() => setAdminOpen(!adminOpen)}>
              <span className="icon">⚙️</span> Management ▾
            </button>
            {adminOpen && (
              <div className="dropdown-content">
                <a href="/adminnotifications" style={{ fontWeight: "600", color: "#1a202c" }}>🔔 Notifications</a>
                <a href="/adminservices">🛠 Services</a>
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
        <div className="topbar" style={{ background: "#fff", padding: "15px 30px", borderBottom: "1px solid #edf2f7", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <button className="hamburger" onClick={() => setSidebarOpen(true)}>☰</button>
          <button
            onClick={() => setShowForm(!showForm)}
            style={{ background: "#1a202c", color: "#fff", border: "none", padding: "8px 16px", borderRadius: "6px", cursor: "pointer", fontWeight: "600" }}
          >
            {showForm ? "✖ Cancel" : "+ Send Notification"}
          </button>
        </div>

        <section className="content" style={{ padding: "30px" }}>
          <h2>🔔 Notifications</h2>
          <p style={{ color: "#718096", marginBottom: "24px" }}>Send and manage system-wide notifications to users.</p>

          {/* Create Form */}
          {showForm && (
            <div style={{ background: "#fff", padding: "28px", borderRadius: "10px", boxShadow: "0 1px 4px rgba(0,0,0,0.1)", maxWidth: "520px", marginBottom: "32px" }}>
              <h3 style={{ marginBottom: "20px", fontSize: "1rem", fontWeight: "700" }}>Send New Notification</h3>
              <form onSubmit={handleSubmit}>
                <div style={fieldStyle}>
                  <label style={labelStyle}>Target User ID</label>
                  <input type="number" value={user_id} onChange={(e) => setUserId(e.target.value)} placeholder="e.g. 3" style={inputStyle} required />
                </div>
                <div style={fieldStyle}>
                  <label style={labelStyle}>Date</label>
                  <input type="date" value={createdate} onChange={(e) => setCreatedate(e.target.value)} style={inputStyle} required />
                </div>
                <div style={{ marginBottom: "20px" }}>
                  <label style={labelStyle}>Message</label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows="3"
                    placeholder="Enter notification message..."
                    style={{ ...inputStyle, resize: "none" }}
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  style={{ background: "#1a202c", color: "#fff", border: "none", padding: "10px 22px", borderRadius: "6px", cursor: submitting ? "not-allowed" : "pointer", fontWeight: "600", opacity: submitting ? 0.7 : 1 }}
                >
                  {submitting ? "Sending..." : "Send Notification"}
                </button>
              </form>
            </div>
          )}

          {/* Notifications List */}
          {loading ? (
            <div style={{ textAlign: "center", padding: "40px" }}>⏳ Loading notifications...</div>
          ) : notifications.length === 0 ? (
            <div style={{ background: "#fff", padding: "40px", textAlign: "center", borderRadius: "8px", border: "1px dashed #cbd5e0" }}>
              <h3>No Notifications Yet</h3>
              <p style={{ color: "#718096" }}>Use the button above to send your first notification.</p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", maxWidth: "720px" }}>
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
                    borderLeft: "4px solid #68d391",
                  }}
                >
                  <div style={{ fontSize: "1.4rem", marginTop: "2px" }}>🔔</div>
                  <div style={{ flex: 1 }}>
                    <p style={{ margin: "0 0 8px 0", fontWeight: "600", color: "#2d3748", fontSize: "0.95rem" }}>{notif.message}</p>
                    <div style={{ display: "flex", gap: "20px", fontSize: "0.82rem", color: "#718096" }}>
                      <span>👤 User ID: <strong>{notif.user_id}</strong></span>
                      <span>📅 {notif.createdate ? new Date(notif.createdate).toLocaleDateString() : "—"}</span>
                    </div>
                  </div>
                  <span style={{ background: "#f0fff4", color: "#276749", padding: "2px 10px", borderRadius: "12px", fontWeight: "600", fontSize: "0.78rem", whiteSpace: "nowrap" }}>
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

const fieldStyle = { marginBottom: "15px" };
const labelStyle = { display: "block", marginBottom: "5px", fontWeight: "600", fontSize: "0.9rem" };
const inputStyle = { width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc", boxSizing: "border-box", background: "#fff" };