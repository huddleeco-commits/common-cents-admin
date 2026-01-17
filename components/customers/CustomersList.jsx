/**
 * CustomersPage
 * 
 * Complete customer management dashboard.
 * - View all customers with search and filters
 * - Customer segments and tags
 * - Lifetime value tracking
 * - Quick actions (email, view orders, etc.)
 * - Export capabilities
 * 
 * Works for any industry: restaurant guests, retail shoppers,
 * patients, clients, members, etc.
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users,
  Search,
  Filter,
  Download,
  Plus,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  Eye,
  Mail,
  Phone,
  ShoppingBag,
  DollarSign,
  Calendar,
  Star,
  Tag,
  UserPlus,
  TrendingUp,
  Clock,
  Heart,
  AlertCircle
} from 'lucide-react';
import CustomerFilters from './CustomerFilters';

export function CustomersPage() {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [activeFilters, setActiveFilters] = useState({
    segment: 'all',
    dateRange: 'all',
    orderCount: 'all',
    spendRange: 'all'
  });
  const [sortBy, setSortBy] = useState('recent');
  const [currentPage, setCurrentPage] = useState(1);
  const [showActionMenu, setShowActionMenu] = useState(null);
  const itemsPerPage = 20;

  // Fetch customers from API (starts empty for fresh deployments)
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_URL || '';
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/api/customers`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          const data = await response.json();
          // Transform API response to match component format
          const formattedCustomers = (data.customers || []).map(customer => ({
            ...customer,
            lastOrderDate: customer.lastOrderDate ? new Date(customer.lastOrderDate) : null,
            firstOrderDate: customer.firstOrderDate ? new Date(customer.firstOrderDate) : null,
            segment: customer.segment || 'regular',
            tags: customer.tags || [],
            totalOrders: customer.totalOrders || 0,
            totalSpent: customer.totalSpent || 0,
            avgOrderValue: customer.avgOrderValue || 0,
            loyaltyPoints: customer.loyaltyPoints || 0
          }));
          setCustomers(formattedCustomers);
        } else {
          // API not available or no customers - start with empty array
          setCustomers([]);
        }
      } catch (error) {
        console.log('Customers API not available, starting with empty list');
        setCustomers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  const getSegmentConfig = (segment) => {
    switch (segment) {
      case 'vip':
        return { label: 'VIP', color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.1)', icon: Star };
      case 'regular':
        return { label: 'Regular', color: '#3b82f6', bg: 'rgba(59, 130, 246, 0.1)', icon: Users };
      case 'new':
        return { label: 'New', color: '#22c55e', bg: 'rgba(34, 197, 94, 0.1)', icon: UserPlus };
      case 'at_risk':
        return { label: 'At Risk', color: '#f97316', bg: 'rgba(249, 115, 22, 0.1)', icon: AlertCircle };
      case 'churned':
        return { label: 'Churned', color: '#ef4444', bg: 'rgba(239, 68, 68, 0.1)', icon: Clock };
      default:
        return { label: segment, color: '#6b7280', bg: 'rgba(107, 114, 128, 0.1)', icon: Users };
    }
  };

  const formatDate = (date) => {
    const now = new Date();
    const diff = now - date;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days} days ago`;
    if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
    if (days < 365) return `${Math.floor(days / 30)} months ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  // Filter customers
  const filteredCustomers = customers.filter(customer => {
    if (activeFilters.segment !== 'all' && customer.segment !== activeFilters.segment) return false;
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return customer.name.toLowerCase().includes(query) ||
             customer.email.toLowerCase().includes(query) ||
             customer.phone.includes(query) ||
             customer.id.toLowerCase().includes(query);
    }
    return true;
  });

  // Sort customers
  const sortedCustomers = [...filteredCustomers].sort((a, b) => {
    switch (sortBy) {
      case 'recent': return b.lastOrderDate - a.lastOrderDate;
      case 'oldest': return a.lastOrderDate - b.lastOrderDate;
      case 'highest_value': return b.totalSpent - a.totalSpent;
      case 'most_orders': return b.totalOrders - a.totalOrders;
      case 'name_asc': return a.name.localeCompare(b.name);
      case 'name_desc': return b.name.localeCompare(a.name);
      default: return 0;
    }
  });

  // Paginate
  const totalPages = Math.ceil(sortedCustomers.length / itemsPerPage);
  const paginatedCustomers = sortedCustomers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Stats
  const stats = {
    total: customers.length,
    vip: customers.filter(c => c.segment === 'vip').length,
    new: customers.filter(c => c.segment === 'new').length,
    atRisk: customers.filter(c => c.segment === 'at_risk').length,
    totalRevenue: customers.reduce((sum, c) => sum + c.totalSpent, 0),
    avgLifetimeValue: customers.length > 0 ? customers.reduce((sum, c) => sum + c.totalSpent, 0) / customers.length : 0
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <h1 style={styles.title}>Customers</h1>
          <span style={styles.customerCount}>{filteredCustomers.length} customers</span>
        </div>
        <div style={styles.headerActions}>
          <button style={styles.exportButton}>
            <Download size={16} />
            Export
          </button>
          <button style={styles.addButton}>
            <Plus size={16} />
            Add Customer
          </button>
        </div>
      </div>

      {/* Stats */}
      <div style={styles.statsGrid}>
        <div style={styles.statCard}>
          <div style={{ ...styles.statIcon, backgroundColor: 'rgba(59, 130, 246, 0.1)' }}>
            <Users size={20} color="#3b82f6" />
          </div>
          <div style={styles.statInfo}>
            <span style={styles.statValue}>{stats.total}</span>
            <span style={styles.statLabel}>Total Customers</span>
          </div>
        </div>
        <div style={styles.statCard}>
          <div style={{ ...styles.statIcon, backgroundColor: 'rgba(245, 158, 11, 0.1)' }}>
            <Star size={20} color="#f59e0b" />
          </div>
          <div style={styles.statInfo}>
            <span style={styles.statValue}>{stats.vip}</span>
            <span style={styles.statLabel}>VIP Customers</span>
          </div>
        </div>
        <div style={styles.statCard}>
          <div style={{ ...styles.statIcon, backgroundColor: 'rgba(34, 197, 94, 0.1)' }}>
            <UserPlus size={20} color="#22c55e" />
          </div>
          <div style={styles.statInfo}>
            <span style={styles.statValue}>{stats.new}</span>
            <span style={styles.statLabel}>New (30 days)</span>
          </div>
        </div>
        <div style={styles.statCard}>
          <div style={{ ...styles.statIcon, backgroundColor: 'rgba(34, 197, 94, 0.1)' }}>
            <DollarSign size={20} color="#22c55e" />
          </div>
          <div style={styles.statInfo}>
            <span style={styles.statValue}>{formatCurrency(stats.avgLifetimeValue)}</span>
            <span style={styles.statLabel}>Avg Lifetime Value</span>
          </div>
        </div>
      </div>

      {/* Segment Quick Filters */}
      <div style={styles.segmentFilters}>
        {['all', 'vip', 'regular', 'new', 'at_risk', 'churned'].map(segment => {
          const config = segment === 'all' 
            ? { label: 'All', color: 'var(--color-text)', bg: 'var(--color-surface-2)' }
            : getSegmentConfig(segment);
          const count = segment === 'all' 
            ? customers.length 
            : customers.filter(c => c.segment === segment).length;
          
          return (
            <button
              key={segment}
              style={{
                ...styles.segmentButton,
                ...(activeFilters.segment === segment ? {
                  backgroundColor: config.bg,
                  borderColor: config.color,
                  color: config.color
                } : {})
              }}
              onClick={() => setActiveFilters(prev => ({ ...prev, segment }))}
            >
              {config.label}
              <span style={styles.segmentCount}>{count}</span>
            </button>
          );
        })}
      </div>

      {/* Toolbar */}
      <div style={styles.toolbar}>
        <div style={styles.searchBox}>
          <Search size={18} />
          <input
            type="text"
            placeholder="Search customers by name, email, phone..."
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
            More Filters
          </button>

          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            style={styles.sortSelect}
          >
            <option value="recent">Most Recent</option>
            <option value="oldest">Oldest First</option>
            <option value="highest_value">Highest Value</option>
            <option value="most_orders">Most Orders</option>
            <option value="name_asc">Name A-Z</option>
            <option value="name_desc">Name Z-A</option>
          </select>
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <CustomerFilters 
          filters={activeFilters}
          onChange={setActiveFilters}
          onClose={() => setShowFilters(false)}
        />
      )}

      {/* Customers Table */}
      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr style={styles.tableHeader}>
              <th style={styles.th}>Customer</th>
              <th style={styles.th}>Segment</th>
              <th style={styles.th}>Orders</th>
              <th style={styles.th}>Total Spent</th>
              <th style={styles.th}>Avg Order</th>
              <th style={styles.th}>Last Order</th>
              <th style={styles.th}>Loyalty</th>
              <th style={styles.th}></th>
            </tr>
          </thead>
          <tbody>
            {paginatedCustomers.map(customer => {
              const segmentConfig = getSegmentConfig(customer.segment);
              const SegmentIcon = segmentConfig.icon;

              return (
                <tr 
                  key={customer.id} 
                  style={styles.tableRow}
                  onClick={() => navigate(`/customers/${customer.id}`)}
                >
                  <td style={styles.td}>
                    <div style={styles.customerCell}>
                      <div style={styles.avatar}>
                        {customer.name.charAt(0)}
                      </div>
                      <div style={styles.customerInfo}>
                        <span style={styles.customerName}>{customer.name}</span>
                        <span style={styles.customerEmail}>{customer.email}</span>
                      </div>
                    </div>
                  </td>
                  <td style={styles.td}>
                    <span style={{
                      ...styles.segmentBadge,
                      backgroundColor: segmentConfig.bg,
                      color: segmentConfig.color
                    }}>
                      <SegmentIcon size={12} />
                      {segmentConfig.label}
                    </span>
                  </td>
                  <td style={styles.td}>
                    <span style={styles.orderCount}>{customer.totalOrders}</span>
                  </td>
                  <td style={styles.td}>
                    <span style={styles.totalSpent}>{formatCurrency(customer.totalSpent)}</span>
                  </td>
                  <td style={styles.td}>
                    <span style={styles.avgOrder}>{formatCurrency(customer.avgOrderValue)}</span>
                  </td>
                  <td style={styles.td}>
                    <span style={styles.lastOrder}>{formatDate(customer.lastOrderDate)}</span>
                  </td>
                  <td style={styles.td}>
                    <div style={styles.loyaltyCell}>
                      <Star size={14} color="#f59e0b" fill="#f59e0b" />
                      <span>{customer.loyaltyPoints.toLocaleString()}</span>
                    </div>
                  </td>
                  <td style={styles.td} onClick={(e) => e.stopPropagation()}>
                    <div style={styles.actionCell}>
                      <button 
                        style={styles.actionButton}
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowActionMenu(showActionMenu === customer.id ? null : customer.id);
                        }}
                      >
                        <MoreVertical size={16} />
                      </button>

                      {showActionMenu === customer.id && (
                        <div style={styles.actionMenu}>
                          <button 
                            style={styles.actionMenuItem}
                            onClick={() => navigate(`/customers/${customer.id}`)}
                          >
                            <Eye size={14} /> View Profile
                          </button>
                          <button style={styles.actionMenuItem}>
                            <Mail size={14} /> Send Email
                          </button>
                          <button style={styles.actionMenuItem}>
                            <ShoppingBag size={14} /> View Orders
                          </button>
                          <button style={styles.actionMenuItem}>
                            <Tag size={14} /> Manage Tags
                          </button>
                          <div style={styles.actionMenuDivider} />
                          <button style={styles.actionMenuItem}>
                            <Heart size={14} /> Add to VIP
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {paginatedCustomers.length === 0 && (
          <div style={styles.emptyState}>
            <Users size={48} style={{ opacity: 0.3 }} />
            <h3>No customers found</h3>
            <p>Try adjusting your filters or search query</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div style={styles.pagination}>
          <span style={styles.paginationInfo}>
            Showing {((currentPage - 1) * itemsPerPage) + 1} - {Math.min(currentPage * itemsPerPage, sortedCustomers.length)} of {sortedCustomers.length}
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
  customerCount: {
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
  exportButton: {
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
  addButton: {
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
  statIcon: {
    width: '48px',
    height: '48px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
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
  segmentFilters: {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px',
    flexWrap: 'wrap'
  },
  segmentButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 16px',
    backgroundColor: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    borderRadius: '20px',
    color: 'var(--color-text)',
    fontSize: '13px',
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'all 0.2s'
  },
  segmentCount: {
    padding: '2px 8px',
    backgroundColor: 'var(--color-surface-2)',
    borderRadius: '10px',
    fontSize: '11px',
    fontWeight: 600
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
    maxWidth: '500px',
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
    cursor: 'pointer',
    transition: 'background-color 0.2s'
  },
  td: {
    padding: '16px',
    fontSize: '14px',
    verticalAlign: 'middle'
  },
  customerCell: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px'
  },
  avatar: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: 'var(--color-primary)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#ffffff',
    fontSize: '16px',
    fontWeight: 600
  },
  customerInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px'
  },
  customerName: {
    fontWeight: 600
  },
  customerEmail: {
    fontSize: '12px',
    color: 'var(--color-text-muted)'
  },
  segmentBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    padding: '6px 12px',
    borderRadius: '16px',
    fontSize: '12px',
    fontWeight: 600
  },
  orderCount: {
    fontWeight: 600
  },
  totalSpent: {
    fontWeight: 600,
    color: '#22c55e'
  },
  avgOrder: {
    color: 'var(--color-text-muted)'
  },
  lastOrder: {
    color: 'var(--color-text-muted)',
    fontSize: '13px'
  },
  loyaltyCell: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    color: '#f59e0b',
    fontWeight: 500
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
    width: '180px',
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

export default CustomersPage;