import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function ContactUs() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: wire up to your backend API
    console.log("Contact form submitted:", form);
    setSubmitted(true);
    setForm({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  return (
    <div className="contact-page">
      {/* Banner */}
      <section className="page-banner">
        <div className="banner-overlay">
          <h1>Contact Us</h1>
          <p>
            <Link to="/">Home</Link> / Contact Us
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="contact-info-section">
        <div className="container">
          <div className="contact-info-grid">
            <div className="contact-info-card">
              <span className="contact-info-icon">📍</span>
              <h3>Our Address</h3>
              <p>123 Hotel Street, Karachi, Pakistan</p>
            </div>
            <div className="contact-info-card">
              <span className="contact-info-icon">📞</span>
              <h3>Phone Number</h3>
              <p>+01 1234569540</p>
              <p>+92 300 1234567</p>
            </div>
            <div className="contact-info-card">
              <span className="contact-info-icon">✉️</span>
              <h3>Email Address</h3>
              <p>demo@gmail.com</p>
              <p>support@stayease.com</p>
            </div>
            <div className="contact-info-card">
              <span className="contact-info-icon">🕐</span>
              <h3>Working Hours</h3>
              <p>Mon - Fri: 9:00 AM – 6:00 PM</p>
              <p>Sat - Sun: 10:00 AM – 4:00 PM</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="contact-form-section">
        <div className="container contact-form-layout">
          <div className="contact-form-box">
            <h2>Send Us a Message</h2>
            <p>Have a question or special request? We'd love to hear from you.</p>

            {submitted && (
              <div className="success-alert">
                ✅ Your message has been sent! We'll get back to you shortly.
              </div>
            )}

            <div className="contact-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+92 300 0000000"
                  />
                </div>
                <div className="form-group">
                  <label>Subject *</label>
                  <select
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select a subject</option>
                    <option value="booking">Room Booking</option>
                    <option value="feedback">Feedback</option>
                    <option value="complaint">Complaint</option>
                    <option value="general">General Inquiry</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label>Message *</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Write your message here..."
                  rows="6"
                  required
                ></textarea>
              </div>
              <button className="btn-send" onClick={handleSubmit}>
                Send Message ✉️
              </button>
            </div>
          </div>

          {/* Map Placeholder */}
          <div className="map-box">
            <h2>Find Us Here</h2>
            <div className="map-placeholder">
              <span>🗺️</span>
              <p>123 Hotel Street, Karachi, Pakistan</p>
              <small>Embed your Google Map iframe here</small>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}