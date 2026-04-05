import React from 'react';
import { LayoutGrid, CalendarDays, User, LogOut } from "lucide-react";
import { useLocation, Link } from 'react-router-dom'; // 1. Import useLocation and Link
import '../styles/Dashboard.css'; 

const Sidebar = () => {
    const location = useLocation(); // 2. Get the current URL path

    return (
        <aside className="sidebar">
            <div className="sidebar-header">
                <div className="logo-icon">R</div>
                <h1 className="logo-text">RootUser</h1>
            </div>

            <nav className="sidebar-nav">
                <ul>
                    {/* 3. Dynamically check if the current path matches the menu item */}
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
                    <li className={location.pathname === '/profile' ? 'active' : ''}>
                        <Link to="/profile">
                            <User size={20} />
                            <span>My Profile</span>
                        </Link>
                    </li>
                </ul>
            </nav>

            <div className="sidebar-footer">
                <Link to="/logout">
                    <LogOut size={20} />
                    <span>Sign Out</span>
                </Link>
            </div>
        </aside>
    );
};

export default Sidebar;