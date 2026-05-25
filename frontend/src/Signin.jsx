import React from 'react';
import '../src/CSS/style.css';

export default function Signin() {
  return (
    <div className="outer">
      <div className="form">
        <h1>Welcome to Stayease</h1>
        <form>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Enter your Username"
          />

          <label htmlFor="email">Email</label>
          <input 
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email"
          />

          <label htmlFor="password">Password</label>
          <input 
            type="password" 
            name="password" 
            id="password" 
            placeholder="Enter your password" 
          />
          
          <div className="links">
            <a href='/'>Already have an Account!</a>
          </div>
          
          <input type="submit" value="Register" className="button" />
        </form>
      </div>
    </div>
  );
}

