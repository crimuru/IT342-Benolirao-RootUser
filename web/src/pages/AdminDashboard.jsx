import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Users, CalendarDays, AlertCircle } from "lucide-react";
import AdminSidebar from "../components/AdminSidebar";
import "../styles/Dashboard.css";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalAppointments: 0,
    pendingAppointments: 0
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/admin/dashboard-stats");
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error("Failed to fetch admin stats:", error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    { label: "Total Users", value: stats.totalUsers, icon: Users, color: "text-blue", bg: "bg-blue-light" },
    { label: "Total Appointments", value: stats.totalAppointments, icon: CalendarDays, color: "text-teal", bg: "bg-teal-light" },
    { label: "Pending Requests", value: stats.pendingAppointments, icon: AlertCircle, color: "text-amber", bg: "bg-amber-light" },
  ];

  return (
    <div className="dashboard-layout">
      <AdminSidebar />
      <main className="dashboard-content" style={{ background: '#f8fafc' }}>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="content-header">
          <div className="welcome-section">
            <h1>System Overview</h1>
            <p>Welcome to the RootUser Administrative Portal.</p>
          </div>
        </motion.div>

        {loading ? (
          <p>Loading statistics...</p>
        ) : (
          <div className="stats-grid">
            {statCards.map((stat) => (
              <div key={stat.label} className="stat-card" style={{ borderTop: `4px solid ${stat.color === 'text-blue' ? '#3b82f6' : stat.color === 'text-teal' ? '#14b8a6' : '#f59e0b'}` }}>
                <div className={`stat-icon-circle ${stat.bg} ${stat.color}`}><stat.icon size={24} /></div>
                <div className="stat-text"><p>{stat.label}</p><h3>{stat.value}</h3></div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
