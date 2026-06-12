import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-overlay">
          <div className="hero-content">
            <h1>Welcome to StayEase</h1>
            <p>Experience luxury and comfort like never before</p>
            <Link to="/booking" className="btn-book-now">Book Now</Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <h2 className="section-title">Why Choose Us</h2>
          <div className="features-grid">
            <div className="feature-card">
              <span className="feature-icon">🏨</span>
              <h3>Luxury Rooms</h3>
              <p>Elegantly furnished rooms designed for your comfort and relaxation.</p>
            </div>
            <div className="feature-card">
              <span className="feature-icon">🍽️</span>
              <h3>Fine Dining</h3>
              <p>World-class cuisine prepared by our expert chefs.</p>
            </div>
            <div className="feature-card">
              <span className="feature-icon">🏊</span>
              <h3>Pool & Spa</h3>
              <p>Rejuvenate yourself with our premium spa and swimming pool.</p>
            </div>
            <div className="feature-card">
              <span className="feature-icon">📶</span>
              <h3>Free Wi-Fi</h3>
              <p>Stay connected with high-speed internet throughout the hotel.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Rooms Preview */}
      <section className="rooms-preview-section">
        <div className="container">
          <h2 className="section-title">Our Featured Rooms</h2>
          <div className="rooms-grid">
            {[
              { name: "Deluxe Room", price: "$120/night", desc: "Spacious room with city view" },
              { name: "Suite Room", price: "$220/night", desc: "Premium suite with private balcony" },
              { name: "Family Room", price: "$180/night", desc: "Perfect for families with kids" },
            ].map((room, i) => (
              <div className="room-preview-card" key={i}>
                <div className="room-img-placeholder">🛏️</div>
                <div className="room-info">
                  <h3>{room.name}</h3>
                  <p>{room.desc}</p>
                  <span className="room-price">{room.price}</span>
                  <Link to="/booking" className="btn-book">Book Now</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <h2>Ready for an Unforgettable Stay?</h2>
          <p>Book your room today and enjoy exclusive deals and offers.</p>
          <Link to="/booking" className="btn-cta">Make a Reservation</Link>
        </div>
      </section>
    </div>
  );
}