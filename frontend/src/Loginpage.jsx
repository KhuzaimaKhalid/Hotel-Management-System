
import React, { useState } from 'react';
import "./CSS/style.css"
import { useNavigate } from 'react-router-dom';

export default function Loginpage() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();

  const handlelogin = async (e) => {
    e.preventDefault();
    const cleanemail = (email || "").toLowerCase().trim();
    const response = await fetch('https://ubiquitous-space-palm-tree-4jvrq4qwvwg427q4w-3000.app.github.dev/api/user/loginGuest', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await response.json();
    if (data.status === 'success') {
      localStorage.setItem('token', data.token);
      localStorage.setItem('guestpanel', email);
      localStorage.setItem('role', 'guest');
      navigate('/');
    } else {
      alert(data.message);
    }
  }
  return (
    <>
      <div className="outer">
        <div className="form">
          <h1>Welcome to Stayease</h1>
          <form onSubmit={handlelogin}>
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="Enter your email" onChange={(e) => setemail(e.target.value)}
            />

            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              onChange={(e) => setpassword(e.target.value)}
            />

            <div className="links">
              <a href="/forgotpassword">Forgot password?</a>
              <a href="/signup">Sign up</a>
            </div>

            <input type="submit" value="login" className="button" />
          </form>
        </div>
      </div>
    </>
  )
}
