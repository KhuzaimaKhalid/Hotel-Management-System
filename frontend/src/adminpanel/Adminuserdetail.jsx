import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import axios from "axios";
import "../CSS/style.css";

export default function Adminuserdetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [roomsOpen, setRoomsOpen] = useState(false);

  const [user, setUser] = useState(null);

  const [selectedRole, setSelectedRole] = useState("");

  const adminEmail = localStorage.getItem("adminEmail");
  const receptionistEmail = localStorage.getItem("receptionistemail");
  const role = localStorage.getItem("role");

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/user/getUserById/${id}`)
      .then((res) => {
        setUser(res.data.data);
        setSelectedRole(res.data.data.role);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  // Auth Guard Check
  if (
    (!adminEmail && !receptionistEmail) ||
    (role !== "admin" && role !== "receptionist")
  ) {
    return <Navigate to="/" replace />;
  }

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("adminEmail");
    localStorage.removeItem("receptionistemail");
    localStorage.removeItem("role");
    navigate("/");
  };

  // Local state update role simulation
  const handleRoleUpdate = async () => {
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/user/updateUser/${user.id}`,
        {
          email: user.email,
          role_id:
            selectedRole === "admin"
              ? 1
              : selectedRole === "receptionist"
                ? 2
                : 3,
        }
      );

      alert("User updated successfully");
      navigate("/adminuser");
    } catch (err) {
      console.log(err);
      alert("Update failed");
    }
  };

  const handleDeleteUser = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");

    if (!confirmDelete) return;

    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/user/deleteUser/${user.id}`
      );

      alert("User deleted successfully");
      navigate("/adminuser");
    } catch (err) {
      console.log(err);
      alert("Delete failed");
    }
  };

  if (!user) {
    return <p style={{ padding: "20px" }}>Loading user details...</p>;
  }

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
              <small style={{ color: "#718096" }}>{adminEmail || receptionistEmail}</small>
            </div>
            <div className="avatar" style={{ width: "40px", height: "40px", borderRadius: "50%", background: "#e2e8f0" }}></div>
          </div>
        </div>
        {/* User details container */}
        <section className="content">
          <h2>User Details / Update Role</h2>
          <div style={{ padding: "20px", background: "#fff", borderRadius: "8px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
            <p style={{ margin: "20px 0" }}><strong>User ID:</strong> {user.id}</p>
            <p style={{ margin: "20px 0" }}><strong>Email:</strong> {user.email}</p>
            <p><strong>Current Role:</strong> {user.role}</p>

            <div style={{ margin: "20px 0" }}>
              <label htmlFor="role-select" style={{ marginRight: "10px" }}><strong>Update Role:</strong></label>
              <select
                id="role-select"
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                style={{ padding: "4px 8px", borderRadius: "4px", border: "1px solid #ccc" }}
              >
                <option value="admin">admin</option>
                <option value="receptionist">receptionist</option>
                <option value="guest">guest</option>
              </select>
            </div>

            <button
              onClick={handleRoleUpdate}
              className="buttons"
              style={{
                padding: "8px 16px",
                marginTop: "10px",
                background: "rgb(47, 47, 47)",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer"
              }}
            >
              Save Changes
            </button>
            <button
              onClick={handleDeleteUser}
              style={{
                padding: "8px 16px",
                marginTop: "10px",
                marginLeft: "10px",
                background: "#dc2626",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer"
              }}
            >
              Delete User
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}