import React from "react";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <div className="about-page">
      {/* Page Banner */}
      <section className="page-banner">
        <div className="banner-overlay">
          <h1>About Us</h1>
          <p>
            <Link to="/">Home</Link> / About
          </p>
        </div>
      </section>

      {/* About Story */}
      <section className="about-story">
        <div className="container about-grid">
          <div className="about-img-block">
            <div className="about-img-placeholder">🏨</div>
          </div>
          <div className="about-text-block">
            <span className="section-eyebrow">Our Story</span>
            <h2>A Legacy of Luxury & Hospitality</h2>
            <p>
              StayEase was founded with a single mission: to provide guests with an
              unparalleled experience of comfort, elegance, and genuine hospitality.
              Since our establishment, we have been a home away from home for thousands
              of travelers from around the world.
            </p>
            <p>
              Our dedicated team works tirelessly to ensure that every detail of your
              stay is perfect — from the moment you arrive to the moment you check out.
            </p>
            <Link to="/booking" className="btn-book-now">Book a Room</Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="stats-section">
        <div className="container stats-grid">
          {[
            { number: "15+", label: "Years of Experience" },
            { number: "200+", label: "Luxury Rooms" },
            { number: "50K+", label: "Happy Guests" },
            { number: "30+", label: "Awards Won" },
          ].map((stat, i) => (
            <div className="stat-card" key={i}>
              <h3>{stat.number}</h3>
              <p>{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <div className="container">
          <h2 className="section-title">Meet Our Team</h2>
          <div className="team-grid">
            {[
              { name: "Yasir Idrees Khan", role: "Founder & CEO" },
              { name: "Khuzaima Khalid", role: "Co-Founder & CTO" },
              { name: "Sarah Ahmed", role: "Head of Operations" },
              { name: "Ali Hassan", role: "Guest Relations Manager" },
            ].map((member, i) => (
              <div className="team-card" key={i}>
                <div className="team-avatar">👤</div>
                <h3>{member.name}</h3>
                <p>{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}