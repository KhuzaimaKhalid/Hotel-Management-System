import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";

export default function StaffHousekeepingTasks() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [roomsOpen, setRoomsOpen] = useState(false);
  const [staffOpen, setStaffOpen] = useState(true);

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  // Form fields
  const [taskdate, setTaskdate] = useState("");
  const [taskstatus, setTaskstatus] = useState("false");
  const [notes, setNotes] = useState("");
  const [maintenancestatus, setMaintenancestatus] = useState("false");
  const [room_id, setRoomId] = useState("");
  const [staff_id, setStaffId] = useState("");
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

  const fetchTasks = () => {
    setLoading(true);
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/housekeepingtask/getAlltask`)
      .then((res) => {
        setTasks(res.data.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("adminEmail");
    localStorage.removeItem("receptionistemail");
    localStorage.removeItem("role");
    navigate("/");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!taskdate || !notes.trim() || !room_id || !staff_id) {
      alert("⚠️ All fields are required.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/housekeepingtask/createTask`,
        {
          taskdate,
          taskstatus: taskstatus === "true",
          notes,
          maintenancestatus: maintenancestatus === "true",
          room_id: parseInt(room_id),
          staff_id: parseInt(staff_id),
        }
      );
      if (res.data.status === "success") {
        alert("✅ Housekeeping task created successfully!");
        setTaskdate("");
        setTaskstatus("false");
        setNotes("");
        setMaintenancestatus("false");
        setRoomId("");
        setStaffId("");
        setShowForm(false);
        fetchTasks();
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
        background: val ? "#c6f6d5" : "#fed7d7",
        color: val ? "#276749" : "#9b2c2c",
        padding: "2px 10px",
        borderRadius: "12px",
        fontWeight: "600",
        fontSize: "0.78rem",
      }}
    >
      {val ? "Done" : "Pending"}
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

          {/* Staff-specific section */}
          <div className="dropdown">
            <button className="dropdown-btn" onClick={() => setStaffOpen(!staffOpen)}>
              <span className="icon">🧹</span> Staff Tasks ▾
            </button>
            {staffOpen && (
              <div className="dropdown-content">
                <a href="/staffhousekeeping" style={{ fontWeight: "600", color: "#1a202c" }}>🧹 Housekeeping Tasks</a>
                <a href="/staffservicerequests">🛎 Service Requests</a>
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
            {showForm ? "✖ Cancel" : "+ New Task"}
          </button>
        </div>

        <section className="content" style={{ padding: "30px" }}>
          <h2>🧹 Housekeeping Tasks</h2>
          <p style={{ color: "#718096", marginBottom: "24px" }}>Manage and track all housekeeping assignments.</p>

          {/* Create Form */}
          {showForm && (
            <div style={{ background: "#fff", padding: "28px", borderRadius: "10px", boxShadow: "0 1px 4px rgba(0,0,0,0.1)", maxWidth: "560px", marginBottom: "32px" }}>
              <h3 style={{ marginBottom: "20px", fontSize: "1rem", fontWeight: "700" }}>Create New Housekeeping Task</h3>
              <form onSubmit={handleSubmit}>
                <div style={fieldStyle}>
                  <label style={labelStyle}>Task Date</label>
                  <input type="date" value={taskdate} onChange={(e) => setTaskdate(e.target.value)} style={inputStyle} required />
                </div>
                <div style={fieldStyle}>
                  <label style={labelStyle}>Room ID</label>
                  <input type="number" value={room_id} onChange={(e) => setRoomId(e.target.value)} placeholder="e.g. 1" style={inputStyle} required />
                </div>
                <div style={fieldStyle}>
                  <label style={labelStyle}>Staff ID</label>
                  <input type="number" value={staff_id} onChange={(e) => setStaffId(e.target.value)} placeholder="e.g. 2" style={inputStyle} required />
                </div>
                <div style={fieldStyle}>
                  <label style={labelStyle}>Task Status</label>
                  <select value={taskstatus} onChange={(e) => setTaskstatus(e.target.value)} style={inputStyle}>
                    <option value="false">Pending</option>
                    <option value="true">Done</option>
                  </select>
                </div>
                <div style={fieldStyle}>
                  <label style={labelStyle}>Maintenance Status</label>
                  <select value={maintenancestatus} onChange={(e) => setMaintenancestatus(e.target.value)} style={inputStyle}>
                    <option value="false">Not Required</option>
                    <option value="true">Required</option>
                  </select>
                </div>
                <div style={{ marginBottom: "20px" }}>
                  <label style={labelStyle}>Notes</label>
                  <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows="3" placeholder="e.g. Deep clean, replace towels..." style={{ ...inputStyle, resize: "none" }} required />
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  style={{ background: "#1a202c", color: "#fff", border: "none", padding: "10px 22px", borderRadius: "6px", cursor: submitting ? "not-allowed" : "pointer", fontWeight: "600", opacity: submitting ? 0.7 : 1 }}
                >
                  {submitting ? "Creating..." : "Create Task"}
                </button>
              </form>
            </div>
          )}

          {/* Task List */}
          {loading ? (
            <div style={{ textAlign: "center", padding: "40px" }}>⏳ Loading tasks...</div>
          ) : tasks.length === 0 ? (
            <div style={{ background: "#fff", padding: "40px", textAlign: "center", borderRadius: "8px", border: "1px dashed #cbd5e0" }}>
              <h3>No Tasks Found</h3>
              <p style={{ color: "#718096" }}>Create your first housekeeping task above.</p>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "20px" }}>
              {tasks.map((task) => (
                <div key={task.id} style={{ background: "#fff", borderRadius: "10px", padding: "20px", boxShadow: "0 2px 6px rgba(0,0,0,0.06)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                    <span style={{ fontWeight: "700", fontSize: "0.95rem" }}>Task #{task.id}</span>
                    {statusBadge(task.taskstatus)}
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "7px", fontSize: "0.88rem", color: "#4a5568" }}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span>📅 Date</span>
                      <strong>{task.taskdate ? new Date(task.taskdate).toLocaleDateString() : "—"}</strong>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span>🏠 Room ID</span>
                      <strong>{task.room_id}</strong>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span>👤 Staff ID</span>
                      <strong>{task.staff_id}</strong>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span>🔧 Maintenance</span>
                      {statusBadge(task.maintenancestatus)}
                    </div>
                    <div style={{ marginTop: "8px", paddingTop: "10px", borderTop: "1px solid #edf2f7" }}>
                      <span style={{ color: "#718096", fontSize: "0.82rem" }}>Notes</span>
                      <p style={{ margin: "4px 0 0 0", fontWeight: "500" }}>{task.notes || "—"}</p>
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

const fieldStyle = { marginBottom: "15px" };
const labelStyle = { display: "block", marginBottom: "5px", fontWeight: "600", fontSize: "0.9rem" };
const inputStyle = { width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc", boxSizing: "border-box", background: "#fff" };