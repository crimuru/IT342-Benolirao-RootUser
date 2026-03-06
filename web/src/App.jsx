import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard'; // Import your new Dashboard page

function App() {
  return (
    <Router>
      <Routes>
        {/* Redirect root to login page */}
        <Route path="/" element={<Navigate to="/login" />} />
        
        {/* Auth Routes */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        
        {/* System Access Route */}
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;