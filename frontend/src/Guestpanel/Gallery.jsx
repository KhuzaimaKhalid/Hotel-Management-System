import React, { useState } from "react";
import { Link } from "react-router-dom";

const galleryItems = [
  { id: 1, category: "rooms", label: "Deluxe Room", emoji: "🛏️" },
  { id: 2, category: "rooms", label: "Suite Room", emoji: "🏨" },
  { id: 3, category: "dining", label: "Restaurant", emoji: "🍽️" },
  { id: 4, category: "pool", label: "Swimming Pool", emoji: "🏊" },
  { id: 5, category: "spa", label: "Spa & Wellness", emoji: "💆" },
  { id: 6, category: "rooms", label: "Family Room", emoji: "🛌" },
  { id: 7, category: "dining", label: "Bar & Lounge", emoji: "🍹" },
  { id: 8, category: "pool", label: "Rooftop Pool", emoji: "🌅" },
  { id: 9, category: "spa", label: "Massage Center", emoji: "🧖" },
  { id: 10, category: "rooms", label: "Executive Suite", emoji: "⭐" },
  { id: 11, category: "dining", label: "Breakfast Area", emoji: "🥐" },
  { id: 12, category: "pool", label: "Kids Pool", emoji: "🎠" },
];

export default function Gallery() {
  const [filter, setFilter] = useState("all");
  const [lightbox, setLightbox] = useState(null);

  const filtered =
    filter === "all"
      ? galleryItems
      : galleryItems.filter((item) => item.category === filter);

  return (
    <div className="gallery-page">
      {/* Banner */}
      <section className="page-banner">
        <div className="banner-overlay">
          <h1>Gallery</h1>
          <p>
            <Link to="/">Home</Link> / Gallery
          </p>
        </div>
      </section>

      {/* Filter */}
      <section className="filter-section">
        <div className="container">
          <div className="filter-buttons">
            {["all", "rooms", "dining", "pool", "spa"].map((cat) => (
              <button
                key={cat}
                className={`filter-btn ${filter === cat ? "active" : ""}`}
                onClick={() => setFilter(cat)}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="gallery-section">
        <div className="container">
          <div className="gallery-grid">
            {filtered.map((item) => (
              <div
                className="gallery-item"
                key={item.id}
                onClick={() => setLightbox(item)}
              >
                <div className="gallery-img">
                  <span className="gallery-emoji">{item.emoji}</span>
                  <div className="gallery-overlay">
                    <p>{item.label}</p>
                    <span>🔍 View</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightbox && (
        <div className="lightbox-backdrop" onClick={() => setLightbox(null)}>
          <div className="lightbox-box" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close" onClick={() => setLightbox(null)}>✕</button>
            <div className="lightbox-img">{lightbox.emoji}</div>
            <p className="lightbox-label">{lightbox.label}</p>
          </div>
        </div>
      )}
    </div>
  );
}