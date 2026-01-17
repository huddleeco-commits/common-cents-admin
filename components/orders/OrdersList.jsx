/**
 * OrdersList
 * 
 * Comprehensive order management list:
 * - Filterable/sortable orders table
 * - Bulk actions
 * - Quick status updates
 * - Order search
 * - Export functionality
 * - Pagination
 */

import React, { useState, useEffect } from 'react';
import {
  Package,
  Search,
  Filter,
  Download,
  MoreHorizontal,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Check,
  X,
  Eye,
  Edit,
  Trash2,
  Printer,
  Mail,
  Truck,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  RefreshCw,
  DollarSign,
  Calendar,
  User,
  MapPin,
  CreditCard,
  ShoppingBag,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  MoreVertical,
  FileText,
  Send,
  Box,
  Tag
} from 'lucide-react';

export function OrdersList() {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [sortConfig, setSortConfig] = useState({ key: 'createdAt', direction: 'desc' });
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [showBulkActions, setShowBulkActions] = useState(false);
  const ordersPerPage = 15;

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
          const orderList = data.orders || [];
          setOrders(orderList);
          setFilteredOrders(orderList);
        } else {
          // API not available or no orders - start with empty array
          setOrders([]);
          setFilteredOrders([]);
        }
      } catch (error) {
        console.log('Orders API not available, starting with empty list');
        setOrders([]);
        setFilteredOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Filter and sort orders
  useEffect(() => {
    let result = [...orders];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(order =>
        order.id.toLowerCase().includes(query) ||
        order.customer.name.toLowerCase().includes(query) ||
        order.customer.email.toLowerCase().includes(query)
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      result = result.filter(order => order.status === statusFilter);
    }

    // Date filter
    if (dateFilter !== 'all') {
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      
      result = result.filter(order => {
        const orderDate = new Date(order.createdAt);
        switch (dateFilter) {
          case 'today':
            return orderDate >= today;
          case 'yesterday':
            const yesterday = new Date(today);
            yesterday.setDate(yesterday.getDate() - 1);
            return orderDate >= yesterday && orderDate < today;
          case 'week':
            const weekAgo = new Date(today);
            weekAgo.setDate(weekAgo.getDate() - 7);
            return orderDate >= weekAgo;
          case 'month':
            const monthAgo = new Date(today);
            monthAgo.setMonth(monthAgo.getMonth() - 1);
            return orderDate >= monthAgo;
          default:
            return true;
        }
      });
    }

    // Sort
    result.sort((a, b) => {
      let aVal = a[sortConfig.key];
      let bVal = b[sortConfig.key];

      if (sortConfig.key === 'customer') {
        aVal = a.customer.name;
        bVal = b.customer.name;
      }

      if (sortConfig.key === 'createdAt' || sortConfig.key === 'updatedAt') {
        aVal = new Date(aVal);
        bVal = new Date(bVal);
      }

      if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });

    setFilteredOrders(result);
    setCurrentPage(1);
  }, [orders, searchQuery, statusFilter, dateFilter, sortConfig]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatTime = (dateStr) => {
    return new Date(dateStr).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit'
    });
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'pending':
        return { bg: 'rgba(249, 115, 22, 0.1)', color: '#f97316', icon: <Clock size={12} /> };
      case 'processing':
        return { bg: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6', icon: <RefreshCw size={12} /> };
      case 'shipped':
        return { bg: 'rgba(139, 92, 246, 0.1)', color: '#8b5cf6', icon: <Truck size={12} /> };
      case 'delivered':
        return { bg: 'rgba(34, 197, 94, 0.1)', color: '#22c55e', icon: <CheckCircle size={12} /> };
      case 'cancelled':
        return { bg: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', icon: <XCircle size={12} /> };
      case 'refunded':
        return { bg: 'rgba(107, 114, 128, 0.1)', color: '#6b7280', icon: <RefreshCw size={12} /> };
      case 'on_hold':
        return { bg: 'rgba(251, 191, 36, 0.1)', color: '#f59e0b', icon: <AlertTriangle size={12} /> };
      default:
        return { bg: 'rgba(107, 114, 128, 0.1)', color: '#6b7280', icon: null };
    }
  };

  const getPaymentStatusStyle = (status) => {
    switch (status) {
      case 'paid':
        return { bg: 'rgba(34, 197, 94, 0.1)', color: '#22c55e' };
      case 'pending':
        return { bg: 'rgba(249, 115, 22, 0.1)', color: '#f97316' };
      case 'refunded':
        return { bg: 'rgba(107, 114, 128, 0.1)', color: '#6b7280' };
      case 'failed':
        return { bg: 'rgba(239, 68, 68, 0.1)', color: '#ef4444' };
      default:
        return { bg: 'rgba(107, 114, 128, 0.1)', color: '#6b7280' };
    }
  };

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleSelectAll = () => {
    if (selectedOrders.length === paginatedOrders.length) {
      setSelectedOrders([]);
    } else {
      setSelectedOrders(paginatedOrders.map(o => o.id));
    }
  };

  const handleSelectOrder = (orderId) => {
    setSelectedOrders(prev =>
      prev.includes(orderId)
        ? prev.filter(id => id !== orderId)
        : [...prev, orderId]
    );
  };

  const statusCounts = {
    all: orders.length,
    pending: orders.filter(o => o.status === 'pending').length,
    processing: orders.filter(o => o.status === 'processing').length,
    shipped: orders.filter(o => o.status === 'shipped').length,
    delivered: orders.filter(o => o.status === 'delivered').length,
    cancelled: orders.filter(o => o.status === 'cancelled').length
  };

  // Pagination
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);
  const startIndex = (currentPage - 1) * ordersPerPage;
  const paginatedOrders = filteredOrders.slice(startIndex, startIndex + ordersPerPage);

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return <ArrowUpDown size={14} />;
    return sortConfig.direction === 'asc' ? <ArrowUp size={14} /> : <ArrowDown size={14} />;
  };

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <Package size={48} style={{ opacity: 0.5 }} />
        <p>Loading orders...</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <h1 style={styles.title}>Orders</h1>
          <p style={styles.subtitle}>{filteredOrders.length} orders found</p>
        </div>
        <div style={styles.headerRight}>
          <button style={styles.secondaryBtn}>
            <Download size={16} />
            Export
          </button>
          <button style={styles.primaryBtn}>
            <Package size={18} />
            Create Order
          </button>
        </div>
      </div>

      {/* Status Tabs */}
      <div style={styles.statusTabs}>
        {[
          { id: 'all', label: 'All Orders' },
          { id: 'pending', label: 'Pending' },
          { id: 'processing', label: 'Processing' },
          { id: 'shipped', label: 'Shipped' },
          { id: 'delivered', label: 'Delivered' },
          { id: 'cancelled', label: 'Cancelled' }
        ].map(tab => (
          <button
            key={tab.id}
            style={{
              ...styles.statusTab,
              ...(statusFilter === tab.id ? styles.statusTabActive : {})
            }}
            onClick={() => setStatusFilter(tab.id)}
          >
            {tab.label}
            <span style={{
              ...styles.tabCount,
              ...(statusFilter === tab.id ? styles.tabCountActive : {})
            }}>
              {statusCounts[tab.id] || 0}
            </span>
          </button>
        ))}
      </div>

      {/* Toolbar */}
      <div style={styles.toolbar}>
        <div style={styles.toolbarLeft}>
          <div style={styles.searchBox}>
            <Search size={18} color="var(--color-text-muted)" />
            <input
              type="text"
              placeholder="Search orders, customers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={styles.searchInput}
            />
            {searchQuery && (
              <button style={styles.clearBtn} onClick={() => setSearchQuery('')}>
                <X size={14} />
              </button>
            )}
          </div>

          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            style={styles.filterSelect}
          >
            <option value="all">All Time</option>
            <option value="today">Today</option>
            <option value="yesterday">Yesterday</option>
            <option value="week">Last 7 Days</option>
            <option value="month">Last 30 Days</option>
          </select>

          <button
            style={{
              ...styles.filterBtn,
              ...(showFilters ? styles.filterBtnActive : {})
            }}
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter size={16} />
            Filters
          </button>
        </div>

        <div style={styles.toolbarRight}>
          {selectedOrders.length > 0 && (
            <div style={styles.bulkActions}>
              <span style={styles.selectedCount}>{selectedOrders.length} selected</span>
              <button style={styles.bulkBtn}>
                <Printer size={14} />
                Print
              </button>
              <button style={styles.bulkBtn}>
                <Mail size={14} />
                Email
              </button>
              <button style={styles.bulkBtn}>
                <Truck size={14} />
                Ship
              </button>
              <button style={{...styles.bulkBtn, color: '#ef4444'}}>
                <Trash2 size={14} />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Orders Table */}
      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead>
            <tr style={styles.tableHeader}>
              <th style={styles.thCheckbox}>
                <input
                  type="checkbox"
                  checked={selectedOrders.length === paginatedOrders.length && paginatedOrders.length > 0}
                  onChange={handleSelectAll}
                  style={styles.checkbox}
                />
              </th>
              <th style={styles.th} onClick={() => handleSort('id')}>
                <div style={styles.thContent}>
                  Order {getSortIcon('id')}
                </div>
              </th>
              <th style={styles.th} onClick={() => handleSort('customer')}>
                <div style={styles.thContent}>
                  Customer {getSortIcon('customer')}
                </div>
              </th>
              <th style={styles.th} onClick={() => handleSort('items')}>
                <div style={styles.thContent}>
                  Items {getSortIcon('items')}
                </div>
              </th>
              <th style={styles.th} onClick={() => handleSort('total')}>
                <div style={styles.thContent}>
                  Total {getSortIcon('total')}
                </div>
              </th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Payment</th>
              <th style={styles.th} onClick={() => handleSort('createdAt')}>
                <div style={styles.thContent}>
                  Date {getSortIcon('createdAt')}
                </div>
              </th>
              <th style={styles.thActions}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedOrders.map((order) => {
              const statusStyle = getStatusStyle(order.status);
              const paymentStyle = getPaymentStatusStyle(order.paymentStatus);
              const isSelected = selectedOrders.includes(order.id);

              return (
                <tr
                  key={order.id}
                  style={{
                    ...styles.tr,
                    ...(isSelected ? styles.trSelected : {})
                  }}
                >
                  <td style={styles.tdCheckbox}>
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => handleSelectOrder(order.id)}
                      style={styles.checkbox}
                    />
                  </td>
                  <td style={styles.td}>
                    <span style={styles.orderId}>{order.id}</span>
                  </td>
                  <td style={styles.td}>
                    <div style={styles.customerCell}>
                      <div style={styles.customerAvatar}>
                        {order.customer.name.charAt(0)}
                      </div>
                      <div style={styles.customerInfo}>
                        <span style={styles.customerName}>{order.customer.name}</span>
                        <span style={styles.customerEmail}>{order.customer.email}</span>
                      </div>
                    </div>
                  </td>
                  <td style={styles.td}>
                    <span style={styles.itemsCount}>
                      <ShoppingBag size={14} />
                      {order.items} item{order.items !== 1 ? 's' : ''}
                    </span>
                  </td>
                  <td style={styles.td}>
                    <span style={styles.total}>{formatCurrency(order.total)}</span>
                  </td>
                  <td style={styles.td}>
                    <span style={{
                      ...styles.statusBadge,
                      backgroundColor: statusStyle.bg,
                      color: statusStyle.color
                    }}>
                      {statusStyle.icon}
                      {order.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td style={styles.td}>
                    <span style={{
                      ...styles.paymentBadge,
                      backgroundColor: paymentStyle.bg,
                      color: paymentStyle.color
                    }}>
                      {order.paymentStatus}
                    </span>
                  </td>
                  <td style={styles.td}>
                    <div style={styles.dateCell}>
                      <span style={styles.date}>{formatDate(order.createdAt)}</span>
                      <span style={styles.time}>{formatTime(order.createdAt)}</span>
                    </div>
                  </td>
                  <td style={styles.tdActions}>
                    <div style={styles.actions}>
                      <button style={styles.actionBtn} title="View">
                        <Eye size={16} />
                      </button>
                      <button style={styles.actionBtn} title="Edit">
                        <Edit size={16} />
                      </button>
                      <button style={styles.actionBtn} title="Print">
                        <Printer size={16} />
                      </button>
                      <button style={styles.actionBtn} title="More">
                        <MoreVertical size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Empty State */}
      {filteredOrders.length === 0 && (
        <div style={styles.emptyState}>
          <Package size={48} color="var(--color-text-muted)" />
          <h3>No orders found</h3>
          <p>Try adjusting your search or filters</p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div style={styles.pagination}>
          <div style={styles.paginationInfo}>
            Showing {startIndex + 1} to {Math.min(startIndex + ordersPerPage, filteredOrders.length)} of {filteredOrders.length} orders
          </div>
          <div style={styles.paginationControls}>
            <button
              style={{
                ...styles.pageBtn,
                ...(currentPage === 1 ? styles.pageBtnDisabled : {})
              }}
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
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
                    ...styles.pageBtn,
                    ...(currentPage === pageNum ? styles.pageBtnActive : {})
                  }}
                  onClick={() => setCurrentPage(pageNum)}
                >
                  {pageNum}
                </button>
              );
            })}

            <button
              style={{
                ...styles.pageBtn,
                ...(currentPage === totalPages ? styles.pageBtnDisabled : {})
              }}
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
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
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '400px',
    gap: '16px',
    color: 'var(--color-text-muted)'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '24px'
  },
  headerLeft: {},
  title: {
    fontSize: '28px',
    fontWeight: 700,
    margin: '0 0 4px 0'
  },
  subtitle: {
    fontSize: '14px',
    color: 'var(--color-text-muted)',
    margin: 0
  },
  headerRight: {
    display: 'flex',
    gap: '12px'
  },
  secondaryBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 16px',
    backgroundColor: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    borderRadius: '10px',
    color: 'var(--color-text)',
    fontSize: '14px',
    cursor: 'pointer'
  },
  primaryBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 20px',
    backgroundColor: 'var(--color-primary)',
    border: 'none',
    borderRadius: '10px',
    color: '#ffffff',
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer'
  },
  statusTabs: {
    display: 'flex',
    gap: '4px',
    marginBottom: '20px',
    borderBottom: '1px solid var(--color-border)',
    paddingBottom: '12px'
  },
  statusTab: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 16px',
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: '10px',
    color: 'var(--color-text-muted)',
    fontSize: '14px',
    fontWeight: 500,
    cursor: 'pointer'
  },
  statusTabActive: {
    backgroundColor: 'var(--color-surface)',
    color: 'var(--color-text)'
  },
  tabCount: {
    padding: '2px 8px',
    backgroundColor: 'var(--color-surface-2)',
    borderRadius: '10px',
    fontSize: '12px'
  },
  tabCountActive: {
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    color: 'var(--color-primary)'
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
    gap: '16px'
  },
  toolbarLeft: {
    display: 'flex',
    gap: '12px',
    alignItems: 'center'
  },
  searchBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '10px 14px',
    backgroundColor: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    borderRadius: '10px',
    width: '300px'
  },
  searchInput: {
    flex: 1,
    backgroundColor: 'transparent',
    border: 'none',
    color: 'var(--color-text)',
    fontSize: '14px',
    outline: 'none'
  },
  clearBtn: {
    padding: '4px',
    backgroundColor: 'transparent',
    border: 'none',
    color: 'var(--color-text-muted)',
    cursor: 'pointer'
  },
  filterSelect: {
    padding: '10px 14px',
    backgroundColor: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    borderRadius: '10px',
    color: 'var(--color-text)',
    fontSize: '14px',
    cursor: 'pointer'
  },
  filterBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 14px',
    backgroundColor: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    borderRadius: '10px',
    color: 'var(--color-text)',
    fontSize: '14px',
    cursor: 'pointer'
  },
  filterBtnActive: {
    backgroundColor: 'var(--color-primary)',
    borderColor: 'var(--color-primary)',
    color: '#fff'
  },
  toolbarRight: {},
  bulkActions: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  selectedCount: {
    fontSize: '13px',
    color: 'var(--color-text-muted)',
    marginRight: '8px'
  },
  bulkBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '8px 12px',
    backgroundColor: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    borderRadius: '8px',
    color: 'var(--color-text)',
    fontSize: '13px',
    cursor: 'pointer'
  },
  tableWrapper: {
    backgroundColor: 'var(--color-surface)',
    borderRadius: '16px',
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
    cursor: 'pointer',
    userSelect: 'none'
  },
  thCheckbox: {
    padding: '14px 16px',
    width: '40px'
  },
  thActions: {
    padding: '14px 16px',
    width: '140px'
  },
  thContent: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px'
  },
  tr: {
    borderBottom: '1px solid var(--color-border)',
    transition: 'background-color 0.15s ease'
  },
  trSelected: {
    backgroundColor: 'rgba(59, 130, 246, 0.05)'
  },
  td: {
    padding: '16px',
    fontSize: '14px'
  },
  tdCheckbox: {
    padding: '16px',
    width: '40px'
  },
  tdActions: {
    padding: '16px',
    width: '140px'
  },
  checkbox: {
    width: '16px',
    height: '16px',
    cursor: 'pointer'
  },
  orderId: {
    fontWeight: 600,
    color: 'var(--color-primary)'
  },
  customerCell: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  customerAvatar: {
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    backgroundColor: 'var(--color-primary)',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '14px',
    fontWeight: 600
  },
  customerInfo: {
    display: 'flex',
    flexDirection: 'column'
  },
  customerName: {
    fontWeight: 500,
    marginBottom: '2px'
  },
  customerEmail: {
    fontSize: '12px',
    color: 'var(--color-text-muted)'
  },
  itemsCount: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    color: 'var(--color-text-muted)'
  },
  total: {
    fontWeight: 600
  },
  statusBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    padding: '6px 10px',
    borderRadius: '8px',
    fontSize: '12px',
    fontWeight: 600,
    textTransform: 'capitalize'
  },
  paymentBadge: {
    display: 'inline-flex',
    padding: '4px 8px',
    borderRadius: '6px',
    fontSize: '11px',
    fontWeight: 600,
    textTransform: 'capitalize'
  },
  dateCell: {
    display: 'flex',
    flexDirection: 'column'
  },
  date: {
    fontWeight: 500,
    marginBottom: '2px'
  },
  time: {
    fontSize: '12px',
    color: 'var(--color-text-muted)'
  },
  actions: {
    display: 'flex',
    gap: '4px'
  },
  actionBtn: {
    padding: '8px',
    backgroundColor: 'transparent',
    border: 'none',
    color: 'var(--color-text-muted)',
    cursor: 'pointer',
    borderRadius: '6px'
  },
  emptyState: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '60px 20px',
    gap: '16px',
    textAlign: 'center'
  },
  pagination: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '20px',
    padding: '16px 0'
  },
  paginationInfo: {
    fontSize: '13px',
    color: 'var(--color-text-muted)'
  },
  paginationControls: {
    display: 'flex',
    gap: '4px'
  },
  pageBtn: {
    padding: '8px 14px',
    backgroundColor: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    borderRadius: '8px',
    color: 'var(--color-text)',
    fontSize: '13px',
    cursor: 'pointer',
    minWidth: '40px'
  },
  pageBtnActive: {
    backgroundColor: 'var(--color-primary)',
    borderColor: 'var(--color-primary)',
    color: '#fff'
  },
  pageBtnDisabled: {
    opacity: 0.5,
    cursor: 'not-allowed'
  }
};

export default OrdersList;