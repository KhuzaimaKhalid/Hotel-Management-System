
import React, { useState } from 'react';
import "./CSS/style.css"
import { useNavigate } from 'react-router-dom';

export default function Loginpage() {
  const [email,setemail]=useState("");
  const [password,setpassword]=useState("");
  const navigate=useNavigate();

  const handlelogin=(e)=>{
    e.preventDefault();
    const cleanemail=(email||"").toLowerCase().trim();
     if(!cleanemail || !password){
      alert("Please fill all the fields");
      return;
     }
     if(cleanemail.startsWith("admin")){
      localStorage.setItem("adminEmail",email);
      localStorage.setItem("role","admin");
      navigate("/booking");
     }else if(cleanemail.startsWith("receptionist")){
      localStorage.setItem("receptionistemail",email);
      localStorage.setItem("role","receptionist");
      navigate("/booking");
     }
     else if(cleanemail.startsWith("guest")){
      localStorage.setItem("guestpanel",email);
      localStorage.setItem("role","guest");
      navigate("/booking"); 
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
              placeholder="Enter your email" onChange={(e)=>setemail(e.target.value)}
            />

            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password" 
              name="password" 
              placeholder="Enter your password" 
              onChange={(e)=>setpassword(e.target.value)}
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
