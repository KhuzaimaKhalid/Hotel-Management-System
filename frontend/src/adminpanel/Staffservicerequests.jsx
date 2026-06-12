import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";

export default function StaffServiceRequests() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [roomsOpen, setRoomsOpen] = useState(false);
  const [staffOpen, setStaffOpen] = useState(true);

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  // Form fields
  const [requeststatus, setRequeststatus] = useState("false");
  const [guest_id, setGuestId] = useState("");
  const [service_id, setServiceId] = useState("");
  const [reservation_id, setReservationId] = useState("");
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

  const fetchRequests = () => {
    setLoading(true);
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/servicerequest/getAllServiceRequest`)
      .then((res) => {
        setRequests(res.data.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("adminEmail");
    localStorage.removeItem("receptionistemail");
    localStorage.removeItem("role");
    navigate("/");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!guest_id || !service_id || !reservation_id) {
      alert("⚠️ All fields are required.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/servicerequest/createServiceRequest`,
        {
          requeststatus: requeststatus === "true",
          guest_id: parseInt(guest_id),
          service_id: parseInt(service_id),
          reservation_id: parseInt(reservation_id),
        }
      );
      if (res.data.status === "success") {
        alert("✅ Service request created successfully!");
        setRequeststatus("false");
        setGuestId("");
        setServiceId("");
        setReservationId("");
        setShowForm(false);
        fetchRequests();
      }
    } catch (err) {
      alert("Failed: " + (err.response?.data?.message || err.message));
    } finally {
      setSubmitting(false);
    }
  };

  const statusBadge = (val) => (
    <span
      style={{
        background: val ? "#c6f6d5" : "#fefcbf",
        color: val ? "#276749" : "#744210",
        padding: "2px 10px",
        borderRadius: "12px",
        fontWeight: "600",
        fontSize: "0.78rem",
      }}
    >
      {val ? "Completed" : "Pending"}
    </span>
  );

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
                <a href="/staffservicerequests" style={{ fontWeight: "600", color: "#1a202c" }}>🛎 Service Requests</a>
                <a href="/staffnotifications">🔔 Notifications</a>
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
            {showForm ? "✖ Cancel" : "+ New Request"}
          </button>
        </div>

        <section className="content" style={{ padding: "30px" }}>
          <h2>🛎 Service Requests</h2>
          <p style={{ color: "#718096", marginBottom: "24px" }}>Create and track guest service requests.</p>

          {/* Create Form */}
          {showForm && (
            <div style={{ background: "#fff", padding: "28px", borderRadius: "10px", boxShadow: "0 1px 4px rgba(0,0,0,0.1)", maxWidth: "480px", marginBottom: "32px" }}>
              <h3 style={{ marginBottom: "20px", fontSize: "1rem", fontWeight: "700" }}>Create Service Request</h3>
              <form onSubmit={handleSubmit}>
                <div style={fieldStyle}>
                  <label style={labelStyle}>Guest ID</label>
                  <input type="number" value={guest_id} onChange={(e) => setGuestId(e.target.value)} placeholder="e.g. 1" style={inputStyle} required />
                </div>
                <div style={fieldStyle}>
                  <label style={labelStyle}>Service ID</label>
                  <input type="number" value={service_id} onChange={(e) => setServiceId(e.target.value)} placeholder="e.g. 2" style={inputStyle} required />
                </div>
                <div style={fieldStyle}>
                  <label style={labelStyle}>Reservation ID</label>
                  <input type="number" value={reservation_id} onChange={(e) => setReservationId(e.target.value)} placeholder="e.g. 3" style={inputStyle} required />
                </div>
                <div style={fieldStyle}>
                  <label style={labelStyle}>Request Status</label>
                  <select value={requeststatus} onChange={(e) => setRequeststatus(e.target.value)} style={inputStyle}>
                    <option value="false">Pending</option>
                    <option value="true">Completed</option>
                  </select>
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  style={{ background: "#1a202c", color: "#fff", border: "none", padding: "10px 22px", borderRadius: "6px", cursor: submitting ? "not-allowed" : "pointer", fontWeight: "600", opacity: submitting ? 0.7 : 1, marginTop: "5px" }}
                >
                  {submitting ? "Creating..." : "Create Request"}
                </button>
              </form>
            </div>
          )}

          {/* Requests List */}
          {loading ? (
            <div style={{ textAlign: "center", padding: "40px" }}>⏳ Loading requests...</div>
          ) : requests.length === 0 ? (
            <div style={{ background: "#fff", padding: "40px", textAlign: "center", borderRadius: "8px", border: "1px dashed #cbd5e0" }}>
              <h3>No Service Requests</h3>
              <p style={{ color: "#718096" }}>Create a request using the button above.</p>
            </div>
          ) : (
            <div style={{ overflowX: "auto", background: "#fff", borderRadius: "10px", boxShadow: "0 2px 6px rgba(0,0,0,0.06)" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: "#f7fafc", borderBottom: "2px solid #edf2f7" }}>
                    {["ID", "Guest ID", "Service ID", "Reservation ID", "Status"].map((h) => (
                      <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontWeight: "700", fontSize: "0.85rem", color: "#4a5568" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {requests.map((req, i) => (
                    <tr key={req.id} style={{ borderBottom: "1px solid #edf2f7", background: i % 2 === 0 ? "#fff" : "#fafafa" }}>
                      <td style={tdStyle}>#{req.id}</td>
                      <td style={tdStyle}>{req.guest_id}</td>
                      <td style={tdStyle}>{req.service_id}</td>
                      <td style={tdStyle}>{req.reservation_id}</td>
                      <td style={tdStyle}>{statusBadge(req.requeststatus)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
const tdStyle = { padding: "12px 16px", fontSize: "0.9rem", color: "#2d3748" };