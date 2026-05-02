import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Trash2 } from "lucide-react";
import AdminSidebar from "../components/AdminSidebar";
import "../styles/Admin.css";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/admin/users");
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user? All their appointments will be removed.")) return;
    
    try {
      const response = await fetch(`http://localhost:8080/api/admin/users/${id}`, {
        method: "DELETE"
      });
      if (response.ok) {
        setUsers(users.filter(u => u.id !== id));
      } else {
        alert("Failed to delete user");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <main className="admin-content">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="admin-header">
          <div>
            <h1>User Management</h1>
            <p>View and manage all registered accounts.</p>
          </div>
        </motion.div>

        {loading ? (
          <p>Loading users...</p>
        ) : (
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }} 
            animate={{ opacity: 1, scale: 1 }} 
            className="admin-table-container"
          >
            <table className="admin-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user.id}>
                    <td style={{ fontWeight: 600 }}>#{user.id}</td>
                    <td>{user.firstName} {user.lastName}</td>
                    <td style={{ color: '#64748b' }}>{user.email}</td>
                    <td>
                        <span className={`role-badge ${user.role.toLowerCase()}`}>
                            {user.role}
                        </span>
                    </td>
                    <td>
                      {user.role !== 'ADMIN' && (
                        <button 
                            onClick={() => deleteUser(user.id)}
                            className="action-btn delete"
                            title="Delete User"
                        >
                            <Trash2 size={18} />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default AdminUsers;
