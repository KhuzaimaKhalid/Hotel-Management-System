import React, { useEffect, useRef, useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import "../CSS/style.css";
import { useNavigate } from "react-router-dom";

// Local static data replacing the database collection
const MOCK_ROOMS = [
  {
    _id: "1",
    roomName: "Deluxe Ocean Suite",
    image: "deluxe.jpg",
    description: "A spacious room featuring stunning views of the Arabian Sea, premium bedding, and state-of-the-art amenities.",
    price: 15000,
    status: "Available"
  },
  {
    _id: "2",
    roomName: "Executive Family Room",
    image: "executive.jpg",
    description: "Perfect for family getaways, offering twin interconnected layouts, elegant working desks, and a lounge.",
    price: 22000,
    status: "Available"
  },
  {
    _id: "3",
    roomName: "Standard Cozy Twin",
    image: "standard.jpg",
    description: "Comfortable and compact layout featuring two single beds, high speed Wi-Fi, and complimentary breakfast services.",
    price: 8500,
    status: "Available"
  }
];

export default function Booking() {
  const [roomPopupOpen, setRoomPopupOpen] = useState(false);
  const [roomCount, setRoomCount] = useState(1);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);

  // Initialize states directly with our local mock data arrays
  const [roomsData, setRoomsData] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);

  // Simulating locally saved guest profile details instead of database fetch
  const guestemail = localStorage.getItem("guestpanel") || "guest@example.com";
  const role = localStorage.getItem("role") || "user";
  const adminEmail = localStorage.getItem("adminEmail");
  const receptionistemail = localStorage.getItem("receptionistemail");
  const token = localStorage.getItem('token');
  const guestName = token ? localStorage.getItem('guestpanel') : "Guest";
  const [user, setUser] = useState({ _id: "u101", name: guestName });


  const roomPopupRef = useRef(null);
  const roomInputRef = useRef(null);
  const navigate = useNavigate();

  // Instantly apply baseline dynamic pricing on first load
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/room/getAllRooms`)
      .then(res => res.json())
      .then(async (data) => {
        if (data.status === 'success') {

          const roomsWithPrice = await Promise.all(
            data.data.map(async (room) => {
              const priceRes = await fetch(`${import.meta.env.VITE_API_URL}/api/room/getRoomPrice/${room.id}`);
              const priceData = await priceRes.json();
              const basePrice = parseFloat(priceData.price) || 0;
              return {
                ...room,
                baseprice: basePrice,
                dynamicPrice: calculatePrice(basePrice),
              };
            })
          );
          setRoomsData(roomsWithPrice);
          setFilteredRooms(roomsWithPrice);
        }
      })
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    if (roomsData.length > 0) {
      const updated = roomsData.map((room) => ({
        ...room,
        dynamicPrice: calculatePrice(room.baseprice),
      }));
      setFilteredRooms(updated);
    }
  }, [roomCount, adults, children]);

  // Clean local state array array directly instead of calling DELETE API
  const deleteRoom = (id) => {
    if (window.confirm("Are you sure you want to delete this room?")) {
      const updatedRooms = roomsData.filter((room) => room._id !== id);
      setRoomsData(updatedRooms);
      alert("Room deleted successfully (UI state cleaned)");
    }
  };

  // Close popup on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        roomPopupRef.current &&
        !roomPopupRef.current.contains(e.target) &&
        !roomInputRef.current.contains(e.target)
      ) {
        setRoomPopupOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const roomValue = `${roomCount} Room(s), ${adults} Adults, ${children} Children`;

  const calculatePrice = (basePrice) => {
    let price = basePrice;
    if (roomCount > 1) price += price * 0.1 * (roomCount - 1);
    if (adults > 0) price += price * 0.15 * (adults - 1);
    if (children > 0) price += price * 0.15 * children;
    return price.toFixed(2);
  };

  // Process search entirely on the client side using domestic conditions
  const handleSearch = () => {
    const checkIn = document.getElementById("checkin").value;
    const checkOut = document.getElementById("checkout").value;

    if (!checkIn || !checkOut) {
      alert("Please select both check-in and check-out dates");
      return;
    }

    // Process price updates instantly down to view layout lists
    const processedRooms = roomsData.map((room) => ({
      ...room,
      dynamicPrice: calculatePrice(room.baseprice),
    }));

    setFilteredRooms(processedRooms);
  };

  const goToBilling = (room) => {
    const checkIn = document.getElementById("checkin").value;
    const checkOut = document.getElementById("checkout").value;

    const guestEmail = guestemail;
    const guestName = user?.name || (guestEmail ? guestEmail.split("@")[0] : "Guest");

    if (!checkIn || !checkOut) {
      alert("Please select both check-in and check-out dates");
      return;
    }

    const proceed = window.confirm(
      `Guest Name: ${guestName}\nGuest Email: ${guestEmail}\n\nProceed to billing?`
    );

    if (!proceed) return;

    navigate("/billing", {
      state: {
        roomId: room.id,
        roomName: room.roomName,
        roomImage: room.image,
        roomDescription: room.description,
        checkIn,
        checkOut,
        roomCount,
        adults,
        children,
        dynamicPrice: calculatePrice(room.baseprice),
        guestName,
        guestEmail,
        guestId: user?._id,
      },
    });
  };

  return (
    <>
      <Header />
      <div className="booking-box">
        <h2>Book Your Trip in Karachi</h2>

        {/* Date Pickers */}
        <div className="form-group">
          <label htmlFor="checkin">Check-in</label>
          <input type="date" id="checkin" />
        </div>
        <div className="form-group">
          <label htmlFor="checkout">Check-out</label>
          <input type="date" id="checkout" />
        </div>

        {/* Room Selector */}
        <div className="form-group room-select">
          <label>Guests & Rooms</label>
          <input
            type="text"
            value={roomValue}
            readOnly
            ref={roomInputRef}
            onClick={() => setRoomPopupOpen(!roomPopupOpen)}
          />
          {roomPopupOpen && (
            <div className="room-popup" ref={roomPopupRef}>
              <div>
                <span>Rooms</span>
                <div>
                  <button onClick={() => setRoomCount(Math.max(1, roomCount - 1))}>-</button>
                  <span>{roomCount}</span>
                  <button onClick={() => setRoomCount(roomCount + 1)}>+</button>
                </div>
              </div>
              <div>
                <span>Adults</span>
                <div>
                  <button onClick={() => setAdults(Math.max(1, adults - 1))}>-</button>
                  <span>{adults}</span>
                  <button onClick={() => setAdults(adults + 1)}>+</button>
                </div>
              </div>
              <div>
                <span>Children</span>
                <div>
                  <button onClick={() => setChildren(Math.max(0, children - 1))}>-</button>
                  <span>{children}</span>
                  <button onClick={() => setChildren(children + 1)}>+</button>
                </div>
              </div>
            </div>
          )}
        </div>

        <button className="btn" onClick={handleSearch}>
          Search
        </button>
      </div>

      {/* Rooms Section */}
      <section className="rooms">
        <h2>Available Rooms</h2>
        <div className="room-grid">
          {filteredRooms.length === 0 && (
            <p>No rooms available for selected dates.</p>
          )}
          {filteredRooms.map((room) => (
            <div
              className="room-card"
              key={room._id}
              onClick={() => goToBilling(room)}
              style={{ cursor: "pointer" }}
            >
              <img
                src={
                  room.typename === 'Standard' ? '/images/standard.jpg' :
                    room.typename === 'Deluxe' ? '/images/deluxe.jpg' :
                      room.typename === 'Suite' ? '/images/suite.jfif' :
                        'Images/default.png'
                }
                alt={room.typename}

              />
              <h2 style={{ color: "#1e5aa8", marginTop: "10px" }}>
                {room.typename} Room
              </h2>
              <h3>{room.roomName}</h3>
              <h3>
                Price:{" "}
                <span style={{ textDecoration: "line-through", color: "red" }}>
                  PKR {room.baseprice}
                </span>{" "}
                <span style={{ color: "green" }}>
                  PKR {room.dynamicPrice}
                </span>
              </h3>
              <p>{room.description}</p>
              <h3>{room.status}</h3>
              {role === "admin" && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteRoom(room._id);
                  }}
                  className="delete-btn"
                >
                  Delete Room
                </button>
              )}
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </>
  );
}