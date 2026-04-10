import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, Plus, Trash2 } from "lucide-react";
import AdminSidebar from "../components/AdminSidebar";
import "../styles/Dashboard.css"; // Reusing layout

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
    <div className="dashboard-layout">
      <AdminSidebar />
      <main className="dashboard-content" style={{ background: '#f8fafc', padding: '30px' }}>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="content-header" style={{ marginBottom: '30px' }}>
          <div className="welcome-section">
            <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#0f172a' }}>Manage Schedule</h1>
            <p style={{ color: '#64748b', fontSize: '1.1rem' }}>Define open booking hours for your patients.</p>
          </div>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 2fr', gap: '30px', alignItems: 'start' }}>
          
          <motion.div 
            initial={{ opacity: 0, x: -20 }} 
            animate={{ opacity: 1, x: 0 }}
            className="booking-card" 
            style={{ padding: '25px', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0', background: 'white' }}
          >
            <div style={{ marginBottom: '25px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
                <div style={{ padding: '8px', background: '#e0f2fe', borderRadius: '8px', color: '#0284c7' }}>
                  <Calendar size={20} />
                </div>
                <h3 style={{ fontSize: '1.2rem', color: '#1e293b', margin: 0 }}>Select Date</h3>
              </div>
              <input 
                type="date" 
                value={date} 
                onChange={e => setDate(e.target.value)}
                style={{ 
                  width: '100%', padding: '12px 16px', borderRadius: '10px', 
                  border: '1px solid #cbd5e1', fontSize: '1rem', outline: 'none',
                  transition: 'border 0.2s',
                  cursor: 'pointer',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '25px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
                <div style={{ padding: '8px', background: '#fef3c7', borderRadius: '8px', color: '#d97706' }}>
                  <Plus size={20} />
                </div>
                <h3 style={{ fontSize: '1.2rem', color: '#1e293b', margin: 0 }}>Add Time</h3>
              </div>
              <form onSubmit={addSlot} style={{ display: 'flex', gap: '10px' }}>
                <input 
                  type="time" 
                  value={time} 
                  onChange={e => setTime(e.target.value)} 
                  required
                  style={{ 
                    flex: 1, padding: '12px 16px', borderRadius: '10px', 
                    border: '1px solid #cbd5e1', fontSize: '1rem', outline: 'none',
                    transition: 'border 0.2s',
                    boxSizing: 'border-box'
                  }}
                />
                <button 
                  disabled={!date} 
                  type="submit" 
                  style={{ 
                    padding: '12px 20px', 
                    background: date ? 'linear-gradient(135deg, #0ea5e9, #2563eb)' : '#cbd5e1', 
                    color: 'white', 
                    borderRadius: '10px', 
                    border: 'none', 
                    cursor: date ? 'pointer' : 'not-allowed',
                    boxShadow: date ? '0 4px 12px rgba(14, 165, 233, 0.3)' : 'none',
                    transition: 'transform 0.1s, boxShadow 0.2s'
                  }}
                >
                  <Plus size={20} />
                </button>
              </form>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }} 
            animate={{ opacity: 1, x: 0 }}
            className="booking-card"
            style={{ padding: '25px', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0', background: 'white', minHeight: '400px' }}
          >
            <div style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '15px', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '1.3rem', color: '#0f172a', margin: 0 }}>
                {date ? `Schedule for ${new Date(date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric'})}` : "Schedule Preview"}
              </h3>
            </div>
            
            <div style={{ marginTop: '10px' }}>
              {!date ? (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '200px', color: '#94a3b8' }}>
                  <Calendar size={48} style={{ marginBottom: '15px', opacity: 0.5 }} />
                  <p style={{ fontSize: '1.1rem' }}>Select a date to view or create slots.</p>
                </div>
              ) : loading ? (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
                  <p style={{ color: '#0ea5e9', fontWeight: 'bold' }}>Loading slots...</p>
                </div>
              ) : slots.length === 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '200px', color: '#94a3b8' }}>
                  <p style={{ fontSize: '1.1rem' }}>No slots opened for this day.</p>
                  <p style={{ fontSize: '0.9rem' }}>Use the form on the left to add your available hours.</p>
                </div>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '15px' }}>
                  {slots.map((slot, index) => (
                    <motion.div 
                      key={slot.id} 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                      style={{ 
                        border: `1px solid ${slot.booked ? '#e2e8f0' : '#bae6fd'}`, 
                        background: slot.booked ? '#f8fafc' : 'linear-gradient(to bottom right, #f0f9ff, #e0f2fe)',
                        padding: '20px 15px', 
                        borderRadius: '12px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative',
                        boxShadow: slot.booked ? 'none' : '0 2px 8px rgba(14, 165, 233, 0.15)',
                      }}
                    >
                      <strong style={{ fontSize: '1.3rem', color: slot.booked ? '#94a3b8' : '#0369a1', marginBottom: '8px' }}>
                        {new Date(`1970-01-01T${slot.time}:00Z`).toLocaleTimeString('en-US', {timeZone:'UTC',hour12:true,hour:'numeric',minute:'2-digit'})}
                      </strong>
                      <span style={{ 
                        fontSize: '0.75rem', 
                        padding: '4px 10px', 
                        borderRadius: '12px',
                        background: slot.booked ? '#fee2e2' : '#dcfce3',
                        color: slot.booked ? '#ef4444' : '#16a34a', 
                        fontWeight: '600',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px'
                      }}>
                        {slot.booked ? 'Booked' : 'Open'}
                      </span>
                      
                      <button 
                        onClick={() => deleteSlot(slot.id, slot.booked)}
                        style={{ 
                          position: 'absolute', 
                          top: '6px', 
                          right: '6px', 
                          background: 'white', 
                          border: 'none', 
                          color: '#ef4444', 
                          cursor: 'pointer',
                          padding: '5px',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                        }}
                        title="Delete Slot"
                      >
                        <Trash2 size={14} />
                      </button>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default AdminSlots;
