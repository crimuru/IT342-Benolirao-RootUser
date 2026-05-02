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
        const loggedInUser = {
          id: response.data.id,
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          email: response.data.email,
          role: response.data.role,
        };
        localStorage.setItem("user", JSON.stringify(loggedInUser));
        
        alert("Login Successful!");
        if (response.data.role === 'ADMIN') {
          navigate('/admin/dashboard');
        } else {
          navigate('/dashboard'); 
        }
      }
    } catch (error) {
      // If the backend sends a string error message, it will show up here
      alert(error.response?.data || "Invalid email or password.");
    }
  };

  // 🚀 NEW: Function to trigger Google OAuth2
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:8080/oauth2/authorization/google";
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
        {/* 🚀 NEW: Divider and Google Button */}
        <div className="divider" style={{ margin: '20px 0', textAlign: 'center', color: '#666' }}>
          <span>OR</span>
        </div>

        <button type="button" onClick={handleGoogleLogin} className="btn-google">
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" 
            alt="Google logo" 
            className="google-icon" 
          />
          Sign in with Google
        </button>
        <p className="login-prompt">
          Don't have an account? <Link to="/register" className="sign-in-text">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;