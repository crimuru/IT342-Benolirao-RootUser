import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Users, CalendarDays, AlertCircle } from "lucide-react";
import AdminSidebar from './AdminSidebar';
import '../../styles/Admin.css';

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
    { label: "Total Users", value: stats.totalUsers, icon: Users, color: "#38bdf8", bg: "#e0f2fe" },
    { label: "Total Appointments", value: stats.totalAppointments, icon: CalendarDays, color: "#10b981", bg: "#d1fae5" },
    { label: "Pending Requests", value: stats.pendingAppointments, icon: AlertCircle, color: "#f59e0b", bg: "#fef3c7" },
  ];

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <main className="admin-content">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="admin-header">
          <div>
            <h1>System Overview</h1>
            <p>Welcome to the RootUser Administrative Portal.</p>
          </div>
        </motion.div>

        {loading ? (
          <p>Loading statistics...</p>
        ) : (
          <div className="admin-stats-grid">
            {statCards.map((stat) => (
              <div key={stat.label} className="admin-stat-card" style={{ color: stat.color }}>
                <div className="admin-stat-icon" style={{ backgroundColor: stat.bg, color: stat.color }}>
                  <stat.icon size={32} />
                </div>
                <div className="admin-stat-info">
                  <p>{stat.label}</p>
                  <h3>{stat.value}</h3>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
