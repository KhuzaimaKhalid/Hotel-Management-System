import { useLocation, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

export default function Billing() {
  const { state } = useLocation();
  const navigate = useNavigate();

  // Integrated realistic fallback dummy data structure to avoid runtime null crashes
  const bookingData = state || {
    _id: "BK-" + Math.floor(100000 + Math.random() * 900000),
    roomImage: "deluxe.jpg",
    roomName: "Deluxe Ocean View Suite",
    roomDescription: "A premium luxury experience featuring a king-sized master setup, an attached private balcony lounge, automated ambient climate control, and high-speed fiber connectivity.",
    dynamicPrice: 14500,
    guestName: "John Doe",
    guestemail: "johndoe@example.com",
    guestImage: null,
    checkIn: new Date().toISOString().split('T')[0],
    checkOut: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    adults: 2,
    children: 1,
    roomCount: 1
  };

  const handleBooking = () => {
    // Passes the populated data structure forward smoothly to the confirmation interface
    navigate("/confirm", { state: bookingData });
  };

  return (
    <>
      <Header />
      <div style={{ 
        background: "#f7fafc", 
        padding: "50px max(20px, 5%)", 
        minHeight: "85vh", 
        fontFamily: "Inter, sans-serif",
        display: "flex",
        justifyContent: "center"
      }}>
        <div style={{ 
          maxWidth: "1100px", 
          width: "100%", 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", 
          gap: "35px" 
        }}>
          
          {/* Left Section - Room Card Portfolio */}
          <div style={{ 
            background: "#ffffff", 
            padding: "30px", 
            borderRadius: "14px", 
            boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)",
            display: "flex", 
            flexDirection: "column", 
            gap: "18px" 
          }}>
            <h3 style={{ fontSize: "1.25rem", color: "#1a202c", margin: "0 0 5px 0", borderBottom: "2px solid #edf2f7", paddingBottom: "10px" }}>Accommodation Unit</h3>
            <img 
              src={`/Images/${bookingData.roomImage}`} 
              alt={bookingData.roomName} 
              onError={(e) => { e.target.src = "/Images/default.png"; }}
              style={{ width: "100%", height: "240px", objectFit: "cover", borderRadius: "10px" }}
            />
            <div>
              <h3 style={{ fontSize: "1.4rem", color: "#2d3748", margin: "0 0 8px 0" }}>{bookingData.roomName}</h3>
              <p style={{ color: "#718096", fontSize: "0.95rem", lineHeight: "1.6", margin: 0 }}>{bookingData.roomDescription}</p>
            </div>
            
            <div style={{ 
              background: "#f7fafc", 
              padding: "15px 20px", 
              borderRadius: "8px", 
              borderLeft: "4px solid #1a202c",
              marginTop: "auto"
            }}>
              <small style={{ color: "#a0aec0", textTransform: "uppercase", fontWeight: "600", fontSize: "0.8rem" }}>Pricing Rate</small>
              <p style={{ margin: "2px 0 0 0", fontSize: "1.3rem", fontWeight: "800", color: "#1a202c" }}>
                PKR {bookingData.dynamicPrice} <span style={{ fontSize: "0.9rem", fontWeight: "normal", color: "#718096" }}>/ night</span>
              </p>
            </div>
          </div>

          {/* Right Section - Guest + Booking Summary Ledger */}
          <div style={{ 
            background: "#ffffff", 
            padding: "30px", 
            borderRadius: "14px", 
            boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)",
            display: "flex",
            flexDirection: "column",
            gap: "25px"
          }}>
            
            {/* Guest Summary Card Component Block */}
            <div>
              <h3 style={{ fontSize: "1.1rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "#a0aec0", margin: "0 0 15px 0" }}>Guest Information</h3>
              <div style={{ display: "flex", alignItems: "center", gap: "15px", background: "#f8f9fa", padding: "15px", borderRadius: "10px" }}>
                {bookingData.guestImage ? (
                  <img src={`/Images/${bookingData.guestImage}`} alt="guest avatar" style={{ width: "50px", height: "50px", borderRadius: "50%", objectFit: "cover" }} />
                ) : (
                  <div style={{ width: "50px", height: "50px", borderRadius: "50%", background: "#e2e8f0", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.3rem" }}>👤</div>
                )}
                <div>
                  <p style={{ margin: "0 0 4px 0", fontWeight: "700", color: "#2d3748", fontSize: "1.05rem" }}>{bookingData.guestName}</p>
                  <p style={{ margin: 0, color: "#718096", fontSize: "0.9rem" }}>{bookingData.guestemail}</p>
                </div>
              </div>
            </div>

            {/* Stay Ledger Breakdown Block */}
            <div style={{ borderTop: "1px solid #edf2f7", paddingTop: "20px" }}>
              <h3 style={{ fontSize: "1.1rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "#a0aec0", margin: "0 0 15px 0" }}>Reservation Details</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px", fontSize: "0.95rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "#718096" }}>📆 Check-In Date</span>
                  <strong style={{ color: "#2d3748" }}>{bookingData.checkIn}</strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "#718096" }}>📆 Check-Out Date</span>
                  <strong style={{ color: "#2d3748" }}>{bookingData.checkOut}</strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "#718096" }}>👥 Total Stay Occupancy</span>
                  <strong style={{ color: "#2d3748" }}>{bookingData.adults} Adults, {bookingData.children} Children</strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "#718096" }}>🔑 Allocated Rooms Count</span>
                  <strong style={{ color: "#2d3748" }}>{bookingData.roomCount} Unit(s)</strong>
                </div>
              </div>
            </div>

            {/* Booking Submission Action Control */}
            <div style={{ marginTop: "auto", borderTop: "1px solid #edf2f7", paddingTop: "25px" }}>
              <button 
                onClick={handleBooking} 
                style={{ 
                  width: "100%",
                  padding: "14px", 
                  background: "#1a202c", 
                  color: "#ffffff", 
                  border: "none", 
                  borderRadius: "8px", 
                  fontWeight: "700", 
                  fontSize: "1rem", 
                  cursor: "pointer",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                  transition: "background 0.2s"
                }}
                onMouseOver={(e) => e.target.style.background = "#2d3748"}
                onMouseOut={(e) => e.target.style.background = "#1a202c"}
              >
                Confirm & Guarantee Booking
              </button>
            </div>

          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}