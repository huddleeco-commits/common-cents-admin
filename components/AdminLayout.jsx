/**
 * AdminLayout
 * Shared layout wrapper for all admin pages.
 * Includes authentication flow with login form.
 */

import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import { useApp } from '../src/context/AppContext';
import {
  Bell,
  Search,
  Sun,
  Moon,
  ChevronRight,
  LogOut,
  Loader
} from 'lucide-react';

// API URL from environment variable
const API_URL = import.meta.env.VITE_API_URL || '';

export function AdminLayout() {
  const location = useLocation();
  const {
    business,
    industry,
    user,
    setUser,
    theme,
    toggleTheme,
    sidebarCollapsed,
    notifications,
    unreadCount
  } = useApp();

  const [loading, setLoading] = useState(true);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  // Check authentication on mount
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('adminToken');
      
      if (!token) {
        setShowLoginForm(true);
        setLoading(false);
        return;
      }

      if (!API_URL) {
        console.error('API URL not configured');
        setShowLoginForm(true);
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${API_URL}/api/auth/profile`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          setUser({
            name: data.user?.name || data.user?.email || 'Admin',
            email: data.user?.email,
            role: data.user?.is_admin ? 'Owner' : 'Staff',
            id: data.user?.id
          });
          setShowLoginForm(false);
        } else {
          localStorage.removeItem('adminToken');
          setShowLoginForm(true);
        }
      } catch (err) {
        console.error('Auth check failed:', err);
        setShowLoginForm(true);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [setUser]);

  // Handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    setLoginLoading(true);

    if (!API_URL) {
      setLoginError('API URL not configured. Check VITE_API_URL.');
      setLoginLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loginEmail, password: loginPassword })
      });

      const data = await response.json();

      if (response.ok && data.token) {
        localStorage.setItem('adminToken', data.token);
        setUser({
          name: data.user?.name || data.user?.email || 'Admin',
          email: data.user?.email,
          role: data.user?.is_admin ? 'Owner' : 'Staff',
          id: data.user?.id
        });
        setShowLoginForm(false);
        setLoginEmail('');
        setLoginPassword('');
      } else {
        setLoginError(data.error || 'Invalid email or password');
      }
    } catch (err) {
      setLoginError('Connection failed. Please try again.');
    } finally {
      setLoginLoading(false);
    }
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setUser(null);
    setShowLoginForm(true);
  };

  // Create brain object for outlet context
  const brain = {
    business,
    industry,
    labels: industry?.terminology || {
      customers: 'Customers',
      orders: 'Orders',
      items: 'Items',
      revenue: 'Revenue'
    },
    theme
  };

  // Get breadcrumbs from route
  const getBreadcrumbs = () => {
    const path = location.pathname;
    if (path === '/' || path === '/dashboard') return ['Dashboard'];
    const segments = path.split('/').filter(Boolean);
    return segments.map(s => s.charAt(0).toUpperCase() + s.slice(1));
  };

  const breadcrumbs = getBreadcrumbs();

  // Loading state
  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <Loader size={32} style={{ animation: 'spin 1s linear infinite' }} />
        <p>Loading...</p>
        <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  // Login form
  if (showLoginForm) {
    return (
      <div style={styles.loginContainer}>
        <div style={styles.loginCard}>
          <div style={styles.loginHeader}>
            <h1 style={styles.loginTitle}>{business?.name || 'Admin Dashboard'}</h1>
            <p style={styles.loginSubtitle}>Sign in to your dashboard</p>
          </div>

          <form onSubmit={handleLogin} style={styles.loginForm}>
            {loginError && (
              <div style={styles.loginError}>{loginError}</div>
            )}

            <div style={styles.formGroup}>
              <label style={styles.formLabel}>Email</label>
              <input
                type="email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                style={styles.formInput}
                placeholder="admin@example.com"
                required
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.formLabel}>Password</label>
              <input
                type="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                style={styles.formInput}
                placeholder="••••••••"
                required
              />
            </div>

            <button 
              type="submit" 
              style={{
                ...styles.loginButton,
                opacity: loginLoading ? 0.7 : 1,
                cursor: loginLoading ? 'not-allowed' : 'pointer'
              }}
              disabled={loginLoading}
            >
              {loginLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <p style={styles.loginFooter}>
            Check your deployment logs for admin credentials
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div style={{
        ...styles.main,
        marginLeft: sidebarCollapsed ? '72px' : '260px'
      }}>
        {/* Top Header */}
        <header style={styles.header}>
          <div style={styles.headerLeft}>
            <nav style={styles.breadcrumbs}>
              {breadcrumbs.map((crumb, idx) => (
                <React.Fragment key={idx}>
                  {idx > 0 && <ChevronRight size={14} style={styles.breadcrumbSep} />}
                  <span style={idx === breadcrumbs.length - 1 ? styles.breadcrumbActive : styles.breadcrumbItem}>
                    {crumb}
                  </span>
                </React.Fragment>
              ))}
            </nav>
          </div>

          <div style={styles.headerRight}>
            <div style={styles.searchBox}>
              <Search size={16} style={styles.searchIcon} />
              <input type="text" placeholder="Search..." style={styles.searchInput} />
              <span style={styles.searchShortcut}>⌘K</span>
            </div>

            <button style={styles.iconBtn} onClick={toggleTheme} title="Toggle theme">
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <button style={styles.iconBtn} title="Notifications">
              <Bell size={18} />
              {unreadCount > 0 && <span style={styles.notificationBadge}>{unreadCount}</span>}
            </button>

            <div style={styles.userMenu}>
              <div style={styles.userAvatar}>
                {user?.name?.split(' ').map(n => n[0]).join('') || 'A'}
              </div>
              <div style={styles.userInfo}>
                <span style={styles.userName}>{user?.name || 'Admin'}</span>
                <span style={styles.userRole}>{user?.role || 'Owner'}</span>
              </div>
              <button 
                onClick={handleLogout}
                style={styles.logoutBtn}
                title="Sign out"
              >
                <LogOut size={16} />
              </button>
            </div>
          </div>
        </header>

        {/* Page Content - Pass context to children */}
        <main style={styles.content}>
          <Outlet context={{ brain, business }} />
        </main>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: 'var(--color-bg)',
    color: 'var(--color-text)',
    fontFamily: 'var(--font-family)'
  },
  main: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    transition: 'margin-left 0.2s ease'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 32px',
    backgroundColor: 'var(--color-surface)',
    borderBottom: '1px solid var(--color-border)',
    position: 'sticky',
    top: 0,
    zIndex: 50,
    height: '64px'
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px'
  },
  breadcrumbs: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '14px'
  },
  breadcrumbItem: {
    color: 'var(--color-text-muted)',
    cursor: 'pointer'
  },
  breadcrumbActive: {
    color: 'var(--color-text)',
    fontWeight: 500
  },
  breadcrumbSep: {
    color: 'var(--color-text-muted)'
  },
  headerRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px'
  },
  searchBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '8px 14px',
    backgroundColor: 'var(--color-surface-2)',
    border: '1px solid var(--color-border)',
    borderRadius: '10px',
    width: '240px'
  },
  searchIcon: {
    color: 'var(--color-text-muted)'
  },
  searchInput: {
    flex: 1,
    backgroundColor: 'transparent',
    border: 'none',
    color: 'var(--color-text)',
    fontSize: '14px',
    outline: 'none'
  },
  searchShortcut: {
    fontSize: '11px',
    color: 'var(--color-text-muted)',
    padding: '2px 6px',
    backgroundColor: 'var(--color-border)',
    borderRadius: '4px'
  },
  iconBtn: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '40px',
    height: '40px',
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: '10px',
    color: 'var(--color-text-muted)',
    cursor: 'pointer'
  },
  notificationBadge: {
    position: 'absolute',
    top: '6px',
    right: '6px',
    width: '16px',
    height: '16px',
    backgroundColor: 'var(--color-error)',
    color: '#ffffff',
    fontSize: '10px',
    fontWeight: 600,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  userMenu: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '6px 12px 6px 6px',
    backgroundColor: 'var(--color-surface-2)',
    borderRadius: '12px'
  },
  userAvatar: {
    width: '36px',
    height: '36px',
    borderRadius: '10px',
    backgroundColor: 'var(--color-primary)',
    color: '#ffffff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '13px',
    fontWeight: 600
  },
  userInfo: {
    display: 'flex',
    flexDirection: 'column'
  },
  userName: {
    fontSize: '13px',
    fontWeight: 500,
    lineHeight: 1.2
  },
  userRole: {
    fontSize: '11px',
    color: 'var(--color-text-muted)',
    textTransform: 'capitalize'
  },
  logoutBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '32px',
    height: '32px',
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: '8px',
    color: 'var(--color-text-muted)',
    cursor: 'pointer',
    marginLeft: '8px'
  },
  content: {
    flex: 1,
    padding: '24px 32px',
    overflowY: 'auto'
  },
  // Loading styles
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: 'var(--color-bg, #0a0a0f)',
    color: 'var(--color-text, #ffffff)',
    gap: '16px'
  },
  // Login styles
  loginContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: '#0a0a0f',
    padding: '20px'
  },
  loginCard: {
    width: '100%',
    maxWidth: '400px',
    backgroundColor: '#12121a',
    borderRadius: '16px',
    padding: '40px',
    border: '1px solid #1e1e2e'
  },
  loginHeader: {
    textAlign: 'center',
    marginBottom: '32px'
  },
  loginTitle: {
    fontSize: '24px',
    fontWeight: 600,
    color: '#ffffff',
    margin: 0
  },
  loginSubtitle: {
    fontSize: '14px',
    color: '#6b7280',
    marginTop: '8px'
  },
  loginForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  loginError: {
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    border: '1px solid rgba(239, 68, 68, 0.3)',
    borderRadius: '8px',
    padding: '12px',
    color: '#ef4444',
    fontSize: '14px',
    textAlign: 'center'
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  formLabel: {
    fontSize: '14px',
    fontWeight: 500,
    color: '#9ca3af'
  },
  formInput: {
    padding: '12px 16px',
    backgroundColor: '#1a1a24',
    border: '1px solid #2e2e3e',
    borderRadius: '10px',
    color: '#ffffff',
    fontSize: '14px',
    outline: 'none',
    transition: 'border-color 0.2s'
  },
  loginButton: {
    padding: '14px',
    backgroundColor: '#3b82f6',
    border: 'none',
    borderRadius: '10px',
    color: '#ffffff',
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer',
    marginTop: '8px',
    transition: 'background-color 0.2s'
  },
  loginFooter: {
    textAlign: 'center',
    fontSize: '12px',
    color: '#6b7280',
    marginTop: '24px'
  }
};

export default AdminLayout;