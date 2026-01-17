/**
 * AdminSidebar
 * 
 * Main navigation sidebar with collapsible sections.
 * Reads business name and modules from context.
 */

import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useApp } from '../src/context/AppContext';
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  Users,
  Warehouse,
  BarChart3,
  Megaphone,
  Sparkles,
  Settings,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Menu,
  X,
  Store,
  HelpCircle,
  LogOut
} from 'lucide-react';

const navItems = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: LayoutDashboard,
    path: '/'
  },
  {
    id: 'orders',
    label: 'Orders',
    icon: ShoppingCart,
    path: '/orders',
    children: [
      { label: 'All Orders', path: '/orders' },
      { label: 'Order List', path: '/orders/list' },
      { label: 'Fulfillment', path: '/orders/fulfillment' },
      { label: 'Returns', path: '/orders/returns' }
    ]
  },
  {
    id: 'products',
    label: 'Products',
    icon: Package,
    path: '/products',
    children: [
      { label: 'Overview', path: '/products' },
      { label: 'All Products', path: '/products/list' },
      { label: 'Add Product', path: '/products/new' },
      { label: 'Categories', path: '/products/categories' },
      { label: 'Pricing', path: '/products/pricing' }
    ]
  },
  {
    id: 'customers',
    label: 'Customers',
    icon: Users,
    path: '/customers',
    children: [
      { label: 'Overview', path: '/customers' },
      { label: 'All Customers', path: '/customers/list' },
      { label: 'Segments', path: '/customers/segments' }
    ]
  },
  {
    id: 'inventory',
    label: 'Inventory',
    icon: Warehouse,
    path: '/inventory',
    children: [
      { label: 'Overview', path: '/inventory' },
      { label: 'Stock Levels', path: '/inventory/list' },
      { label: 'Alerts', path: '/inventory/alerts' },
      { label: 'Movements', path: '/inventory/movements' },
      { label: 'Locations', path: '/inventory/locations' }
    ]
  },
  {
    id: 'analytics',
    label: 'Analytics',
    icon: BarChart3,
    path: '/analytics',
    children: [
      { label: 'Overview', path: '/analytics' },
      { label: 'Sales', path: '/analytics/sales' },
      { label: 'Customers', path: '/analytics/customers' },
      { label: 'Products', path: '/analytics/products' },
      { label: 'Traffic', path: '/analytics/traffic' },
      { label: 'Reports', path: '/analytics/reports' }
    ]
  },
  {
    id: 'marketing',
    label: 'Marketing',
    icon: Megaphone,
    path: '/marketing',
    children: [
      { label: 'Overview', path: '/marketing' },
      { label: 'Campaigns', path: '/marketing/campaigns' },
      { label: 'Promotions', path: '/marketing/promotions' },
      { label: 'Email', path: '/marketing/email' },
      { label: 'Social', path: '/marketing/social' }
    ]
  },
  {
    id: 'ai',
    label: 'AI Manager',
    icon: Sparkles,
    path: '/ai',
    badge: 'NEW',
    children: [
      { label: 'Overview', path: '/ai' },
      { label: 'Chat', path: '/ai/chat' },
      { label: 'Insights', path: '/ai/insights' },
      { label: 'Tasks', path: '/ai/tasks' }
    ]
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: Settings,
    path: '/settings',
    children: [
      { label: 'General', path: '/settings/general' },
      { label: 'Users', path: '/settings/users' },
      { label: 'Payments', path: '/settings/payments' },
      { label: 'Integrations', path: '/settings/integrations' }
    ]
  }
];

export function AdminSidebar() {
  const location = useLocation();
  const { business, sidebarCollapsed, toggleSidebar } = useApp();
  const [expandedItems, setExpandedItems] = useState(['orders', 'products']);

  const toggleExpand = (id) => {
    setExpandedItems(prev =>
      prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const isChildActive = (item) => {
    if (!item.children) return false;
    return item.children.some(child => location.pathname === child.path);
  };

  return (
    <aside style={{
      ...styles.sidebar,
      width: sidebarCollapsed ? '72px' : '260px'
    }}>
      {/* Logo / Brand */}
      <div style={styles.brand}>
        <div style={styles.logoContainer}>
          <Store size={24} color="var(--color-primary)" />
        </div>
        {!sidebarCollapsed && (
          <div style={styles.brandInfo}>
            <span style={styles.brandName}>{business.name}</span>
            <span style={styles.brandTagline}>Admin Dashboard</span>
          </div>
        )}
        <button style={styles.collapseBtn} onClick={toggleSidebar}>
          {sidebarCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      {/* Navigation */}
      <nav style={styles.nav}>
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          const expanded = expandedItems.includes(item.id);
          const hasChildren = item.children && item.children.length > 0;

          return (
            <div key={item.id} style={styles.navGroup}>
              {/* Main Item */}
              {hasChildren ? (
                <button
                  style={{
                    ...styles.navItem,
                    ...(active ? styles.navItemActive : {})
                  }}
                  onClick={() => toggleExpand(item.id)}
                >
                  <Icon size={20} style={styles.navIcon} />
                  {!sidebarCollapsed && (
                    <>
                      <span style={styles.navLabel}>{item.label}</span>
                      {item.badge && (
                        <span style={styles.navBadge}>{item.badge}</span>
                      )}
                      <ChevronDown
                        size={16}
                        style={{
                          ...styles.expandIcon,
                          transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)'
                        }}
                      />
                    </>
                  )}
                </button>
              ) : (
                <NavLink
                  to={item.path}
                  style={({ isActive }) => ({
                    ...styles.navItem,
                    ...(isActive ? styles.navItemActive : {})
                  })}
                >
                  <Icon size={20} style={styles.navIcon} />
                  {!sidebarCollapsed && (
                    <>
                      <span style={styles.navLabel}>{item.label}</span>
                      {item.badge && (
                        <span style={styles.navBadge}>{item.badge}</span>
                      )}
                    </>
                  )}
                </NavLink>
              )}

              {/* Children */}
              {hasChildren && expanded && !sidebarCollapsed && (
                <div style={styles.navChildren}>
                  {item.children.map((child, idx) => (
                    <NavLink
                      key={idx}
                      to={child.path}
                      style={({ isActive }) => ({
                        ...styles.navChild,
                        ...(isActive ? styles.navChildActive : {})
                      })}
                    >
                      {child.label}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Footer */}
      {!sidebarCollapsed && (
        <div style={styles.footer}>
          <button style={styles.footerBtn}>
            <HelpCircle size={18} />
            Help & Support
          </button>
          <button style={styles.footerBtn}>
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      )}
    </aside>
  );
}

const styles = {
  sidebar: {
    position: 'fixed',
    top: '32px', // Account for demo banner
    left: 0,
    bottom: 0,
    backgroundColor: 'var(--color-surface)',
    borderRight: '1px solid var(--color-border)',
    display: 'flex',
    flexDirection: 'column',
    transition: 'width 0.2s ease',
    zIndex: 100,
    overflowX: 'hidden'
  },
  brand: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '20px 16px',
    borderBottom: '1px solid var(--color-border)'
  },
  logoContainer: {
    width: '40px',
    height: '40px',
    borderRadius: '12px',
    backgroundColor: 'var(--color-primary-light)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0
  },
  brandInfo: {
    flex: 1,
    minWidth: 0
  },
  brandName: {
    display: 'block',
    fontSize: '15px',
    fontWeight: 600,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  brandTagline: {
    display: 'block',
    fontSize: '11px',
    color: 'var(--color-text-muted)'
  },
  collapseBtn: {
    width: '28px',
    height: '28px',
    borderRadius: '8px',
    backgroundColor: 'var(--color-surface-2)',
    border: 'none',
    color: 'var(--color-text-muted)',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0
  },
  nav: {
    flex: 1,
    padding: '16px 12px',
    overflowY: 'auto'
  },
  navGroup: {
    marginBottom: '4px'
  },
  navItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    width: '100%',
    padding: '12px 14px',
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: '10px',
    color: 'var(--color-text-muted)',
    fontSize: '14px',
    fontWeight: 500,
    cursor: 'pointer',
    textDecoration: 'none',
    transition: 'all 0.15s ease'
  },
  navItemActive: {
    backgroundColor: 'var(--color-primary-light)',
    color: 'var(--color-primary)'
  },
  navIcon: {
    flexShrink: 0
  },
  navLabel: {
    flex: 1,
    textAlign: 'left',
    whiteSpace: 'nowrap'
  },
  navBadge: {
    padding: '2px 8px',
    backgroundColor: 'var(--color-ai)',
    color: '#ffffff',
    fontSize: '10px',
    fontWeight: 600,
    borderRadius: '10px'
  },
  expandIcon: {
    flexShrink: 0,
    transition: 'transform 0.2s ease'
  },
  navChildren: {
    marginTop: '4px',
    marginLeft: '20px',
    paddingLeft: '20px',
    borderLeft: '1px solid var(--color-border)'
  },
  navChild: {
    display: 'block',
    padding: '10px 14px',
    color: 'var(--color-text-muted)',
    fontSize: '13px',
    textDecoration: 'none',
    borderRadius: '8px',
    transition: 'all 0.15s ease'
  },
  navChildActive: {
    color: 'var(--color-text)',
    backgroundColor: 'var(--color-surface-2)'
  },
  footer: {
    padding: '16px',
    borderTop: '1px solid var(--color-border)'
  },
  footerBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    width: '100%',
    padding: '10px 14px',
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: '10px',
    color: 'var(--color-text-muted)',
    fontSize: '13px',
    cursor: 'pointer',
    transition: 'all 0.15s ease'
  }
};

export default AdminSidebar;