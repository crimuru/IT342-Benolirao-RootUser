import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, Save, CheckCircle2, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../dashboard/Sidebar';
import '../../styles/Profile.css';

const Profile = () => {
  const navigate = useNavigate();
  // 1. Initialize state with empty strings (ready for API data)
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    memberSince: ''
  });

  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // 🔌 2. Fetch real user data on load
  useEffect(() => {
    const userString = localStorage.getItem("user");
    if (!userString) {
      navigate('/login');
      return;
    }

    const loggedInUser = JSON.parse(userString);

    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/users/${loggedInUser.id}`);
        if (response.ok) {
          const data = await response.json();
          setProfileData(data);
        }
      } catch (error) {
        console.error("Error loading profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // 💾 3. Live Save logic (PUT request to Spring Boot)
  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setShowSuccess(false);

    const userString = localStorage.getItem("user");
    if (!userString) {
      navigate('/login');
      return;
    }

    const loggedInUser = JSON.parse(userString);

    try {
      const response = await fetch(`http://localhost:8080/api/users/${loggedInUser.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profileData),
      });

      if (response.ok) {
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
      } else {
        alert("Failed to update profile.");
      }
    } catch (error) {
      console.error("Error saving profile:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const getInitials = (first, last) => {
    if (!first || !last) return "U";
    return `${first.charAt(0)}${last.charAt(0)}`.toUpperCase();
  };

  if (loading) return (
    <div className="dashboard-layout">
      <Sidebar />
      <main className="dashboard-content"><p>Loading profile...</p></main>
    </div>
  );

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
          <div className="profile-summary-card">
            <div className="avatar-circle">
              {getInitials(profileData.firstName, profileData.lastName)}
            </div>
            <h2 className="profile-name">{profileData.firstName} {profileData.lastName}</h2>
            <p className="profile-email">{profileData.email}</p>
            {/* Logic: Only show date if it exists in DB */}
            <p className="profile-date">
                Member since {profileData.memberSince || '2026'}
            </p>
          </div>

          <div className="profile-edit-card">
            <h3 className="card-title">Personal Information</h3>
            
            <form className="profile-form" onSubmit={handleSave}>
              <div className="form-row" style={{ display: 'flex', gap: '20px' }}>
                <div className="form-group" style={{ flex: 1 }}>
                  <label>First Name</label>
                  <div className="input-wrapper">
                    <User className="input-icon" size={18} />
                    <input 
                      type="text" 
                      name="firstName"
                      value={profileData.firstName || ''}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-group" style={{ flex: 1 }}>
                  <label>Last Name</label>
                  <div className="input-wrapper">
                    <User className="input-icon" size={18} />
                    <input 
                      type="text" 
                      name="lastName"
                      value={profileData.lastName || ''}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label>Email Address</label>
                <div className="input-wrapper">
                  <Mail className="input-icon" size={18} />
                  <input 
                    type="email" 
                    name="email"
                    value={profileData.email || ''}
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
                    value={profileData.phone || ''}
                    onChange={handleChange}
                    placeholder="+63 9XX XXX XXXX"
                  />
                </div>
              </div>

              <div className="form-actions">
                <button type="submit" className="btn-save" disabled={isSaving}>
                  {isSaving ? (
                    <><Loader2 size={18} className="spinner" /> Saving...</>
                  ) : (
                    <><Save size={18} /> Save Changes</>
                  )}
                </button>

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