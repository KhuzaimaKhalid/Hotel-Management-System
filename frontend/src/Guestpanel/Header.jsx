import { useState } from "react";
import { Link } from "react-router-dom";

export default function Header() {
  const [navOpen, setNavOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const guestEmail = localStorage.getItem("guestpanel");
  const adminEmail = localStorage.getItem("adminEmail");
  const receptionistemail = localStorage.getItem("receptionistemail");
  const role = localStorage.getItem("role");
  const userId = localStorage.getItem("userid");

  const handleLogout = () => {
    localStorage.removeItem("guestpanel");
    localStorage.removeItem("adminEmail");
    localStorage.removeItem("receptionistemail");
    localStorage.removeItem("role");
    localStorage.removeItem("userid");
    window.location.href = "/login";
  };

  return (
    <header className="header">
      <div className="logo">Stayease</div>

      <nav className={`nav ${navOpen ? "active" : ""}`}>
        <ul>
          {/* Show Home if user is logged in (guest, admin, or receptionist) */}
          {(guestEmail || adminEmail || receptionistemail) && (
            <li><Link to="/">Home</Link></li>
          )}

          {(guestEmail || adminEmail || receptionistemail) && (
            <li><Link to="/invoice">Invoices</Link></li>
          )}

          {(guestEmail || adminEmail || receptionistemail) && (
            <li><Link to={`/feedbacks/${userId || "guest"}`}>Feedbacks</Link></li>
          )}

          {role === "admin" && adminEmail && (
            <li>
              <Link to="/admindashboard">Admin Panel</Link>
            </li>
          )}

          {/* Guest dropdown */}
          {role === "guest" && guestEmail && (
            <div className="user-info" style={{ marginTop: "8px", position: "relative" }}>
              <span style={{ cursor: "pointer" }} onClick={() => setDropdownOpen(!dropdownOpen)}>
                Welcome, {role} {guestEmail}
              </span>
              {dropdownOpen && (
                <div className="headerdropdown">
                  <button onClick={handleLogout}>Logout</button>
                </div>
              )}
            </div>
          )}
         
          {/* Admin welcome + logout */}
          {role === "admin" && adminEmail && (
            <div className="user-info" style={{ marginTop: "8px", position: "relative" }}>
              <span>Welcome, {role} {adminEmail}</span>
              <div className="headerdropdown" style={{ display: "inline-block", marginLeft: "10px" }}>
                <button onClick={handleLogout}>Logout</button>
              </div>
            </div>
          )}

          {/* Receptionist welcome + logout */}
          {role === "receptionist" && receptionistemail && (
            <div className="user-info" style={{ marginTop: "8px", position: "relative" }}>
              <span>Welcome, {role} {receptionistemail}</span>
              <div className="headerdropdown" style={{ display: "inline-block", marginLeft: "10px" }}>
                <button onClick={handleLogout}>Logout</button>
              </div>
            </div>
          )}

          {/* Register/ if no one is logged in */}
          {!guestEmail && !adminEmail && !receptionistemail && (
            <li>
              <div className="links">
                <a href="/signup">Register</a>
                <a href="/login">Login</a>
              </div>
            </li>
          )}
        </ul>
      </nav>

      <div
        className={`hamburger ${navOpen ? "open" : ""}`}
        onClick={() => setNavOpen(!navOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
    </header>
  );
}