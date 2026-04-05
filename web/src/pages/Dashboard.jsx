import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CalendarDays, Clock, Plus, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom"; // 1. Replaced Link with useNavigate
import Sidebar from "../components/Sidebar";
import StatusBadge from "../components/StatusBadge";
import "../styles/Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate(); // 2. Initialized the navigate hook

  // 1. Initialize state. Currently empty, but ready for your API.
  const [appointments, setAppointments] = useState([]);
  const [user, setUser] = useState({ fullName: "Clyde Benolirao" });

  // 2. This is where your "Future" Backend connection goes.
  useEffect(() => {
    // For now, we manually set the state so you can see the UI.
    // LATER: Replace this with axios.get("http://localhost:8080/api/user/me")
    const initialData = [
      { id: 1, date: "2026-04-05", time: "09:00 AM", concern: "Routine checkup", status: "confirmed" },
      { id: 2, date: "2026-04-12", time: "02:00 PM", concern: "Tooth sensitivity", status: "pending" },
      { id: 3, date: "2026-03-20", time: "11:30 AM", concern: "Cleaning", status: "completed" },
    ];
    setAppointments(initialData);
  }, []);

  // 3. Logic remains dynamic based on whatever is in the 'appointments' state.
  const upcoming = appointments.filter(a => a.status === "confirmed" || a.status === "pending");
  const completedCount = appointments.filter(a => a.status === "completed").length;

  const stats = [
    { label: "Upcoming", value: upcoming.length, icon: CalendarDays, color: "text-teal", bg: "bg-teal-light" },
    { label: "Completed", value: completedCount, icon: TrendingUp, color: "text-green", bg: "bg-green-light" },
    { label: "Total Visits", value: appointments.length, icon: Clock, color: "text-amber", bg: "bg-amber-light" },
  ];

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <main className="dashboard-content">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="content-header">
          <div className="welcome-section">
            <h1>Good morning, {user.fullName.split(" ")[0]}! 👋</h1>
            <p>Here's an overview of your dental appointments.</p>
          </div>
          
          {/* 3. Updated Button: Uses onClick instead of wrapping in an <a> tag */}
          <button className="btn-book" onClick={() => navigate('/book')}>
            <Plus size={18} /> Book Appointment
          </button>
          
        </motion.div>

        <div className="stats-grid">
          {stats.map((stat, i) => (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="stat-card">
              <div className={`stat-icon-circle ${stat.bg} ${stat.color}`}><stat.icon size={24} /></div>
              <div className="stat-text"><p>{stat.label}</p><h3>{stat.value}</h3></div>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="appointments-container">
          <h2>Upcoming Appointments</h2>
          <div className="appointment-list">
            {upcoming.length > 0 ? (
              upcoming.map((apt) => (
                <div key={apt.id} className="appointment-item">
                  <div className="item-left">
                    <div className="date-badge">
                      <span className="month">{new Date(apt.date).toLocaleDateString("en-US", { month: "short" })}</span>
                      <span className="day">{new Date(apt.date).getDate()}</span>
                    </div>
                    <div className="details"><strong>{apt.concern}</strong><p>{apt.time}</p></div>
                  </div>
                  <StatusBadge status={apt.status} />
                </div>
              ))
            ) : (
              <p className="empty-msg">No upcoming appointments found.</p>
            )}
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Dashboard;