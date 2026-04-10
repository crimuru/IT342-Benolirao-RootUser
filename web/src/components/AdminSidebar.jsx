import React from 'react';
import { LayoutGrid, Users, CalendarDays, LogOut, Clock } from "lucide-react";
import { useLocation, useNavigate, Link } from 'react-router-dom';
import '../styles/Dashboard.css'; 

const AdminSidebar = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/');
    };

    return (
        <aside className="sidebar pb-dark-sidebar" style={{ background: '#1e293b' }}>
            <div className="sidebar-header">
                <div className="logo-icon" style={{ background: '#3b82f6', color: '#fff' }}>A</div>
                <h1 className="logo-text" style={{ color: '#fff' }}>Admin Portal</h1>
            </div>

            <nav className="sidebar-nav">
                <ul>
                    <li className={location.pathname === '/admin/dashboard' ? 'active' : ''}>
                        <Link to="/admin/dashboard" style={{ color: '#cbd5e1' }}>
                            <LayoutGrid size={20} />
                            <span>Overview</span>
                        </Link>
                    </li>
                    <li className={location.pathname === '/admin/users' ? 'active' : ''}>
                        <Link to="/admin/users" style={{ color: '#cbd5e1' }}>
                            <Users size={20} />
                            <span>Manage Users</span>
                        </Link>
                    </li>
                    <li className={location.pathname === '/admin/appointments' ? 'active' : ''}>
                        <Link to="/admin/appointments" style={{ color: '#cbd5e1' }}>
                            <CalendarDays size={20} />
                            <span>All Appointments</span>
                        </Link>
                    </li>
                    <li className={location.pathname === '/admin/slots' ? 'active' : ''}>
                        <Link to="/admin/slots" style={{ color: '#cbd5e1' }}>
                            <Clock size={20} />
                            <span>Manage Slots</span>
                        </Link>
                    </li>
                </ul>
            </nav>

            <div className="sidebar-footer">
                <button 
                  type="button" 
                  className="logout-button" 
                  onClick={handleLogout}
                  style={{ color: '#f87171' }}
                >
                    <LogOut size={20} />
                    <span>Sign Out</span>
                </button>
            </div>
        </aside>
    );
};

export default AdminSidebar;
