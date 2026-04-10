import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle, XCircle } from "lucide-react";
import AdminSidebar from "../components/AdminSidebar";
import StatusBadge from "../components/StatusBadge";
import "../styles/Dashboard.css";

const AdminAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/admin/appointments");
      if (response.ok) {
        const data = await response.json();
        setAppointments(data);
      }
    } catch (error) {
      console.error("Error fetching appointments:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      const response = await fetch(`http://localhost:8080/api/admin/appointments/${id}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus })
      });
      if (response.ok) {
        const updatedAppt = await response.json();
        setAppointments(appointments.map(a => a.id === id ? updatedAppt : a));
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const filteredAndSortedAppointments = appointments
    .filter(apt => filter === 'all' ? true : apt.status === filter)
    .sort((a, b) => {
      // If we're looking at 'all', bubble 'pending' to the top
      if (filter === 'all') {
        if (a.status === 'pending' && b.status !== 'pending') return -1;
        if (b.status === 'pending' && a.status !== 'pending') return 1;
      }
      // Then sort by date
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      if (dateA < dateB) return -1;
      if (dateA > dateB) return 1;
      
      // Then sort by time (assuming HH:mm string format)
      if (a.time && b.time) {
        return a.time.localeCompare(b.time);
      }
      return 0;
    });

  return (
    <div className="dashboard-layout">
      <AdminSidebar />
      <main className="dashboard-content" style={{ background: '#f8fafc' }}>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="content-header">
          <div className="welcome-section">
            <h1>All Appointments</h1>
            <p>Manage all system-wide patient appointments.</p>
          </div>
        </motion.div>

        <div style={{ display: 'flex', gap: '10px', marginTop: '20px', overflowX: 'auto', paddingBottom: '10px' }}>
          {['all', 'pending', 'approved', 'completed', 'cancelled'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                padding: '8px 16px',
                borderRadius: '20px',
                border: filter === f ? 'none' : '1px solid #cbd5e1',
                backgroundColor: filter === f ? '#0f172a' : 'white',
                color: filter === f ? 'white' : '#64748b',
                cursor: 'pointer',
                textTransform: 'capitalize',
                fontWeight: '500',
                whiteSpace: 'nowrap'
              }}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="appointments-container" style={{ marginTop: '10px' }}>
          {loading ? (
            <p>Loading appointments...</p>
          ) : filteredAndSortedAppointments.length === 0 ? (
            <p>No appointments found.</p>
          ) : (
            <div className="appointment-list">
              {filteredAndSortedAppointments.map((apt) => (
                <div key={apt.id} className="appointment-item">
                  <div className="item-left">
                    <div className="date-badge">
                      <span className="month">{new Date(apt.date).toLocaleDateString("en-US", { month: "short" })}</span>
                      <span className="day">{new Date(apt.date).getDate()}</span>
                    </div>
                    <div className="details">
                      <strong>{apt.user.firstName} {apt.user.lastName} - {apt.time}</strong>
                      <p>{apt.concern || "No concern provided"}</p>
                    </div>
                  </div>
                  
                  <div className="item-right" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <StatusBadge status={apt.status} />
                    {apt.status === 'pending' && (
                      <div style={{ display: 'flex', gap: '10px' }}>
                        <button 
                          onClick={() => updateStatus(apt.id, 'approved')}
                          style={{ background: 'none', border: 'none', color: '#10b981', cursor: 'pointer' }}
                          title="Approve"
                        >
                          <CheckCircle size={22} />
                        </button>
                        <button 
                          onClick={() => updateStatus(apt.id, 'cancelled')}
                          style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}
                          title="Reject"
                        >
                          <XCircle size={22} />
                        </button>
                      </div>
                    )}
                    {apt.status === 'approved' && (
                        <button 
                          onClick={() => updateStatus(apt.id, 'completed')}
                          style={{ background: '#10b981', border: 'none', color: 'white', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8rem' }}
                        >
                          Mark Complete
                        </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminAppointments;
