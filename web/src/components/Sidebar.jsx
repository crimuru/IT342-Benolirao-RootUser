import React from 'react';
import { LayoutGrid, CalendarDays, User, LogOut, Clock } from "lucide-react";
import { useLocation, useNavigate, Link } from 'react-router-dom';
import '../styles/Dashboard.css'; 

const Sidebar = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/');
    };

    return (
        <aside className="sidebar">
            <div className="sidebar-header">
                <div className="logo-icon">R</div>
                <h1 className="logo-text">RootUser</h1>
            </div>

            <nav className="sidebar-nav">
                <ul>
                    <li className={location.pathname === '/dashboard' ? 'active' : ''}>
                        <Link to="/dashboard">
                            <LayoutGrid size={20} />
                            <span>Dashboard</span>
                        </Link>
                    </li>
                    <li className={location.pathname === '/book' ? 'active' : ''}>
                        <Link to="/book">
                            <CalendarDays size={20} />
                            <span>Book Appointment</span>
                        </Link>
                    </li>
                    <li className={location.pathname === '/history' ? 'active' : ''}>
                        <Link to="/history">
                            <Clock size={20} />
                            <span>History</span>
                        </Link>
                    </li>
                    <li className={location.pathname === '/profile' ? 'active' : ''}>
                        <Link to="/profile">
                            <User size={20} />
                            <span>My Profile</span>
                        </Link>
                    </li>
                </ul>
            </nav>

            <div className="sidebar-footer">
                <button type="button" className="logout-button" onClick={handleLogout}>
                    <LogOut size={20} />
                    <span>Sign Out</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;