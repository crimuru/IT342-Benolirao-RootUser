import React from 'react';
import { LayoutGrid, Users, CalendarDays, LogOut, Clock } from "lucide-react";
import { useLocation, useNavigate, Link } from 'react-router-dom';
import '../styles/Admin.css'; 

const AdminSidebar = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/');
    };

    return (
        <aside className="admin-sidebar">
            <div className="admin-sidebar-header">
                <div className="admin-logo-icon">A</div>
                <h1 className="admin-logo-text">Admin Portal</h1>
            </div>

            <nav className="admin-sidebar-nav">
                <ul>
                    <li className={location.pathname === '/admin/dashboard' ? 'active' : ''}>
                        <Link to="/admin/dashboard">
                            <LayoutGrid size={20} />
                            <span>Overview</span>
                        </Link>
                    </li>
                    <li className={location.pathname === '/admin/users' ? 'active' : ''}>
                        <Link to="/admin/users">
                            <Users size={20} />
                            <span>Manage Users</span>
                        </Link>
                    </li>
                    <li className={location.pathname === '/admin/appointments' ? 'active' : ''}>
                        <Link to="/admin/appointments">
                            <CalendarDays size={20} />
                            <span>All Appointments</span>
                        </Link>
                    </li>
                    <li className={location.pathname === '/admin/slots' ? 'active' : ''}>
                        <Link to="/admin/slots">
                            <Clock size={20} />
                            <span>Manage Slots</span>
                        </Link>
                    </li>
                </ul>
            </nav>

            <div className="admin-sidebar-footer">
                <button 
                  type="button" 
                  className="admin-logout-btn" 
                  onClick={handleLogout}
                >
                    <LogOut size={20} />
                    <span>Sign Out</span>
                </button>
            </div>
        </aside>
    );
};

export default AdminSidebar;
