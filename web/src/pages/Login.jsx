// src/pages/Login.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Register.css';

const Login = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

 const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', loginData);
      
      if (response.status === 200) {
        // 🚀 THE FIX: Save the User object Spring Boot just sent us into the "VIP Badge"
        localStorage.setItem("user", JSON.stringify(response.data));
        
        alert("Login Successful!");
        navigate('/dashboard'); 
      }
    } catch (error) {
      // If the backend sends a string error message, it will show up here
      alert(error.response?.data || "Invalid email or password.");
    }
  };

  return (
    <div className="register-page-wrapper">
      <div className="register-card">
        <h1 className="brand-logo">RootUSer</h1>
        <form onSubmit={handleSubmit}>
          <input type="email" name="email" placeholder="Email address" onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
          <button type="submit" className="register-button">Sign In</button>
        </form>
        <p className="login-prompt">
          Don't have an account? <Link to="/register" className="sign-in-text">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;