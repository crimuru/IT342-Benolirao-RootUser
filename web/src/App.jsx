import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Landing from './features/dashboard/Landing';
import Register from './features/auth/Register';
import Login from './features/auth/Login';
import Dashboard from './features/dashboard/Dashboard';
import Profile from './features/user/Profile';
import BookAppointment from './features/appointments/BookAppointment';
import AppointmentHistory from './features/appointments/AppointmentHistory';
import AdminDashboard from './features/admin/AdminDashboard';
import AdminUsers from './features/admin/AdminUsers';
import AdminAppointments from './features/admin/AdminAppointments';
import AdminSlots from './features/admin/AdminSlots';

const AdminRoute = ({ children }) => {
  const userString = localStorage.getItem('user');
  if (!userString) return <Navigate to="/login" />;
  const user = JSON.parse(userString);
  return user.role === 'ADMIN' ? children : <Navigate to="/dashboard" />;
};

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
        <Route path="/profile" element={<Profile />} />
        <Route path="/book" element={<BookAppointment />} />
        <Route path="/history" element={<AppointmentHistory />} />
        
        {/* Admin Routes */}
        <Route path="/admin/dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
        <Route path="/admin/users" element={<AdminRoute><AdminUsers /></AdminRoute>} />
        <Route path="/admin/appointments" element={<AdminRoute><AdminAppointments /></AdminRoute>} />
        <Route path="/admin/slots" element={<AdminRoute><AdminSlots /></AdminRoute>} />
        
        {/* Catch-all: Redirect unknown routes back to Landing */}
        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </Router>
  );
}

export default App;