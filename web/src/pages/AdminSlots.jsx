import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Plus, Trash2 } from "lucide-react";
import AdminSidebar from "../components/AdminSidebar";
import "../styles/Admin.css"; 

const AdminSlots = () => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (date) {
      fetchSlots();
    } else {
      setSlots([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date]);

  const fetchSlots = async () => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:8080/api/slots/admin?date=${date}`);
      if (res.ok) {
        const data = await res.json();
        // Sort chronologically
        data.sort((a, b) => a.time.localeCompare(b.time));
        setSlots(data);
      }
    } catch (e) {
      console.error("Error fetching slots", e);
    } finally {
      setLoading(false);
    }
  };

  const addSlot = async (e) => {
    e.preventDefault();
    if (!date || !time) return;

    try {
      const res = await fetch("http://localhost:8080/api/slots/admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date, time })
      });
      if (res.ok) {
        fetchSlots(); // Refresh
      } else {
        alert("Slot already exists or could not be added.");
      }
    } catch (e) {
      console.error("Failed to add slot", e);
    }
  };

  const deleteSlot = async (id, isBooked) => {
    if (isBooked) {
      const proceed = window.confirm("This slot is already booked by a patient. Are you sure you want to delete it? This will not automatically cancel the patient's appointment.");
      if (!proceed) return;
    }
    
    try {
      const res = await fetch(`http://localhost:8080/api/slots/admin/${id}`, {
        method: "DELETE"
      });
      if (res.ok) {
        setSlots(slots.filter(s => s.id !== id));
      }
    } catch (e) {
      console.error("Failed to delete slot", e);
    }
  };

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <main className="admin-content">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="admin-header">
          <div>
            <h1>Manage Schedule</h1>
            <p>Define open booking hours for your patients.</p>
          </div>
        </motion.div>

        <div className="admin-slot-grid">
          <motion.div 
            initial={{ opacity: 0, x: -20 }} 
            animate={{ opacity: 1, x: 0 }}
            className="admin-card" 
          >
            <div style={{ marginBottom: '25px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
                <div style={{ padding: '8px', background: '#e0f2fe', borderRadius: '8px', color: '#0284c7' }}>
                  <Calendar size={20} />
                </div>
                <h3 style={{ fontSize: '1.2rem', color: '#0f172a', margin: 0 }}>Select Date</h3>
              </div>
              <input 
                type="date" 
                value={date} 
                onChange={e => setDate(e.target.value)}
                className="admin-input"
                style={{ cursor: 'pointer' }}
              />
            </div>

            <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '25px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
                <div style={{ padding: '8px', background: '#fef3c7', borderRadius: '8px', color: '#d97706' }}>
                  <Plus size={20} />
                </div>
                <h3 style={{ fontSize: '1.2rem', color: '#0f172a', margin: 0 }}>Add Time</h3>
              </div>
              <form onSubmit={addSlot} style={{ display: 'flex', gap: '10px' }}>
                <input 
                  type="time" 
                  value={time} 
                  onChange={e => setTime(e.target.value)} 
                  required
                  className="admin-input"
                  style={{ flex: 1 }}
                />
                <button 
                  disabled={!date} 
                  type="submit" 
                  className="admin-btn-primary"
                >
                  <Plus size={20} />
                </button>
              </form>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }} 
            animate={{ opacity: 1, x: 0 }}
            className="admin-card"
            style={{ minHeight: '400px' }}
          >
            <div style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '15px', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '1.3rem', color: '#0f172a', margin: 0 }}>
                {date ? `Schedule for ${new Date(date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric'})}` : "Schedule Preview"}
              </h3>
            </div>
            
            <div style={{ marginTop: '10px' }}>
              {!date ? (
                <div className="admin-empty-state">
                  <Calendar size={48} style={{ marginBottom: '15px', opacity: 0.5 }} />
                  <p>Select a date to view or create slots.</p>
                </div>
              ) : loading ? (
                <div className="admin-empty-state">
                  <p style={{ color: '#0ea5e9', fontWeight: 'bold' }}>Loading slots...</p>
                </div>
              ) : slots.length === 0 ? (
                <div className="admin-empty-state">
                  <p>No slots opened for this day.</p>
                  <small>Use the form on the left to add your available hours.</small>
                </div>
              ) : (
                <motion.div layout className="slot-boxes-container">
                  <AnimatePresence>
                    {slots.map((slot, index) => (
                      <motion.div 
                        key={slot.id} 
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ delay: index * 0.05 }}
                        className={`slot-box ${slot.booked ? 'booked' : 'open'}`}
                      >
                        <strong className="slot-time">
                          {new Date(`1970-01-01T${slot.time}:00Z`).toLocaleTimeString('en-US', {timeZone:'UTC',hour12:true,hour:'numeric',minute:'2-digit'})}
                        </strong>
                        <span className="slot-status">
                          {slot.booked ? 'Booked' : 'Open'}
                        </span>
                        
                        <button 
                          onClick={() => deleteSlot(slot.id, slot.booked)}
                          className="slot-delete-btn"
                          title="Delete Slot"
                        >
                          <Trash2 size={14} />
                        </button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default AdminSlots;
