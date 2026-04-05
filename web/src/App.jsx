import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Landing from './pages/Landing'; 
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile'; // <-- 1. Import your new Profile page
import BookAppointment from './pages/BookAppointment';

function App() {
  return (
    <Router>
      <Routes>
        
        {/* Main entry point for the site */}
        <Route path="/" element={<Landing />} />
        
        {/* Auth Routes */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        
        {/* Protected/System Access Routes */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} /> {/* <-- 2. Add the Profile route */}
       <Route path="/book" element={<BookAppointment />} />
        {/* Catch-all: Redirect unknown routes back to Landing */}
        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </Router>
  );
}

export default App;