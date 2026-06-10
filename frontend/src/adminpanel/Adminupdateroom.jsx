import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../CSS/style.css";

export default function Adminupdateroom() {
  const { id } = useParams(); // Grabs room ID directly from URL bar
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [roomsOpen, setRoomsOpen] = useState(true);

  // Form Field States
  const [roomNumber, setRoomNumber] = useState("");
  const [floor, setFloor] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);

  // Dropdown Lists
  const [roomTypes, setRoomTypes] = useState([]);
  const [roomStatus, setRoomStatus] = useState([]);
  const [loading, setLoading] = useState(true);

  const role = localStorage.getItem("role") || "admin";

  useEffect(() => {
    const fetchRoomData = async () => {
      try {
        // Fetch types and statuses first
        const typesRes = await axios.get(`${import.meta.env.VITE_API_URL}/api/roomtype/getAllRoomTypes`);
        setRoomTypes(typesRes.data.data); // was typesRes.data

        const roomRes = await axios.get(`${import.meta.env.VITE_API_URL}/api/room/getRoomById/${id}`);
        const room = roomRes.data.data[0]; // was roomRes.data
        if (room) {
          setRoomNumber(room.roomnumber);
          setFloor(room.floor);
          setSelectedType(room.roomtype_id);
        }
        setLoading(false);
      } catch (err) {
        console.error("Error pulling single room profile details:", err);
        alert("Failed to read room metrics profile data.");
        navigate("/adminviewrooms");
      }
    };
    fetchRoomData();
  }, [id, navigate]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("roomNumber", roomNumber);
    formData.append("floor", floor);
    formData.append("roomTypeID", selectedType);
    formData.append("roomStatusID", selectedStatus);
    formData.append("description", description);
    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      const response = await axios.put(`${import.meta.env.VITE_API_URL}/api/room/updateRoom/${id}`, {
        roomnumber: roomNumber,
        floor: floor,
        roomtype_id: selectedType,
        reservationstatus: selectedStatus === "true"
      });
      


      if (response.data.status === "success") {
        alert("🎉 Room updated successfully!");
        navigate("/adminviewrooms");
      }
    } catch (err) {
      alert("Update execution failed: " + (err.response?.data?.error || err.message));
    }
  };

  if (loading) return <div style={{ padding: "40px", textAlign: "center" }}>⏳ Pre-populating form records...</div>;

  return (
    <div className="wrap" style={{ fontFamily: "Inter, sans-serif" }}>
      <aside className={`sidebar ${sidebarOpen ? "active" : ""}`}>
        <div className="brand">
          <div className="logo">SE</div>
          <h2>Stayease Admin</h2>
        </div>
        <nav className="nav">
          <a href="/admindashboard"><span className="icon">👥</span> Dashboard</a>
          <a href="/adminviewrooms" style={{ fontWeight: "600" }}><span className="icon">📦</span> Rooms</a>
          <a href="/adminfeedbacks"><span className="icon">📊</span> Feedbacks</a>
        </nav>
      </aside>

      <main className="main" style={{ background: "#f8f9fa", minHeight: "100vh" }}>
        <section className="content" style={{ padding: "30px" }}>
          <h2>Modify Operational Profile Room {roomNumber}</h2>

          <div style={{ background: "#fff", padding: "30px", borderRadius: "8px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)", maxWidth: "600px" }}>
            <form onSubmit={handleUpdate}>
              <div style={{ marginBottom: "15px" }}>
                <label style={{ display: "block", marginBottom: "5px", fontWeight: "600" }}>Room Number</label>
                <input type="text" value={roomNumber} onChange={(e) => setRoomNumber(e.target.value)} required style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }} />
              </div>

              <div style={{ marginBottom: "15px" }}>
                <label style={{ display: "block", marginBottom: "5px", fontWeight: "600" }}>Floor Level</label>
                <input type="number" value={floor} onChange={(e) => setFloor(e.target.value)} required style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }} />
              </div>

              <div style={{ marginBottom: "15px" }}>
                <label style={{ display: "block", marginBottom: "5px", fontWeight: "600" }}>Room Type Category</label>
                <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)} required style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc", background: "#fff" }}>
                {roomTypes.map((t) => <option key={t.id} value={t.id}>{t.typename}</option>)}
                </select>
              </div>

              <div style={{ marginBottom: "15px" }}>
                <label style={{ display: "block", marginBottom: "5px", fontWeight: "600" }}>Current Status</label>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  required
                  style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc", background: "#fff" }}
                >
                  <option value="true">Booked</option>
                  <option value="false">Not Booked</option>
                </select>
              </div>

             

              <div style={{ marginBottom: "20px" }}>
                <label style={{ display: "block", marginBottom: "5px", fontWeight: "600" }}>Description Details</label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows="4" style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc", resize: "none" }} />
              </div>

              <div style={{ display: "flex", gap: "10px" }}>
                <button type="submit" style={{ background: "#1a202c", color: "#fff", border: "none", padding: "10px 20px", borderRadius: "6px", cursor: "pointer", fontWeight: "600" }}>Update Room Changes</button>
                <button type="button" onClick={() => navigate("/adminviewrooms")} style={{ background: "#edf2f7", color: "#4a5568", border: "none", padding: "10px 20px", borderRadius: "6px", cursor: "pointer" }}>Cancel</button>
              </div>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}