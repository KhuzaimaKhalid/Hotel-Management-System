import React, { useState } from "react";
import { Link } from "react-router-dom";

const rooms = [
  {
    id: 1,
    name: "Standard Room",
    price: 80,
    type: "standard",
    capacity: 2,
    size: "25 sqm",
    desc: "Cozy and comfortable room with all essential amenities for a pleasant stay.",
    amenities: ["Free Wi-Fi", "AC", "TV", "24hr Room Service"],
  },
  {
    id: 2,
    name: "Deluxe Room",
    price: 120,
    type: "deluxe",
    capacity: 2,
    size: "35 sqm",
    desc: "Spacious room with a beautiful city view and premium furnishings.",
    amenities: ["Free Wi-Fi", "AC", "Smart TV", "Mini Bar", "City View"],
  },
  {
    id: 3,
    name: "Suite Room",
    price: 220,
    type: "suite",
    capacity: 2,
    size: "60 sqm",
    desc: "Luxurious suite with separate living area and private balcony.",
    amenities: ["Free Wi-Fi", "AC", "Smart TV", "Mini Bar", "Balcony", "Jacuzzi"],
  },
  {
    id: 4,
    name: "Family Room",
    price: 180,
    type: "family",
    capacity: 4,
    size: "55 sqm",
    desc: "Perfect room for families, featuring extra beds and child-friendly amenities.",
    amenities: ["Free Wi-Fi", "AC", "Smart TV", "Extra Beds", "Kids Corner"],
  },
  {
    id: 5,
    name: "Executive Suite",
    price: 300,
    type: "suite",
    capacity: 2,
    size: "80 sqm",
    desc: "Our most prestigious suite with panoramic views and exclusive services.",
    amenities: ["Free Wi-Fi", "AC", "Smart TV", "Mini Bar", "Panoramic View", "Butler Service", "Jacuzzi"],
  },
  {
    id: 6,
    name: "Twin Room",
    price: 100,
    type: "standard",
    capacity: 2,
    size: "30 sqm",
    desc: "Comfortable room with two single beds, ideal for friends or colleagues.",
    amenities: ["Free Wi-Fi", "AC", "TV", "24hr Room Service"],
  },
];

export default function OurRoom() {
  const [filter, setFilter] = useState("all");

  const filtered =
    filter === "all" ? rooms : rooms.filter((r) => r.type === filter);

  return (
    <div className="our-room-page">
      {/* Banner */}
      <section className="page-banner">
        <div className="banner-overlay">
          <h1>Our Rooms</h1>
          <p>
            <Link to="/">Home</Link> / Our Rooms
          </p>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="filter-section">
        <div className="container">
          <div className="filter-buttons">
            {["all", "standard", "deluxe", "suite", "family"].map((type) => (
              <button
                key={type}
                className={`filter-btn ${filter === type ? "active" : ""}`}
                onClick={() => setFilter(type)}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Room Cards */}
      <section className="rooms-section">
        <div className="container">
          <div className="rooms-grid">
            {filtered.map((room) => (
              <div className="room-card" key={room.id}>
                <div className="room-card-img">🛏️</div>
                <div className="room-card-body">
                  <div className="room-card-header">
                    <h3>{room.name}</h3>
                    <span className="room-card-price">${room.price}<small>/night</small></span>
                  </div>
                  <div className="room-card-meta">
                    <span>👥 {room.capacity} Guests</span>
                    <span>📐 {room.size}</span>
                  </div>
                  <p>{room.desc}</p>
                  <ul className="amenities-list">
                    {room.amenities.map((a, i) => (
                      <li key={i}>✔ {a}</li>
                    ))}
                  </ul>
                  <Link to="/booking" className="btn-book-now">Book Now</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}