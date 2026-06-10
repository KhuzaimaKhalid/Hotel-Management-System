import { useEffect, useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

// Static mock array simulating real database invoices
const MOCK_INVOICES = [
  {
    _id: "INV672a91b",
    guestName: "John Doe",
    guestEmail: "guest@example.com",
    checkIn: "2026-06-01",
    checkOut: "2026-06-05",
    adults: 2,
    children: 1,
    roomCount: 1,
    dynamicPrice: 15000,
    room: {
      roomNumber: "302",
      roomType: "Deluxe Ocean Suite",
      image: "deluxe.jpg",
      price: 15000
    }
  },
  {
    _id: "INV883c44e",
    guestName: "John Doe",
    guestEmail: "guest@example.com",
    checkIn: "2026-07-12",
    checkOut: "2026-07-15",
    adults: 4,
    children: 0,
    roomCount: 2,
    dynamicPrice: 22000,
    room: {
      roomNumber: "105-106",
      roomType: "Executive Family Room",
      image: "executive.jpg",
      price: 22000
    }
  }
];

export default function Invoicepage() {
  // Directly initialize state using our frontend mock database collection

  const guestEmail = localStorage.getItem("guestpanel") || "guest@example.com";

  // Filter bookings locally by the signed-in user's email if available
  const [bookings, setBookings] = useState([]);
  const token = localStorage.getItem('token');
  const userID = token ? JSON.parse(atob(token.split('.')[1])).userID : null;

  useEffect(() => {
    if (userID) {
      fetch(`${import.meta.env.VITE_API_URL}/api/invoice/getInvoiceByUser/${userID}`)
        .then(res => res.json())
        .then(data => {
          if (data.status === 'success') setBookings(data.data);
        })
        .catch(err => console.log(err));
    }
  }, [userID]);

  const downloadPDF = (id) => {
    const invoiceElement = document.getElementById(`invoice-${id}`);
    html2canvas(invoiceElement).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 190;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 10;

      pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`invoice-${id}.pdf`);
    });
  };

  if (!bookings || bookings.length === 0) {
    return (
      <>
        <Header />
        <p className="no-bookings" style={{ textAlign: "center", marginTop: "50px" }}>
          No bookings found.
        </p>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="invoice-page" style={{ padding: "20px" }}>
        {bookings.map((booking) => (
          <div
            key={booking.id}
            id={`invoice-${booking.id}`}
            className="invoice-container invoice-card"
            style={{
              maxWidth: "800px",
              margin: "20px auto",
              padding: "20px",
              border: "1px solid #ccc",
              borderRadius: "15px",
              backgroundColor: "#f9f9f9",
            }}
          >
            {/* Header */}
            <div className="invoice-header" style={{ textAlign: "center", marginBottom: "20px" }}>
              <h1>Hotel Invoice</h1>
              <p>Invoice #{booking.id}</p>
            </div>

            {/* Guest Details */}
            <div className="section" style={{ marginBottom: "20px" }}>
              <h2>Guest Details</h2>
              <p><strong>Name:</strong> {booking.firstname} {booking.lastname}</p>
              <p><strong>Email:</strong> {booking.email}</p>
            </div>

            {/* Booking Details */}
            <div className="section" style={{ marginBottom: "20px" }}>
              <h2>Booking Details</h2>
              <p><strong>Room Number:</strong> {booking.roomnumber || "N/A"}</p>
              <p><strong>Room Type:</strong> {booking.typename || "N/A"}</p>
              <p><strong>Check-in:</strong> {new Date(booking.checkindate).toLocaleDateString()}</p>

              <img
                src="/Images/default.png"
                alt="Room"
                style={{ width: "200px", borderRadius: "10px", margin: "10px 0" }}
              />

              <p><strong>Adults:</strong> {booking.adults}</p>
              <p><strong>Children:</strong> {booking.children}</p>
              <p><strong>Rooms Booked:</strong> {booking.roomCount}</p>
            </div>

            {/* Payment */}
            <div className="section payment" style={{ marginBottom: "20px" }}>
              <h2>Payment</h2>
              <p>
                <strong>Price per Night:</strong> PKR {booking.baseprice || 0}
              </p>
              <p>
                <strong>Total Amount:</strong> PKR {booking.roomcharges + booking.servicecharges + booking.taxamount}
              </p>
            </div>

            {/* Footer */}
            <div className="invoice-footer" style={{ textAlign: "center", marginBottom: "15px" }}>
              <p>Thank you for choosing our hotel!</p>
              <p>Generated on {new Date().toLocaleString()}</p>
            </div>

            {/* Download Button */}
            <div style={{ textAlign: "center" }}>
              <button
                style={{
                  marginTop: "10px",
                  padding: "8px 16px",
                  cursor: "pointer",
                  borderRadius: "20px",
                  border: "none",
                  width: "150px",
                  background: "black",
                  color: "white",
                }}
                onClick={() => downloadPDF(booking.id)}
              >
                Download PDF
              </button>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
}