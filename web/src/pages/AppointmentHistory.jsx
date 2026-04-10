import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, CheckCircle2, XCircle } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import '../styles/AppointmentHistory.css';

const AppointmentHistory = () => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userString = localStorage.getItem('user');
    if (!userString) {
      navigate('/login');
      return;
    }

    const loggedInUser = JSON.parse(userString);

    const fetchHistory = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/appointments/user/${loggedInUser.id}`);
        if (response.ok) {
          const data = await response.json();
          setAppointments(data);
        }
      } catch (error) {
        console.error('Error loading appointment history:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [navigate]);

  const completed = appointments.filter((apt) => apt.status === 'completed');
  const cancelled = appointments.filter((apt) => apt.status === 'cancelled');

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <main className="dashboard-content appointment-history-page">
        <div className="page-header">
          <h1>Appointment History</h1>
          <p>Review your completed and cancelled appointments.</p>
        </div>

        <div className="history-summary-grid">
          <div className="history-card history-completed">
            <div className="card-icon">
              <CheckCircle2 size={20} />
            </div>
            <div>
              <p>Completed</p>
              <h3>{completed.length}</h3>
            </div>
          </div>
          <div className="history-card history-cancelled">
            <div className="card-icon">
              <XCircle size={20} />
            </div>
            <div>
              <p>Cancelled</p>
              <h3>{cancelled.length}</h3>
            </div>
          </div>
          <div className="history-card history-total">
            <div className="card-icon">
              <Clock size={20} />
            </div>
            <div>
              <p>Total History</p>
              <h3>{appointments.length}</h3>
            </div>
          </div>
        </div>

        <section className="history-section">
          <h2>Completed Appointments</h2>
          {loading ? (
            <p className="empty-msg">Loading history...</p>
          ) : completed.length > 0 ? (
            <div className="history-list">
              {completed.map((apt) => (
                <article key={apt.id} className="history-item completed">
                  <div className="history-date">
                    <span>{new Date(apt.date).toLocaleDateString('en-US', { month: 'short' })}</span>
                    <strong>{new Date(apt.date).getDate()}</strong>
                  </div>
                  <div className="history-details">
                    <h3>{apt.concern || 'General Consultation'}</h3>
                    <p>{apt.time}</p>
                    <span className="status-badge completed">{apt.status}</span>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <p className="empty-msg">No completed appointments yet.</p>
          )}
        </section>

        <section className="history-section">
          <h2>Cancelled Appointments</h2>
          {loading ? (
            <p className="empty-msg">Loading history...</p>
          ) : cancelled.length > 0 ? (
            <div className="history-list">
              {cancelled.map((apt) => (
                <article key={apt.id} className="history-item cancelled">
                  <div className="history-date">
                    <span>{new Date(apt.date).toLocaleDateString('en-US', { month: 'short' })}</span>
                    <strong>{new Date(apt.date).getDate()}</strong>
                  </div>
                  <div className="history-details">
                    <h3>{apt.concern || 'General Consultation'}</h3>
                    <p>{apt.time}</p>
                    <span className="status-badge cancelled">{apt.status}</span>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <p className="empty-msg">No cancelled appointments yet.</p>
          )}
        </section>
      </main>
    </div>
  );
};

export default AppointmentHistory;
