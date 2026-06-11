import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import Header from "./Header";
import Footer from "./Footer";


export default function Confirmation() {
  const { state } = useLocation(); // booking data from Billing.js
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const userID = token ? JSON.parse(atob(token.split('.')[1])).userID : null;
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;
    if (state && userID) {
      fetch(`${import.meta.env.VITE_API_URL}/api/user/getGuestId/${userID}`)
        .then(res => res.json())
        .then(guestData => {
          const guestId = guestData.guest_id;
          fetch(`${import.meta.env.VITE_API_URL}/api/reservation/createReservation`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              reservationdate: new Date().toISOString().split('T')[0],
              numberofguest: (state.adults || 1) + (state.children || 0),
              reservationstatus: true,
              guest_id: guestId,
              room_id: state.roomId || 1,
              staff_id: 1
            })
          })
            .then(res => res.json())
            .then(resData => {
              if (resData.status === 'success') {
                fetch(`${import.meta.env.VITE_API_URL}/api/invoice/createInvoice`, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    invoicedate: new Date().toISOString().split('T')[0],
                    roomcharges: state.dynamicPrice,
                    servicecharges: 0,
                    taxamount: 0,
                    paymentstatus: true,
                    reservation_id: resData.reservation_id
                  })
                })
                  .then(res => res.json())
                  .then(data => console.log('Invoice created:', data))
                  .catch(err => console.log(err));
              }
            })
        })
        .catch(err => console.log(err));
    }
  }, []);
  if (!state) {
    return (
      <>
        <Header />
        <div className="confirmation-page">
          <h2>No booking details found</h2>
          <button onClick={() => navigate("/")}>Go Back</button>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="confirmation-page">
        <div className="confirmation-card">
          <h2>🎉 Booking Confirmed!</h2>
          <p className="success-text">Thank you, {state.guestName}. Your booking has been successfully placed.</p>

          {/* Booking Summary */}
          <div className="summary-grid">
            {/* Left - Room Info */}
            <div className="room-summary">
              <img src={`Images/${state.roomImage}`} alt={state.roomName} />
              <h3>{state.roomName}</h3>
              <p>{state.roomDescription}</p>
              <div className="price-box">
                <p><strong>Total: PKR {state.dynamicPrice}</strong></p>
              </div>
            </div>

            {/* Right - Guest + Booking Info */}
            <div className="guest-summary">
              <h3>Guest Information</h3>
              <div className="guest-info">
                {state.guestImage && (
                  <img src={`Images/${state.guestImage}`} alt="guest" />
                )}
                <div>
                  <p><strong>{state.guestName}</strong></p>
                  <p>{state.guestemail}</p>
                </div>
              </div>

              <h3>Booking Details</h3>
              <p><strong>Check-In:</strong> {state.checkIn}</p>
              <p><strong>Check-Out:</strong> {state.checkOut}</p>
              <p><strong>Guests:</strong> {state.adults} Adults, {state.children} Children</p>
              <p><strong>Rooms:</strong> {state.roomCount}</p>
              <p><strong>Booking ID:</strong> {state._id}</p>
            </div>
          </div>

          {/* Button */}
          <button style={{ background: "blue" }} onClick={() => navigate("/")} className="buttons">
            Back to Home
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}
