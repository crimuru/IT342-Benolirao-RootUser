import React from 'react';
import '../styles/Dashboard.css';

const Dashboard = () => {
  // Mock data to match your reference image
  const appointments = [
    { id: 1, type: 'Routine checkup and cleaning', time: '09:00 AM', date: 'Mar 5', status: 'Confirmed' },
    { id: 2, type: 'Tooth sensitivity', time: '02:00 PM', date: 'Mar 12', status: 'Pending' },
  ];

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-brand">
          <div className="brand-icon">R</div>
          <span>RootUser</span>
        </div>
        <nav className="sidebar-nav">
          <button className="nav-item active">Dashboard</button>
          <button className="nav-item">Book Appointment</button>
          <button className="nav-item">My Profile</button>
        </nav>
        <button className="sign-out">Sign Out</button>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="content-header">
          <h1>Good morning, Clyde! 👋</h1>
          <p>Here's an overview of your dental appointments.</p>
          <button className="btn-book">+ Book Appointment</button>
        </header>

        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon upcoming">📅</div>
            <div className="stat-info">
              <span>Upcoming</span>
              <h2>2</h2>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon completed">📈</div>
            <div className="stat-info">
              <span>Completed</span>
              <h2>0</h2>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon total">🕒</div>
            <div className="stat-info">
              <span>Total Visits</span>
              <h2>2</h2>
            </div>
          </div>
        </div>

        {/* Appointments List */}
        <section className="appointments-section">
          <h3>Upcoming Appointments</h3>
          <div className="appointments-list">
            {appointments.map((app) => (
              <div key={app.id} className="appointment-item">
                <div className="app-date">
                  <span className="month">{app.date.split(' ')[0]}</span>
                  <span className="day">{app.date.split(' ')[1]}</span>
                </div>
                <div className="app-details">
                  <h4>{app.type}</h4>
                  <p>{app.time}</p>
                </div>
                <span className={`status-badge ${app.status.toLowerCase()}`}>
                  {app.status}
                </span>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;