/**
 * App Context
 * 
 * Provides global state for the admin dashboard:
 * - Business config (from brain.json)
 * - User session (from real auth)
 * - Theme settings
 * - Notifications
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import brainConfig from '../config/brain.json';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  // Business configuration
  const [business, setBusiness] = useState(brainConfig.business);
  const [industry, setIndustry] = useState(brainConfig.industry);
  
  // User session - starts null, populated after login
  const [user, setUser] = useState(null);
  
  // Theme
  const [theme, setTheme] = useState('dark');
  
  // Sidebar state
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  // Notifications - start empty, populated from API
  const [notifications, setNotifications] = useState([]);
  
  // Toggle theme
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };
  
  // Toggle sidebar
  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };
  
  // Add notification
  const addNotification = (notification) => {
    setNotifications(prev => [
      { ...notification, id: Date.now(), time: new Date(), read: false },
      ...prev
    ]);
  };
  
  // Mark notification as read
  const markNotificationRead = (id) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };
  
  // Mark all as read
  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };
  
  // Clear notifications
  const clearNotifications = () => {
    setNotifications([]);
  };
  
  // Unread count
  const unreadCount = notifications.filter(n => !n.read).length;
  
  // Context value
  const value = {
    // Business
    business,
    industry,
    setBusiness,
    
    // User
    user,
    setUser,
    
    // Theme
    theme,
    toggleTheme,
    
    // Sidebar
    sidebarCollapsed,
    setSidebarCollapsed,
    toggleSidebar,
    
    // Notifications
    notifications,
    unreadCount,
    addNotification,
    markNotificationRead,
    markAllNotificationsRead,
    clearNotifications
  };
  
  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

// Custom hook for using the context
export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}

export default AppContext;