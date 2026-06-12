import React, { useState } from "react";
import { Link } from "react-router-dom";

const blogs = [
  {
    id: 1,
    title: "Top 10 Tips for a Relaxing Hotel Stay",
    category: "Travel Tips",
    date: "March 15, 2025",
    author: "Yasir Idrees Khan",
    excerpt:
      "Discover the secrets to making the most of your hotel stay with our expert tips and tricks for ultimate relaxation.",
    emoji: "🌴",
  },
  {
    id: 2,
    title: "Exploring Local Cuisine: A Foodie's Guide",
    category: "Food & Dining",
    date: "February 28, 2025",
    author: "Khuzaima Khalid",
    excerpt:
      "A journey through the local flavors and dining experiences that make every visit to our hotel a culinary adventure.",
    emoji: "🍜",
  },
  {
    id: 3,
    title: "The Ultimate Spa Retreat Experience",
    category: "Wellness",
    date: "January 20, 2025",
    author: "Sarah Ahmed",
    excerpt:
      "Learn how our world-class spa services can transform your stay into a rejuvenating wellness retreat.",
    emoji: "💆",
  },
  {
    id: 4,
    title: "Weekend Getaway: What to Do in the City",
    category: "Travel Tips",
    date: "December 10, 2024",
    author: "Ali Hassan",
    excerpt:
      "A curated guide to the best attractions, hidden gems, and must-see spots near our hotel for your weekend escape.",
    emoji: "🏙️",
  },
  {
    id: 5,
    title: "How We Keep Our Rooms Spotless for You",
    category: "Behind the Scenes",
    date: "November 5, 2024",
    author: "Yasir Idrees Khan",
    excerpt:
      "An inside look at our housekeeping standards and the dedication that goes into preparing your perfect room.",
    emoji: "✨",
  },
  {
    id: 6,
    title: "Family Vacation Planning: A Complete Guide",
    category: "Family Travel",
    date: "October 18, 2024",
    author: "Khuzaima Khalid",
    excerpt:
      "Everything you need to know about planning a memorable family vacation and why StayEase is the perfect choice.",
    emoji: "👨‍👩‍👧‍👦",
  },
];

const categories = ["All", "Travel Tips", "Food & Dining", "Wellness", "Behind the Scenes", "Family Travel"];

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? blogs
      : blogs.filter((b) => b.category === activeCategory);

  return (
    <div className="blog-page">
      {/* Banner */}
      <section className="page-banner">
        <div className="banner-overlay">
          <h1>Our Blog</h1>
          <p>
            <Link to="/">Home</Link> / Blog
          </p>
        </div>
      </section>

      <section className="blog-section">
        <div className="container blog-layout">
          {/* Blog Posts */}
          <div className="blog-posts">
            {filtered.map((post) => (
              <div className="blog-card" key={post.id}>
                <div className="blog-card-img">{post.emoji}</div>
                <div className="blog-card-body">
                  <span className="blog-category">{post.category}</span>
                  <h3>{post.title}</h3>
                  <div className="blog-meta">
                    <span>📅 {post.date}</span>
                    <span>✍️ {post.author}</span>
                  </div>
                  <p>{post.excerpt}</p>
                  <button className="btn-read-more">Read More →</button>
                </div>
              </div>
            ))}
          </div>

          {/* Sidebar */}
          <aside className="blog-sidebar">
            <div className="sidebar-widget">
              <h3>Categories</h3>
              <ul className="category-list">
                {categories.map((cat) => (
                  <li
                    key={cat}
                    className={activeCategory === cat ? "active" : ""}
                    onClick={() => setActiveCategory(cat)}
                  >
                    {cat}
                  </li>
                ))}
              </ul>
            </div>

            <div className="sidebar-widget">
              <h3>Recent Posts</h3>
              <ul className="recent-list">
                {blogs.slice(0, 3).map((post) => (
                  <li key={post.id}>
                    <span>{post.emoji}</span>
                    <div>
                      <p>{post.title}</p>
                      <small>{post.date}</small>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="sidebar-widget newsletter-widget">
              <h3>Subscribe</h3>
              <p>Get the latest news and travel tips.</p>
              <input type="email" placeholder="Your email address" />
              <button className="btn-subscribe">Subscribe</button>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}