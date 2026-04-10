import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarDays, Clock, Plus, TrendingUp, XCircle, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom"; 
import Sidebar from "../components/Sidebar";
import StatusBadge from "../components/StatusBadge";
import "../styles/Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Modal States
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  // 🚀 REFACTORED: We now rely entirely on the backend Facade for this data!
  const [dashboardData, setDashboardData] = useState({
    upcomingCount: 0,
    completedCount: 0,
    totalVisits: 0,
    upcomingAppointments: []
  });

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  useEffect(() => {
    const userString = localStorage.getItem("user");
    if (!userString) {
      navigate('/login');
      return;
    }

    const storedUser = JSON.parse(userString);
    setUser(storedUser);
  }, [navigate]);

  useEffect(() => {
    if (user?.id) {
      fetchDashboardData();
    }
  }, [user]);

  const fetchDashboardData = async () => {
    try {
      // 🚀 REFACTORED: One clean API call to the Facade endpoint
      const response = await fetch(`http://localhost:8080/api/dashboard/${user.id}`);
      if (response.ok) {
        const data = await response.json();
        // The backend did all the math, we just save it directly to state!
        setDashboardData(data);
      }
    } catch (error) {
      console.error("Error connecting to server:", error);
    } finally {
      setLoading(false);
    }
  };

  const openCancelModal = (id) => {
    setSelectedId(id);
    setShowModal(true);
  };

  const confirmCancel = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/appointments/${selectedId}/cancel`, {
        method: "PUT",
      });

      if (response.ok) {
        fetchDashboardData();
        setShowModal(false);
      } else {
        alert("Failed to cancel appointment.");
      }
    } catch (error) {
      console.error("Error cancelling:", error);
    }
  };

  // 🚀 REFACTORED: Stats are pulled straight from the Facade data payload
  const stats = [
    { label: "Upcoming", value: dashboardData.upcomingCount || 0, icon: CalendarDays, color: "text-teal", bg: "bg-teal-light" },
    { label: "Completed", value: dashboardData.completedCount || 0, icon: TrendingUp, color: "text-green", bg: "bg-green-light" },
    { label: "Total Visits", value: dashboardData.totalVisits || 0, icon: Clock, color: "text-amber", bg: "bg-amber-light" },
  ];

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <AnimatePresence>
        {showModal && (
          <div className="modal-overlay">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} 
              animate={{ opacity: 1, scale: 1 }} 
              exit={{ opacity: 0, scale: 0.95 }}
              className="modal-card"
              onClick={(e) => e.stopPropagation()} 
            >
              <div className="modal-icon-header">
                <AlertCircle size={52} color="#ff4d4d" />
              </div>
              <h3>Cancel Appointment?</h3>
              <p>Are you sure you want to cancel? This action cannot be undone.</p>
              <div className="modal-actions">
                <button 
                  type="button"
                  className="btn-no" 
                  onClick={() => setShowModal(false)}
                >
                  No, Keep it
                </button>
                <button 
                  type="button"
                  className="btn-yes" 
                  onClick={() => confirmCancel()}
                >
                  Yes, Cancel
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <main className="dashboard-content">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="content-header">
          <div className="welcome-section">
            <h1>{getGreeting()}, {user ? ((user.fullName || `${user.firstName || ''} ${user.lastName || ''}`).split(" ")[0]) : "User"}!</h1>
            <p>Here's an overview of your dental appointments.</p>
          </div>
          <button className="btn-book" onClick={() => navigate('/book')}>
            <Plus size={18} /> Book Appointment
          </button>
        </motion.div>

        <div className="stats-grid">
          {stats.map((stat) => (
            <div key={stat.label} className="stat-card">
              <div className={`stat-icon-circle ${stat.bg} ${stat.color}`}><stat.icon size={24} /></div>
              <div className="stat-text"><p>{stat.label}</p><h3>{stat.value}</h3></div>
            </div>
          ))}
        </div>

        <motion.div className="appointments-container">
          <h2>Your Appointments</h2>
          <div className="appointment-list">
            {loading ? (
              <p className="empty-msg">Loading appointments...</p>
            ) : dashboardData.upcomingAppointments && dashboardData.upcomingAppointments.length > 0 ? (
              dashboardData.upcomingAppointments.map((apt) => (
                <div key={apt.id} className="appointment-item">
                  <div className="item-left">
                    <div className="date-badge">
                      <span className="month">{new Date(apt.date).toLocaleDateString("en-US", { month: "short" })}</span>
                      <span className="day">{new Date(apt.date).getDate()}</span>
                    </div>
                    <div className="details">
                      <strong>{apt.concern || "No concern provided"}</strong>
                      <p>{apt.time}</p>
                    </div>
                  </div>
                  
                  <div className="item-right" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <StatusBadge status={apt.status} />
                    {apt.status !== 'cancelled' && (
                      <button 
                        className="btn-cancel-link"
                        onClick={() => openCancelModal(apt.id)}
                        title="Cancel Appointment"
                        style={{ background: 'none', border: 'none', color: '#ff4d4d', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                      >
                        <XCircle size={20} />
                      </button>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p className="empty-msg">No appointments found.</p>
            )}
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Dashboard;