import React, { useState } from 'react';
import axios from 'axios';
import '../src/CSS/style.css';

export default function Signup() {
  // 1. Single state object to manage all possible input fields
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    phone: '',
    cnic: '',         // Guest only
    address: '',      // Staff only
    hiredate: '',     // Staff only
    salary: '',       // Staff only
    email: '',
    password: '',
    confirm_password: '',
    role: 'guest'     // Default role selection
  });

  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  // 2. Handler to track input changes dynamically
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // 3. Submit handler to route data to the correct backend API
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setIsError(false);

    let url = '';
    let payload = {};

    // Branching logic based on selected role
    if (formData.role === 'guest') {
      url = 'http://localhost:4000/api/user/guestSignup';
      payload = {
        firstname: formData.firstname,
        lastname: formData.lastname,
        phone: formData.phone,
        cnic: formData.cnic,
        email: formData.email,
        password: formData.password,
        confirm_password: formData.confirm_password
      };
    } else if (formData.role === 'staff') {
      url = 'http://localhost:4000/api/user/staffSignup';
      payload = {
        firstname: formData.firstname,
        lastname: formData.lastname,
        phone: formData.phone,
        address: formData.address,
        hiredate: formData.hiredate,
        salary: Number(formData.salary), // Must be a numeric value
        email: formData.email,
        password: formData.password,
        confirm_password: formData.confirm_password
      };
    } else if (formData.role === 'admin') {
      setIsError(true);
      setMessage('Admin creation is restricted. Please contact system database administrator.');
      return;
    }

    try {
      const response = await axios.post(url, payload);
      setMessage(response.data.message || 'Registration Success!');
      
      // Optional: Save JWT token to local storage upon successful signup
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
    } catch (error) {
      setIsError(true);
      setMessage(error.response?.data?.message || 'Server error during registration.');
    }
  };

  return (
    <div className="outer">
      <div className="form">
        <h1>Welcome to Stayease</h1>
        
        {/* Status Feedback Message */}
        {message && (
          <div style={{ color: isError ? '#ff4d4d' : '#2ecc71', marginBottom: '15px', fontWeight: 'bold' }}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Role selection dropdown */}
          <label htmlFor="role">Register As</label>
          <select 
            name="role" 
            id="role" 
            value={formData.role} 
            onChange={handleChange}
            style={{ width: '100%', padding: '10px', marginBottom: '15px', borderRadius: '4px' }}
          >
            <option value="guest">Guest</option>
            <option value="staff">Staff / Employee</option>
            <option value="admin">Admin</option>
          </select>

          {/* Shared Fields */}
          <label htmlFor="firstname">First Name</label>
          <input type="text" name="firstname" id="firstname" placeholder="Enter your First Name" value={formData.firstname} onChange={handleChange} required />

          <label htmlFor="lastname">Last Name</label>
          <input type="text" name="lastname" id="lastname" placeholder="Enter your Last Name" value={formData.lastname} onChange={handleChange} required />

          <label htmlFor="phone">Phone Number</label>
          <input type="text" name="phone" id="phone" placeholder="Enter phone number" value={formData.phone} onChange={handleChange} required />

          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" placeholder="Enter your email" value={formData.email} onChange={handleChange} required />

          {/* Guest Specific Field */}
          {formData.role === 'guest' && (
            <>
              <label htmlFor="cnic">CNIC</label>
              <input type="text" name="cnic" id="cnic" placeholder="e.g. 42101-XXXXXXX-X" value={formData.cnic} onChange={handleChange} required />
            </>
          )}

          {/* Staff Specific Fields */}
          {formData.role === 'staff' && (
            <>
              <label htmlFor="address">Residential Address</label>
              <input type="text" name="address" id="address" placeholder="Enter residential address" value={formData.address} onChange={handleChange} required />

              <label htmlFor="hiredate">Hiring Date</label>
              <input type="date" name="hiredate" id="hiredate" value={formData.hiredate} onChange={handleChange} required />

              <label htmlFor="salary">Expected Salary</label>
              <input type="number" name="salary" id="salary" placeholder="Enter salary amount" value={formData.salary} onChange={handleChange} required />
            </>
          )}

          {/* Password confirmation pairs required by your controller */}
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" placeholder="Create password" value={formData.password} onChange={handleChange} required />

          <label htmlFor="confirm_password">Confirm Password</label>
          <input type="password" name="confirm_password" id="confirm_password" placeholder="Repeat your password" value={formData.confirm_password} onChange={handleChange} required />
          
          <div className="links">
            <a href='/'>Already have an Account!</a>
          </div>
          
          <input type="submit" value="Register" className="button" />
        </form>
      </div>
    </div>
  );
}