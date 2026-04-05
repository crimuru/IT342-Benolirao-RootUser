import React, { useState } from 'react';
import { User, Mail, Phone, Save, CheckCircle2, Loader2 } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import '../styles/Profile.css';

const Profile = () => {
  // 1. Initial State (Updated for PH format)
  const [profileData, setProfileData] = useState({
    fullName: 'Clyde Benolirao',
    email: 'clyde@example.com',
    phone: '+63 912 345 6789', // Philippine format
    memberSince: 'January 2024'
  });

  // 2. UI Feedback States
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Handle input typing
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // 3. Simulated "Save" Function
  const handleSave = (e) => {
    e.preventDefault();
    setIsSaving(true);
    setShowSuccess(false);

    // Simulate sending data to your Spring Boot Backend (takes 1 second)
    setTimeout(() => {
      setIsSaving(false);
      setShowSuccess(true); // Show the success checkmark
      
      // Hide the success message after 3 seconds
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1000);
  };

  // Helper to get initials (e.g., "Clyde Benolirao" -> "CB")
  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
  };

  return (
    <div className="dashboard-layout">
      <Sidebar />
      
      <main className="dashboard-content profile-page">
        <header className="content-header">
          <div className="welcome-section">
            <h1>My Profile</h1>
            <p>Manage your personal information.</p>
          </div>
        </header>

        <div className="profile-grid">
          {/* Left Card: Summary */}
          <div className="profile-summary-card">
            <div className="avatar-circle">
              {getInitials(profileData.fullName)}
            </div>
            <h2 className="profile-name">{profileData.fullName}</h2>
            <p className="profile-email">{profileData.email}</p>
            <p className="profile-date">Member since {profileData.memberSince}</p>
          </div>

          {/* Right Card: Edit Form */}
          <div className="profile-edit-card">
            <h3 className="card-title">Personal Information</h3>
            
            <form className="profile-form" onSubmit={handleSave}>
              <div className="form-group">
                <label>Full Name</label>
                <div className="input-wrapper">
                  <User className="input-icon" size={18} />
                  <input 
                    type="text" 
                    name="fullName"
                    value={profileData.fullName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Email Address</label>
                <div className="input-wrapper">
                  <Mail className="input-icon" size={18} />
                  <input 
                    type="email" 
                    name="email"
                    value={profileData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Phone Number (PH)</label>
                <div className="input-wrapper">
                  <Phone className="input-icon" size={18} />
                  <input 
                    type="tel" 
                    name="phone"
                    value={profileData.phone}
                    onChange={handleChange}
                    placeholder="+63 9XX XXX XXXX"
                    required
                  />
                </div>
              </div>

              {/* Action Area with Feedback */}
              <div className="form-actions">
                <button type="submit" className="btn-save" disabled={isSaving}>
                  {isSaving ? (
                    <><Loader2 size={18} className="spinner" /> Saving...</>
                  ) : (
                    <><Save size={18} /> Save Changes</>
                  )}
                </button>

                {/* Success Message that appears after saving */}
                {showSuccess && (
                  <span className="success-msg">
                    <CheckCircle2 size={18} /> 
                    Profile updated successfully!
                  </span>
                )}
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;