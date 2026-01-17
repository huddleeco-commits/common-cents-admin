/**
 * OrdersPage
 * 
 * Complete order management dashboard.
 * - View all orders with advanced filtering
 * - Quick status updates
 * - Bulk actions
 * - Search and sort
 * - Export capabilities
 * 
 * Works for any industry: restaurant orders, retail purchases,
 * service bookings, etc.
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Package,
  Search,
  Filter,
  Download,
  RefreshCw,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  Eye,
  Printer,
  Mail,
  CheckCircle,
  Clock,
  Truck,
  XCircle,
  AlertCircle,
  DollarSign,
  Calendar,
  User,
  MapPin,
  Phone,
  CreditCard,
  Box
} from 'lucide-react';
import { useApi } from '../../hooks/useApi';
import OrderFilters from './OrderFilters';
import OrderActions from './OrderActions';

export function OrdersPage() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState({
    status: 'all',
    dateRange: '30days',
    paymentStatus: 'all',
    fulfillment: 'all'
  });
  const [sortBy, setSortBy] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const [showActionMenu, setShowActionMenu] = useState(null);
  const itemsPerPage = 20;

  // Fetch orders from API (starts empty for fresh deployments)
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_URL || '';
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/api/orders`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          const data = await response.json();
          // Transform API response to match component format
          const formattedOrders = (data.orders || []).map(order => ({
            ...order,
            createdAt: new Date(order.createdAt || order.created_at),
            updatedAt: new Date(order.updatedAt || order.updated_at)
          }));
          setOrders(formattedOrders);
        } else {
          // API not available or no orders - start with empty array
          setOrders([]);
        }
      } catch (error) {
        console.log('Orders API not available, starting with empty list');
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const getStatusConfig = (status) => {
    switch (status) {
      case 'completed':
        return { color: '#22c55e', bg: 'rgba(34, 197, 94, 0.1)', icon: CheckCircle, label: 'Completed' };
      case 'processing':
        return { color: '#3b82f6', bg: 'rgba(59, 130, 246, 0.1)', icon: Clock, label: 'Processing' };
      case 'pending':
        return { color: '#eab308', bg: 'rgba(234, 179, 8, 0.1)', icon: AlertCircle, label: 'Pending' };
      case 'cancelled':
        return { color: '#ef4444', bg: 'rgba(239, 68, 68, 0.1)', icon: XCircle, label: 'Cancelled' };
      default:
        return { color: '#6b7280', bg: 'rgba(107, 114, 128, 0.1)', icon: Package, label: status };
    }
  };

  const getFulfillmentConfig = (fulfillment) => {
    switch (fulfillment) {
      case 'delivered':
        return { color: '#22c55e', label: 'Delivered' };
      case 'picked_up':
        return { color: '#22c55e', label: 'Picked Up' };
      case 'preparing':
        return { color: '#3b82f6', label: 'Preparing' };
      case 'ready':
        return { color: '#8b5cf6', label: 'Ready' };
      case 'shipped':
        return { color: '#06b6d4', label: 'Shipped' };
      case 'pending':
        return { color: '#eab308', label: 'Pending' };
      case 'cancelled':
        return { color: '#ef4444', label: 'Cancelled' };
      default:
        return { color: '#6b7280', label: fulfillment };
    }
  };

  const formatDate = (date) => {
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);

    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  const handleSelectAll = () => {
    if (selectedOrders.length === filteredOrders.length) {
      setSelectedOrders([]);
    } else {
      setSelectedOrders(filteredOrders.map(o => o.id));
    }
  };

  const handleSelectOrder = (id) => {
    setSelectedOrders(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleStatusUpdate = (orderId, newStatus) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId ? { ...order, status: newStatus, updatedAt: new Date() } : order
    ));
    setShowActionMenu(null);
  };

  // Filter orders
  const filteredOrders = orders.filter(order => {
    if (activeFilters.status !== 'all' && order.status !== activeFilters.status) return false;
    if (activeFilters.paymentStatus !== 'all' && order.paymentStatus !== activeFilters.paymentStatus) return false;
    if (activeFilters.fulfillment !== 'all' && order.fulfillment !== activeFilters.fulfillment) return false;
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return order.id.toLowerCase().includes(query) ||
             order.customer.name.toLowerCase().includes(query) ||
             order.customer.email.toLowerCase().includes(query);
    }
    return true;
  });

  // Sort orders
  const sortedOrders = [...filteredOrders].sort((a, b) => {
    switch (sortBy) {
      case 'newest': return b.createdAt - a.createdAt;
      case 'oldest': return a.createdAt - b.createdAt;
      case 'highest': return b.total - a.total;
      case 'lowest': return a.total - b.total;
      default: return 0;
    }
  });

  // Paginate
  const totalPages = Math.ceil(sortedOrders.length / itemsPerPage);
  const paginatedOrders = sortedOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Stats
  const stats = {
    total: orders.length,
    pending: orders.filter(o => o.status === 'pending').length,
    processing: orders.filter(o => o.status === 'processing').length,
    completed: orders.filter(o => o.status === 'completed').length,
    revenue: orders.filter(o => o.paymentStatus === 'paid').reduce((sum, o) => sum + o.total, 0)
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <h1 style={styles.title}>Orders</h1>
          <span style={styles.orderCount}>{filteredOrders.length} orders</span>
        </div>
        <div style={styles.headerActions}>
          <button style={styles.refreshButton} onClick={() => setLoading(true)}>
            <RefreshCw size={16} />
          </button>
          <button style={styles.exportButton}>
            <Download size={16} />
            Export
          </button>
        </div>
      </div>

      {/* Stats */}
      <div style={styles.statsGrid}>
        <div style={styles.statCard}>
          <Package size={20} style={{ color: 'var(--color-primary)' }} />
          <div style={styles.statInfo}>
            <span style={styles.statValue}>{stats.total}</span>
            <span style={styles.statLabel}>Total Orders</span>
          </div>
        </div>
        <div style={styles.statCard}>
          <Clock size={20} style={{ color: '#eab308' }} />
          <div style={styles.statInfo}>
            <span style={styles.statValue}>{stats.pending}</span>
            <span style={styles.statLabel}>Pending</span>
          </div>
        </div>
        <div style={styles.statCard}>
          <Truck size={20} style={{ color: '#3b82f6' }} />
          <div style={styles.statInfo}>
            <span style={styles.statValue}>{stats.processing}</span>
            <span style={styles.statLabel}>Processing</span>
          </div>
        </div>
        <div style={styles.statCard}>
          <DollarSign size={20} style={{ color: '#22c55e' }} />
          <div style={styles.statInfo}>
            <span style={styles.statValue}>${stats.revenue.toFixed(2)}</span>
            <span style={styles.statLabel}>Revenue</span>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div style={styles.toolbar}>
        <div style={styles.searchBox}>
          <Search size={18} />
          <input
            type="text"
            placeholder="Search orders, customers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={styles.searchInput}
          />
        </div>

        <div style={styles.toolbarRight}>
          <button 
            style={{
              ...styles.filterButton,
              ...(showFilters ? styles.filterButtonActive : {})
            }}
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter size={16} />
            Filters
            {Object.values(activeFilters).some(v => v !== 'all' && v !== '30days') && (
              <span style={styles.filterBadge}>
                {Object.values(activeFilters).filter(v => v !== 'all' && v !== '30days').length}
              </span>
            )}
          </button>

          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            style={styles.sortSelect}
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="highest">Highest Value</option>
            <option value="lowest">Lowest Value</option>
          </select>
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <OrderFilters 
          filters={activeFilters}
          onChange={setActiveFilters}
          onClose={() => setShowFilters(false)}
        />
      )}

      {/* Bulk Actions */}
      {selectedOrders.length > 0 && (
        <OrderActions 
          selectedCount={selectedOrders.length}
          onClearSelection={() => setSelectedOrders([])}
          onBulkAction={(action) => console.log(action, selectedOrders)}
        />
      )}

      {/* Orders Table */}
      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr style={styles.tableHeader}>
              <th style={styles.th}>
                <input
                  type="checkbox"
                  checked={selectedOrders.length === filteredOrders.length && filteredOrders.length > 0}
                  onChange={handleSelectAll}
                  style={styles.checkbox}
                />
              </th>
              <th style={styles.th}>Order</th>
              <th style={styles.th}>Customer</th>
              <th style={styles.th}>Items</th>
              <th style={styles.th}>Total</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Fulfillment</th>
              <th style={styles.th}>Date</th>
              <th style={styles.th}></th>
            </tr>
          </thead>
          <tbody>
            {paginatedOrders.map(order => {
              const statusConfig = getStatusConfig(order.status);
              const fulfillmentConfig = getFulfillmentConfig(order.fulfillment);
              const StatusIcon = statusConfig.icon;

              return (
                <tr 
                  key={order.id} 
                  style={{
                    ...styles.tableRow,
                    ...(selectedOrders.includes(order.id) ? styles.tableRowSelected : {})
                  }}
                >
                  <td style={styles.td}>
                    <input
                      type="checkbox"
                      checked={selectedOrders.includes(order.id)}
                      onChange={() => handleSelectOrder(order.id)}
                      style={styles.checkbox}
                    />
                  </td>
                  <td style={styles.td}>
                    <button 
                      style={styles.orderId}
                      onClick={() => navigate(`/orders/${order.id}`)}
                    >
                      {order.id}
                    </button>
                  </td>
                  <td style={styles.td}>
                    <div style={styles.customerCell}>
                      <span style={styles.customerName}>{order.customer.name}</span>
                      <span style={styles.customerEmail}>{order.customer.email}</span>
                    </div>
                  </td>
                  <td style={styles.td}>
                    <span style={styles.itemCount}>
                      {order.items.reduce((sum, i) => sum + i.quantity, 0)} items
                    </span>
                  </td>
                  <td style={styles.td}>
                    <span style={styles.total}>${order.total.toFixed(2)}</span>
                  </td>
                  <td style={styles.td}>
                    <span style={{
                      ...styles.statusBadge,
                      backgroundColor: statusConfig.bg,
                      color: statusConfig.color
                    }}>
                      <StatusIcon size={12} />
                      {statusConfig.label}
                    </span>
                  </td>
                  <td style={styles.td}>
                    <span style={{
                      ...styles.fulfillmentBadge,
                      color: fulfillmentConfig.color
                    }}>
                      {fulfillmentConfig.label}
                    </span>
                  </td>
                  <td style={styles.td}>
                    <span style={styles.date}>{formatDate(order.createdAt)}</span>
                  </td>
                  <td style={styles.td}>
                    <div style={styles.actionCell}>
                      <button 
                        style={styles.actionButton}
                        onClick={() => setShowActionMenu(showActionMenu === order.id ? null : order.id)}
                      >
                        <MoreVertical size={16} />
                      </button>

                      {showActionMenu === order.id && (
                        <div style={styles.actionMenu}>
                          <button 
                            style={styles.actionMenuItem}
                            onClick={() => navigate(`/orders/${order.id}`)}
                          >
                            <Eye size={14} /> View Details
                          </button>
                          <button style={styles.actionMenuItem}>
                            <Printer size={14} /> Print
                          </button>
                          <button style={styles.actionMenuItem}>
                            <Mail size={14} /> Email Customer
                          </button>
                          <div style={styles.actionMenuDivider} />
                          {order.status !== 'completed' && order.status !== 'cancelled' && (
                            <>
                              <button 
                                style={styles.actionMenuItem}
                                onClick={() => handleStatusUpdate(order.id, 'processing')}
                              >
                                <Clock size={14} /> Mark Processing
                              </button>
                              <button 
                                style={styles.actionMenuItem}
                                onClick={() => handleStatusUpdate(order.id, 'completed')}
                              >
                                <CheckCircle size={14} /> Mark Completed
                              </button>
                            </>
                          )}
                          {order.status !== 'cancelled' && (
                            <button 
                              style={{ ...styles.actionMenuItem, color: '#ef4444' }}
                              onClick={() => handleStatusUpdate(order.id, 'cancelled')}
                            >
                              <XCircle size={14} /> Cancel Order
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {paginatedOrders.length === 0 && (
          <div style={styles.emptyState}>
            <Package size={48} style={{ opacity: 0.3 }} />
            <h3>No orders found</h3>
            <p>Try adjusting your filters or search query</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div style={styles.pagination}>
          <span style={styles.paginationInfo}>
            Showing {((currentPage - 1) * itemsPerPage) + 1} - {Math.min(currentPage * itemsPerPage, sortedOrders.length)} of {sortedOrders.length}
          </span>
          <div style={styles.paginationButtons}>
            <button
              style={styles.paginationButton}
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft size={16} />
            </button>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }
              return (
                <button
                  key={pageNum}
                  style={{
                    ...styles.paginationButton,
                    ...(currentPage === pageNum ? styles.paginationButtonActive : {})
                  }}
                  onClick={() => setCurrentPage(pageNum)}
                >
                  {pageNum}
                </button>
              );
            })}
            <button
              style={styles.paginationButton}
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: '24px 32px',
    maxWidth: '100%'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px'
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px'
  },
  title: {
    fontSize: '28px',
    fontWeight: 700,
    margin: 0
  },
  orderCount: {
    padding: '6px 12px',
    backgroundColor: 'var(--color-surface)',
    borderRadius: '16px',
    fontSize: '13px',
    color: 'var(--color-text-muted)'
  },
  headerActions: {
    display: 'flex',
    gap: '12px'
  },
  refreshButton: {
    padding: '10px',
    backgroundColor: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    borderRadius: '8px',
    color: 'var(--color-text)',
    cursor: 'pointer'
  },
  exportButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 16px',
    backgroundColor: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    borderRadius: '8px',
    color: 'var(--color-text)',
    fontSize: '14px',
    cursor: 'pointer'
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '16px',
    marginBottom: '24px'
  },
  statCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    padding: '20px',
    backgroundColor: 'var(--color-surface)',
    borderRadius: '12px',
    border: '1px solid var(--color-border)'
  },
  statInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px'
  },
  statValue: {
    fontSize: '24px',
    fontWeight: 700
  },
  statLabel: {
    fontSize: '13px',
    color: 'var(--color-text-muted)'
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '16px',
    marginBottom: '16px'
  },
  searchBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    flex: 1,
    maxWidth: '400px',
    padding: '12px 16px',
    backgroundColor: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    borderRadius: '10px'
  },
  searchInput: {
    flex: 1,
    backgroundColor: 'transparent',
    border: 'none',
    color: 'var(--color-text)',
    fontSize: '14px',
    outline: 'none'
  },
  toolbarRight: {
    display: 'flex',
    gap: '12px'
  },
  filterButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 16px',
    backgroundColor: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    borderRadius: '10px',
    color: 'var(--color-text)',
    fontSize: '14px',
    cursor: 'pointer'
  },
  filterButtonActive: {
    backgroundColor: 'var(--color-primary)',
    borderColor: 'var(--color-primary)',
    color: '#ffffff'
  },
  filterBadge: {
    padding: '2px 8px',
    backgroundColor: '#ef4444',
    borderRadius: '10px',
    fontSize: '11px',
    fontWeight: 600,
    color: '#ffffff'
  },
  sortSelect: {
    padding: '12px 16px',
    backgroundColor: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    borderRadius: '10px',
    color: 'var(--color-text)',
    fontSize: '14px',
    cursor: 'pointer',
    outline: 'none'
  },
  tableContainer: {
    backgroundColor: 'var(--color-surface)',
    borderRadius: '12px',
    border: '1px solid var(--color-border)',
    overflow: 'hidden'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse'
  },
  tableHeader: {
    backgroundColor: 'var(--color-surface-2)'
  },
  th: {
    padding: '14px 16px',
    textAlign: 'left',
    fontSize: '12px',
    fontWeight: 600,
    color: 'var(--color-text-muted)',
    textTransform: 'uppercase',
    borderBottom: '1px solid var(--color-border)'
  },
  tableRow: {
    borderBottom: '1px solid var(--color-border)',
    transition: 'background-color 0.2s'
  },
  tableRowSelected: {
    backgroundColor: 'rgba(59, 130, 246, 0.05)'
  },
  td: {
    padding: '16px',
    fontSize: '14px',
    verticalAlign: 'middle'
  },
  checkbox: {
    width: '18px',
    height: '18px',
    cursor: 'pointer'
  },
  orderId: {
    backgroundColor: 'transparent',
    border: 'none',
    color: 'var(--color-primary)',
    fontWeight: 600,
    fontSize: '14px',
    cursor: 'pointer'
  },
  customerCell: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px'
  },
  customerName: {
    fontWeight: 500
  },
  customerEmail: {
    fontSize: '12px',
    color: 'var(--color-text-muted)'
  },
  itemCount: {
    color: 'var(--color-text-muted)'
  },
  total: {
    fontWeight: 600
  },
  statusBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    padding: '6px 12px',
    borderRadius: '16px',
    fontSize: '12px',
    fontWeight: 600
  },
  fulfillmentBadge: {
    fontSize: '13px',
    fontWeight: 500
  },
  date: {
    color: 'var(--color-text-muted)',
    fontSize: '13px'
  },
  actionCell: {
    position: 'relative'
  },
  actionButton: {
    padding: '8px',
    backgroundColor: 'transparent',
    border: 'none',
    color: 'var(--color-text-muted)',
    cursor: 'pointer',
    borderRadius: '6px'
  },
  actionMenu: {
    position: 'absolute',
    top: '100%',
    right: 0,
    width: '200px',
    backgroundColor: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    borderRadius: '10px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
    zIndex: 100,
    overflow: 'hidden'
  },
  actionMenuItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    width: '100%',
    padding: '12px 16px',
    backgroundColor: 'transparent',
    border: 'none',
    color: 'var(--color-text)',
    fontSize: '13px',
    cursor: 'pointer',
    textAlign: 'left'
  },
  actionMenuDivider: {
    height: '1px',
    backgroundColor: 'var(--color-border)',
    margin: '4px 0'
  },
  emptyState: {
    textAlign: 'center',
    padding: '60px 20px',
    color: 'var(--color-text-muted)'
  },
  pagination: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '20px',
    padding: '16px 0'
  },
  paginationInfo: {
    fontSize: '14px',
    color: 'var(--color-text-muted)'
  },
  paginationButtons: {
    display: 'flex',
    gap: '8px'
  },
  paginationButton: {
    padding: '8px 14px',
    backgroundColor: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    borderRadius: '8px',
    color: 'var(--color-text)',
    fontSize: '14px',
    cursor: 'pointer'
  },
  paginationButtonActive: {
    backgroundColor: 'var(--color-primary)',
    borderColor: 'var(--color-primary)',
    color: '#ffffff'
  }
};

export default OrdersPage;