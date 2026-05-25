import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import "../CSS/style.css";

// Sample mock data to replace the API response
const mockUsers = [
  { _id: "u1", username: "Alex Morgan", email: "alex@stayease.com", role: "receptionist" },
  { _id: "u2", username: "Sarah Jenkins", email: "sarah@gmail.com", role: "guest" },
  { _id: "u3", username: "Michael Chang", email: "michael@gmail.com", role: "guest" },
  { _id: "u4", username: "Admin Boss", email: "admin@stayease.com", role: "admin" }
];

export default function Adminuser() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [roomsOpen, setRoomsOpen] = useState(false);
  const [users, setUsers] = useState(mockUsers);
  const [search, setSearch] = useState("");

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

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("adminEmail");
    localStorage.removeItem("receptionistemail");
    localStorage.removeItem("role");
    navigate("/");
  };

  // Filter users for search dynamically
  const filteredUsers = users.filter(
    (user) =>
      user.username?.toLowerCase().includes(search.toLowerCase()) ||
      user.email?.toLowerCase().includes(search.toLowerCase())
  );

  const handleUserClick = (id) => {
    navigate(`/adminuserdetails/${id}`);
  };

  const handleDeleteUser = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter(user => user._id !== id));
      alert("User deleted successfully (Local State Only)");
    }
  };

  return (
    <div className="wrap">
      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? "active" : ""}`} id="sidebar">
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
            style={{ background: 'none', border: 'none', padding: 0, width: '100%', textAlign: 'left', cursor: 'pointer', color: 'inherit' }}
          >
            <span className="icon">🚪</span> Logout
          </button>
        </nav>

        <div className="divider"></div>

        <div>
          <h4 style={{ fontSize: "12px", color: "var(--muted)", marginBottom: "8px" }}>
            Quick actions
          </h4>
          <a href="#" className="quick-btn">+ New</a>
          <a href="#" className="quick-btn export">Export</a>
        </div>
      </aside>

      {/* Main content */}
      <main className="main">
        <div className="topbar">
          <div style={{ display: "flex", alignItems: "center", gap: "12px", flex: 1 }}>
            <button className="hamburger" onClick={() => setSidebarOpen(true)}>
              ☰
            </button>
            <div className="search">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ opacity: ".6" }}>
                <path d="M21 21l-4.35-4.35" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="11.5" cy="11.5" r="5.5" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <input
                placeholder="Search users..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="profile">
            <div style={{ textAlign: "right" }}>
              <div style={{ fontWeight: "700" }}>{role}</div>
              <small style={{ color: "var(--muted)" }}>{adminEmail || receptionistEmail}</small>
            </div>
            <div className="avatar"></div>
          </div>
        </div>

        {/* Users table */}
        <section className="content">
          <h2>Users List / Click Row for Details</h2>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr
                    key={user._id}
                    style={{ cursor: "pointer" }}
                    onClick={() => handleUserClick(user._id)}
                  >
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation(); // Prevents navigating to details page when clicking delete
                          handleDeleteUser(user._id);
                        }}
                        style={{
                          padding: "8px 12px",
                          fontSize: "14px", 
                          background: "#dc2626", 
                          color: "white",
                          border: "none",
                          borderRadius: "6px",
                          cursor: "pointer"
                        }} 
                        className='buttons'
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" style={{ textAlign: "center", padding: "20px" }}>
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
}