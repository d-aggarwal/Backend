import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { authAPI } from '../services/api';
import './Admin.css';

export function Admin() {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);
  const [adminData, setAdminData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.role !== 'admin') {
      navigate('/dashboard');
      return;
    }

    const fetchAdminData = async () => {
      try {
        const response = await authAPI.getAdminPanel();
        setAdminData(response.data.data);
      } catch (error) {
        console.error('Failed to fetch admin data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdminData();
  }, [user, navigate]);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  if (loading) {
    return <div className="loading">Loading admin panel...</div>;
  }

  return (
    <div className="admin">
      <header className="admin-header">
        <h1>⚙️ Admin Panel</h1>
        <div className="header-actions">
          <span className="admin-badge">Admin</span>
          <button onClick={handleLogout} className="btn-logout">
            Logout
          </button>
        </div>
      </header>

      <main className="admin-content">
        <div className="admin-grid">
          <div className="admin-card">
            <h2>📊 System Stats</h2>
            <div className="stat-row">
              <span>Total Users</span>
              <span className="stat-value">0</span>
            </div>
            <div className="stat-row">
              <span>Active Sessions</span>
              <span className="stat-value">0</span>
            </div>
          </div>

          <div className="admin-card">
            <h2>👥 User Management</h2>
            <div className="empty-state">
              <p>No users to display</p>
            </div>
          </div>

          <div className="admin-card">
            <h2>🎬 Stream Management</h2>
            <div className="empty-state">
              <p>No streams to manage</p>
            </div>
          </div>

          <div className="admin-card">
            <h2>⚙️ System Settings</h2>
            <div className="settings-list">
              <button className="setting-btn">Database Status</button>
              <button className="setting-btn">Server Logs</button>
              <button className="setting-btn">Backup Data</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
