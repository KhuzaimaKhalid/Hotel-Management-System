import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../CSS/style.css";

export default function Adminaddroom() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [roomsOpen, setRoomsOpen] = useState(false);

  // Form input fields state tracking
  const [roomNumber, setRoomNumber] = useState("");
  const [floor, setFloor] = useState("");
  const [selectedType, setSelectedType] = useState("");     // Stores RoomTypeID
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);

  const [roomTypes, setRoomTypes] = useState([]);
  const [loadingTypes, setLoadingTypes] = useState(true);

  const role = localStorage.getItem("role") || "admin";
  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_API_URL}/api/roomtype/getAllRoomTypes`
      )
      .then((res) => {

        const data = res.data.data || [];

        setRoomTypes(data);
        setLoadingTypes(false);

        if (data.length > 0) {
          setSelectedType(data[0].id);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoadingTypes(false);
      });
  }, []);

  // ✅ Form Submit Action Handler - Linked flawlessly to your Backend keys
  // Form Submit Action Handler with explicit field emptiness validation & automatic reset
  const handleAddRoom = async (e) => {
    e.preventDefault();

    // 1. Validation Guardrails
    if (!roomNumber.trim()) {
      alert("⚠️ Form Validation Error: Room Number field cannot be left blank.");
      return;
    }
    if (!floor.trim()) {
      alert("⚠️ Form Validation Error: Please provide a Floor Level.");
      return;
    }
    if (!selectedType) {
      alert("⚠️ Form Validation Error: Please assign a Room Type category.");
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/room/createRoom`,
        {
          roomnumber: roomNumber,
          floor: floor,
          roomtype_id: selectedType
        }
      );

      if (response.data.status === "success") {
        alert("🚀 Room Unit entry registered in database successfully!");

        // ✅ 3. RESET ALL TEXT AND SELECT FIELD STATES TO EMPTY STRINGS
        setRoomNumber("");
        setFloor("");

        // Reset the dropdown elements to match the initial database index array records
        if (roomTypes.length > 0) setSelectedType(roomTypes[0].id);

        // ✅ 4. HARD RESET THE HTML FILE INPUT FIELD IN THE DOM
        const fileInputElement = document.getElementById("roomImageInput");
        if (fileInputElement) {
          fileInputElement.value = ""; // Erases the visual filename next to the "Choose File" button
        }

        // If you want to force redirect the user right away, leave this active.
        // If you want them to stay on the page to keep adding more rooms, comment it out!
        navigate("/adminviewrooms");
      }
    } catch (err) {
      console.error("Axios Form Submission Error:", err);
      alert("Failed to create room: " + (err.response?.data?.error || err.message));
    }
  };
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="wrap" style={{ fontFamily: "Inter, sans-serif" }}>
      {/* Sidebar Layout */}
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
                <a href="/adminbookrooms">📖 Book Rooms</a>
              </div>
            )}
          </div>
          <a href="/adminfeedbacks"><span className="icon">📊</span> Feedbacks</a>
          <a style={{ cursor: "pointer" }} onClick={handleLogout}><span className="icon">🚪</span> Logout</a>
        </nav>
      </aside>

      {/* Main Workspace */}
      <main className="main" style={{ background: "#f8f9fa", minHeight: "100vh" }}>
        <div className="topbar" style={{ background: "#fff", padding: "15px 30px", borderBottom: "1px solid #edf2f7" }}>
          <button className="hamburger" onClick={() => setSidebarOpen(true)}>☰</button>
        </div>

        <section className="content" style={{ padding: "30px" }}>
          <h2>Add New Operational Room</h2>

          <div style={{ background: "#fff", padding: "30px", borderRadius: "8px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)", maxWidth: "600px" }}>
            <form onSubmit={handleAddRoom}>

              <div style={{ marginBottom: "15px" }}>
                <label style={{ display: "block", marginBottom: "5px", fontWeight: "600" }}>Room Number</label>
                <input
                  type="text"
                  value={roomNumber}
                  onChange={(e) => setRoomNumber(e.target.value)}
                  placeholder="e.g. 302"
                  style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
                />
              </div>

              <div style={{ marginBottom: "15px" }}>
                <label style={{ display: "block", marginBottom: "5px", fontWeight: "600" }}>Floor Level</label>
                <input
                  type="number"
                  value={floor}
                  onChange={(e) => setFloor(e.target.value)}
                  placeholder="e.g. 3"
                  style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
                />
              </div>

              {/* DYNAMIC SELECT DROPDOWN: ROOM TYPE */}
              <div style={{ marginBottom: "15px" }}>
                <label style={{ display: "block", marginBottom: "5px", fontWeight: "600" }}>Room Type Category</label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc", background: "#fff" }}
                  disabled={loadingTypes}
                >
                  {loadingTypes ? (
                    <option>Loading types from database...</option>
                  ) : roomTypes.length === 0 ? (
                    <option>⚠️ No room types found</option>
                  ) : (
                    roomTypes.map((type) => (
                      <option key={type.id} value={type.id}>
                        {type.typename}
                      </option>
                    ))
                  )}
                </select>
              </div>

              <div style={{ marginBottom: "15px" }}>
                <label style={{ display: "block", marginBottom: "5px", fontWeight: "600" }}>Room Showcase Picture</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files[0])}
                  style={{ width: "100%", padding: "4px 0" }}
                />
              </div>

              <div style={{ marginBottom: "20px" }}>
                <label style={{ display: "block", marginBottom: "5px", fontWeight: "600" }}>Description Details</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Provide utility metrics, bed styles, etc."
                  rows="4"
                  style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc", resize: "none" }}
                />
              </div>

              <button
                type="submit"
                style={{ background: "#1a202c", color: "#fff", border: "none", padding: "10px 20px", borderRadius: "6px", cursor: "pointer", fontWeight: "600" }}
              >
                Create Room Unit
              </button>

            </form>
          </div>
        </section>
      </main>
    </div>
  );
}