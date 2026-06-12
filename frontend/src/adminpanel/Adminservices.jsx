import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";

export default function AdminServices() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [roomsOpen, setRoomsOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(true);

  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  // Form fields
  const [servicename, setServicename] = useState("");
  const [serviceprice, setServiceprice] = useState("");
  const [description, setDescription] = useState("");
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

  const fetchServices = () => {
    setLoading(true);
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/service/getAllService`)
      .then((res) => {
        setServices(res.data.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("adminEmail");
    localStorage.removeItem("receptionistemail");
    localStorage.removeItem("role");
    navigate("/");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!servicename.trim() || !serviceprice || !description.trim()) {
      alert("⚠️ All fields are required.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/service/createService`,
        {
          servicename,
          serviceprice: parseFloat(serviceprice),
          description,
        }
      );
      if (res.data.status === "success") {
        alert("✅ Service created successfully!");
        setServicename("");
        setServiceprice("");
        setDescription("");
        setShowForm(false);
        fetchServices();
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

          <div className="dropdown">
            <button className="dropdown-btn" onClick={() => setAdminOpen(!adminOpen)}>
              <span className="icon">⚙️</span> Management ▾
            </button>
            {adminOpen && (
              <div className="dropdown-content">
                <a href="/adminnotifications">🔔 Notifications</a>
                <a href="/adminservices" style={{ fontWeight: "600", color: "#1a202c" }}>🛠 Services</a>
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
            {showForm ? "✖ Cancel" : "+ Add Service"}
          </button>
        </div>

        <section className="content" style={{ padding: "30px" }}>
          <h2>🛠 Services</h2>
          <p style={{ color: "#718096", marginBottom: "24px" }}>Manage hotel services available to guests.</p>

          {/* Create Form */}
          {showForm && (
            <div style={{ background: "#fff", padding: "28px", borderRadius: "10px", boxShadow: "0 1px 4px rgba(0,0,0,0.1)", maxWidth: "520px", marginBottom: "32px" }}>
              <h3 style={{ marginBottom: "20px", fontSize: "1rem", fontWeight: "700" }}>Add New Service</h3>
              <form onSubmit={handleSubmit}>
                <div style={fieldStyle}>
                  <label style={labelStyle}>Service Name</label>
                  <input
                    type="text"
                    value={servicename}
                    onChange={(e) => setServicename(e.target.value)}
                    placeholder="e.g. Room Service"
                    style={inputStyle}
                    required
                  />
                </div>
                <div style={fieldStyle}>
                  <label style={labelStyle}>Price (PKR)</label>
                  <input
                    type="number"
                    value={serviceprice}
                    onChange={(e) => setServiceprice(e.target.value)}
                    placeholder="e.g. 500"
                    min="0"
                    step="0.01"
                    style={inputStyle}
                    required
                  />
                </div>
                <div style={{ marginBottom: "20px" }}>
                  <label style={labelStyle}>Description</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows="3"
                    placeholder="Describe what this service includes..."
                    style={{ ...inputStyle, resize: "none" }}
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  style={{ background: "#1a202c", color: "#fff", border: "none", padding: "10px 22px", borderRadius: "6px", cursor: submitting ? "not-allowed" : "pointer", fontWeight: "600", opacity: submitting ? 0.7 : 1 }}
                >
                  {submitting ? "Adding..." : "Add Service"}
                </button>
              </form>
            </div>
          )}

          {/* Services Grid */}
          {loading ? (
            <div style={{ textAlign: "center", padding: "40px" }}>⏳ Loading services...</div>
          ) : services.length === 0 ? (
            <div style={{ background: "#fff", padding: "40px", textAlign: "center", borderRadius: "8px", border: "1px dashed #cbd5e0" }}>
              <h3>No Services Yet</h3>
              <p style={{ color: "#718096" }}>Add your first service using the button above.</p>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "20px" }}>
              {services.map((svc) => (
                <div
                  key={svc.id}
                  style={{
                    background: "#fff",
                    borderRadius: "10px",
                    padding: "22px",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.06)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <h3 style={{ margin: 0, fontSize: "1rem", fontWeight: "700", color: "#1a202c" }}>{svc.servicename}</h3>
                    <span style={{ background: "#ebf8ff", color: "#2b6cb0", padding: "2px 10px", borderRadius: "12px", fontWeight: "600", fontSize: "0.78rem" }}>
                      #{svc.id}
                    </span>
                  </div>
                  <p style={{ margin: 0, color: "#718096", fontSize: "0.88rem", lineHeight: "1.5" }}>{svc.description}</p>
                  <div style={{ marginTop: "auto", paddingTop: "12px", borderTop: "1px solid #edf2f7", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ color: "#718096", fontSize: "0.85rem" }}>Price</span>
                    <strong style={{ color: "#276749", fontSize: "1rem" }}>
                      PKR {Number(svc.serviceprice).toLocaleString()}
                    </strong>
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

const fieldStyle = { marginBottom: "15px" };
const labelStyle = { display: "block", marginBottom: "5px", fontWeight: "600", fontSize: "0.9rem" };
const inputStyle = { width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc", boxSizing: "border-box", background: "#fff" };