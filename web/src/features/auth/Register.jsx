// src/pages/Register.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../styles/Register.css';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Corrected URL path to match AuthController mapping
      const response = await axios.post('http://localhost:8080/api/auth/register', formData);
      
      if (response.status === 201 || response.status === 200) {
        alert("Registration Successful!");
        navigate('/login'); 
      }
    } catch (error) {
      // Improved error message to show actual backend response
      alert(error.response?.data || "Registration failed. Check if email exists.");
    }
  };

  return (
    <div className="register-page-wrapper">
      <div className="register-card">
        <h1 className="brand-logo">RootUSer</h1>
        <form onSubmit={handleSubmit}>
          <div className="name-input-group">
            <input type="text" name="firstName" placeholder="Firstname" onChange={handleChange} required />
            <input type="text" name="lastName" placeholder="LastName" onChange={handleChange} required />
          </div>
          <input type="email" name="email" placeholder="Email address" onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
          <button type="submit" className="register-button">Create Account</button>
        </form>
        <p className="login-prompt">
          Already have an account? <Link to="/login" className="sign-in-text">Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;