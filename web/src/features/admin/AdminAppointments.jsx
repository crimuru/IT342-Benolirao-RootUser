import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle } from "lucide-react";
import AdminSidebar from './AdminSidebar';
import StatusBadge from '../../components/ui/StatusBadge';
import '../../styles/Admin.css';

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
    <div className="admin-layout">
      <AdminSidebar />
      <main className="admin-content">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="admin-header">
          <div>
            <h1>All Appointments</h1>
            <p>Manage all system-wide patient appointments.</p>
          </div>
        </motion.div>

        <div className="admin-filters">
          {['all', 'pending', 'approved', 'completed', 'cancelled'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`filter-pill ${filter === f ? 'active' : ''}`}
            >
              {f}
            </button>
          ))}
        </div>

        <div style={{ marginTop: '20px' }}>
          {loading ? (
            <p>Loading appointments...</p>
          ) : filteredAndSortedAppointments.length === 0 ? (
            <div className="admin-empty-state">
                <p>No appointments found for "{filter}".</p>
            </div>
          ) : (
            <motion.div layout className="admin-appointment-list">
              <AnimatePresence>
                {filteredAndSortedAppointments.map((apt) => (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    key={apt.id} 
                    className="admin-appointment-card"
                  >
                    <div className="admin-appt-left">
                      <div className="admin-appt-date">
                        <span className="month">{new Date(apt.date).toLocaleDateString("en-US", { month: "short" })}</span>
                        <span className="day">{new Date(apt.date).getDate()}</span>
                      </div>
                      <div className="admin-appt-info">
                        <h4>{apt.user.firstName} {apt.user.lastName} - {apt.time}</h4>
                        <p>{apt.concern || "No concern provided"}</p>
                      </div>
                    </div>
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <StatusBadge status={apt.status} />
                      {apt.status === 'pending' && (
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button 
                            onClick={() => updateStatus(apt.id, 'approved')}
                            className="action-btn approve"
                            title="Approve"
                          >
                            <CheckCircle size={24} />
                          </button>
                          <button 
                            onClick={() => updateStatus(apt.id, 'cancelled')}
                            className="action-btn delete"
                            title="Reject"
                          >
                            <XCircle size={24} />
                          </button>
                        </div>
                      )}
                      {apt.status === 'approved' && (
                          <button 
                            onClick={() => updateStatus(apt.id, 'completed')}
                            style={{ background: '#10b981', border: 'none', color: 'white', padding: '6px 12px', borderRadius: '8px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600 }}
                          >
                            Mark Complete
                          </button>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminAppointments;
