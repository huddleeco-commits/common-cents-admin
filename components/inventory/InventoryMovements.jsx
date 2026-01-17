/**
 * StockMovements
 * 
 * Complete audit trail for inventory changes.
 * - Stock in (receiving)
 * - Stock out (sales, usage)
 * - Transfers between locations
 * - Adjustments (corrections, spoilage)
 * - Full history with filters
 * - Export capabilities
 * 
 * Critical for accountability and tracking.
 */

import React, { useState, useEffect, useMemo } from 'react';
import {
  ArrowDownRight,
  ArrowUpRight,
  ArrowRightLeft,
  AlertCircle,
  Package,
  Search,
  Filter,
  Calendar,
  Download,
  RefreshCw,
  User,
  MapPin,
  Clock,
  FileText,
  ChevronDown,
  Plus,
  Eye,
  Printer,
  MoreHorizontal,
  TrendingUp,
  TrendingDown,
  CheckCircle,
  XCircle
} from 'lucide-react';

export function StockMovements() {
  const [loading, setLoading] = useState(true);
  const [movements, setMovements] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    type: 'all',
    location: 'all',
    dateRange: '7d',
    user: 'all'
  });
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setMovements([
        // Varied movement types and industries
        {
          id: 1,
          type: 'in',
          typeLabel: 'Received',
          item: { sku: 'PRO-001', name: 'Premium Widget' },
          quantity: 200,
          previousQty: 45,
          newQty: 245,
          location: 'Warehouse A',
          reference: 'PO-2024-156',
          referenceType: 'purchase_order',
          user: 'John Davidson',
          notes: 'Shipment from Acme Suppliers',
          timestamp: '2024-01-15T14:32:00Z',
          timeAgo: '10 min ago'
        },
        {
          id: 2,
          type: 'out',
          typeLabel: 'Sold',
          item: { sku: 'GAD-002', name: 'Smart Gadget Lite' },
          quantity: 5,
          previousQty: 39,
          newQty: 34,
          location: 'Showroom',
          reference: 'ORD-8847',
          referenceType: 'order',
          user: 'System',
          notes: 'Online order fulfillment',
          timestamp: '2024-01-15T14:15:00Z',
          timeAgo: '27 min ago'
        },
        {
          id: 3,
          type: 'transfer',
          typeLabel: 'Transfer',
          item: { sku: 'ACC-002', name: 'Premium Cable 6ft' },
          quantity: 50,
          fromLocation: 'Warehouse A',
          toLocation: 'Showroom',
          reference: 'TRF-0234',
          referenceType: 'transfer',
          user: 'Sarah Mitchell',
          notes: 'Restocking showroom display',
          timestamp: '2024-01-15T13:45:00Z',
          timeAgo: '57 min ago'
        },
        {
          id: 4,
          type: 'adjustment',
          typeLabel: 'Adjustment',
          adjustmentReason: 'damaged',
          item: { sku: 'PKG-001', name: 'Gift Box Set' },
          quantity: -12,
          previousQty: 246,
          newQty: 234,
          location: 'Warehouse B',
          reference: 'ADJ-0089',
          referenceType: 'adjustment',
          user: 'Mike Roberts',
          notes: 'Water damage from roof leak',
          timestamp: '2024-01-15T12:20:00Z',
          timeAgo: '2 hrs ago'
        },
        {
          id: 5,
          type: 'in',
          typeLabel: 'Received',
          item: { sku: 'ELE-001', name: 'Power Supply 500W' },
          quantity: 30,
          previousQty: 37,
          newQty: 67,
          location: 'Warehouse A',
          reference: 'PO-2024-155',
          referenceType: 'purchase_order',
          user: 'John Davidson',
          notes: 'Express order - priority stock',
          timestamp: '2024-01-15T11:00:00Z',
          timeAgo: '3.5 hrs ago'
        },
        {
          id: 6,
          type: 'out',
          typeLabel: 'Used',
          item: { sku: 'SVC-001', name: 'Maintenance Kit' },
          quantity: 3,
          previousQty: 48,
          newQty: 45,
          location: 'Service Dept',
          reference: 'WO-1122',
          referenceType: 'work_order',
          user: 'Tech Team',
          notes: 'Customer repair jobs',
          timestamp: '2024-01-15T10:30:00Z',
          timeAgo: '4 hrs ago'
        },
        {
          id: 7,
          type: 'adjustment',
          typeLabel: 'Adjustment',
          adjustmentReason: 'count',
          item: { sku: 'ACC-001', name: 'Universal Adapter' },
          quantity: 8,
          previousQty: 4,
          newQty: 12,
          location: 'Warehouse B',
          reference: 'ADJ-0088',
          referenceType: 'adjustment',
          user: 'Lisa Chen',
          notes: 'Found additional stock during audit',
          timestamp: '2024-01-15T09:15:00Z',
          timeAgo: '5 hrs ago'
        },
        {
          id: 8,
          type: 'transfer',
          typeLabel: 'Transfer',
          item: { sku: 'ELE-003', name: 'Cooling Fan Set' },
          quantity: 25,
          fromLocation: 'Warehouse A',
          toLocation: 'Service Dept',
          reference: 'TRF-0233',
          referenceType: 'transfer',
          user: 'Sarah Mitchell',
          notes: 'Parts for upcoming repairs',
          timestamp: '2024-01-15T08:00:00Z',
          timeAgo: '6.5 hrs ago'
        },
        {
          id: 9,
          type: 'out',
          typeLabel: 'Sold',
          item: { sku: 'PRO-003', name: 'Economy Widget' },
          quantity: 24,
          previousQty: 480,
          newQty: 456,
          location: 'Warehouse B',
          reference: 'ORD-8842',
          referenceType: 'order',
          user: 'System',
          notes: 'Bulk order - Corporate client',
          timestamp: '2024-01-14T16:45:00Z',
          timeAgo: 'Yesterday'
        },
        {
          id: 10,
          type: 'in',
          typeLabel: 'Returned',
          item: { sku: 'GAD-001', name: 'Smart Gadget Pro' },
          quantity: 2,
          previousQty: 0,
          newQty: 2,
          location: 'Warehouse A',
          reference: 'RMA-0456',
          referenceType: 'return',
          user: 'Returns Dept',
          notes: 'Customer return - restocked',
          timestamp: '2024-01-14T14:20:00Z',
          timeAgo: 'Yesterday'
        },
        {
          id: 11,
          type: 'adjustment',
          typeLabel: 'Adjustment',
          adjustmentReason: 'expired',
          item: { sku: 'CON-005', name: 'Thermal Paste Tube' },
          quantity: -15,
          previousQty: 89,
          newQty: 74,
          location: 'Service Dept',
          reference: 'ADJ-0087',
          referenceType: 'adjustment',
          user: 'Quality Control',
          notes: 'Expired product - disposed',
          timestamp: '2024-01-14T11:00:00Z',
          timeAgo: 'Yesterday'
        },
        {
          id: 12,
          type: 'out',
          typeLabel: 'Shipped',
          item: { sku: 'PRO-002', name: 'Standard Widget' },
          quantity: 100,
          previousQty: 189,
          newQty: 89,
          location: 'Warehouse A',
          reference: 'ORD-8838',
          referenceType: 'order',
          user: 'System',
          notes: 'Wholesale distribution',
          timestamp: '2024-01-13T15:30:00Z',
          timeAgo: '2 days ago'
        }
      ]);
      setLoading(false);
    }, 500);
  }, []);

  // Get unique values for filters
  const users = useMemo(() => {
    return [...new Set(movements.map(m => m.user))].sort();
  }, [movements]);

  const locations = useMemo(() => {
    const locs = new Set();
    movements.forEach(m => {
      if (m.location) locs.add(m.location);
      if (m.fromLocation) locs.add(m.fromLocation);
      if (m.toLocation) locs.add(m.toLocation);
    });
    return [...locs].sort();
  }, [movements]);

  // Filter movements
  const filteredMovements = useMemo(() => {
    let result = [...movements];

    // Search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(m =>
        m.item.name.toLowerCase().includes(query) ||
        m.item.sku.toLowerCase().includes(query) ||
        m.reference.toLowerCase().includes(query) ||
        m.notes?.toLowerCase().includes(query)
      );
    }

    // Type filter
    if (filters.type !== 'all') {
      result = result.filter(m => m.type === filters.type);
    }

    // Location filter
    if (filters.location !== 'all') {
      result = result.filter(m =>
        m.location === filters.location ||
        m.fromLocation === filters.location ||
        m.toLocation === filters.location
      );
    }

    // User filter
    if (filters.user !== 'all') {
      result = result.filter(m => m.user === filters.user);
    }

    return result;
  }, [movements, searchQuery, filters]);

  // Calculate summary stats
  const summaryStats = useMemo(() => {
    const stockIn = filteredMovements
      .filter(m => m.type === 'in')
      .reduce((sum, m) => sum + m.quantity, 0);
    
    const stockOut = filteredMovements
      .filter(m => m.type === 'out')
      .reduce((sum, m) => sum + m.quantity, 0);
    
    const transfers = filteredMovements.filter(m => m.type === 'transfer').length;
    
    const adjustments = filteredMovements
      .filter(m => m.type === 'adjustment')
      .reduce((sum, m) => sum + m.quantity, 0);

    return { stockIn, stockOut, transfers, adjustments };
  }, [filteredMovements]);

  const getMovementIcon = (type) => {
    switch (type) {
      case 'in':
        return <ArrowDownRight size={18} />;
      case 'out':
        return <ArrowUpRight size={18} />;
      case 'transfer':
        return <ArrowRightLeft size={18} />;
      case 'adjustment':
        return <AlertCircle size={18} />;
      default:
        return <Package size={18} />;
    }
  };

  const getMovementColor = (type, quantity) => {
    switch (type) {
      case 'in':
        return '#22c55e';
      case 'out':
        return '#ef4444';
      case 'transfer':
        return '#3b82f6';
      case 'adjustment':
        return quantity >= 0 ? '#22c55e' : '#f59e0b';
      default:
        return '#6b7280';
    }
  };

  const getAdjustmentReasonLabel = (reason) => {
    switch (reason) {
      case 'damaged': return 'Damaged';
      case 'count': return 'Count Correction';
      case 'expired': return 'Expired';
      case 'lost': return 'Lost/Missing';
      case 'found': return 'Found';
      default: return reason;
    }
  };

  const getReferenceTypeLabel = (type) => {
    switch (type) {
      case 'purchase_order': return 'Purchase Order';
      case 'order': return 'Sales Order';
      case 'transfer': return 'Transfer';
      case 'adjustment': return 'Adjustment';
      case 'work_order': return 'Work Order';
      case 'return': return 'Return';
      default: return type;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <RefreshCw size={32} style={{ animation: 'spin 1s linear infinite' }} />
        <p>Loading movements...</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <h1 style={styles.title}>Stock Movements</h1>
          <span style={styles.subtitle}>Complete inventory audit trail</span>
        </div>
        <div style={styles.headerActions}>
          <button style={styles.actionBtn}>
            <Download size={16} />
            Export
          </button>
          <button style={styles.actionBtn}>
            <Printer size={16} />
            Print
          </button>
          <button style={styles.primaryBtn}>
            <Plus size={16} />
            New Movement
          </button>
        </div>
      </div>

      {/* Summary Stats */}
      <div style={styles.summaryGrid}>
        <div style={styles.summaryCard}>
          <div style={{...styles.summaryIcon, backgroundColor: 'rgba(34, 197, 94, 0.1)'}}>
            <ArrowDownRight size={20} color="#22c55e" />
          </div>
          <div style={styles.summaryInfo}>
            <span style={styles.summaryValue}>+{summaryStats.stockIn}</span>
            <span style={styles.summaryLabel}>Stock In</span>
          </div>
        </div>

        <div style={styles.summaryCard}>
          <div style={{...styles.summaryIcon, backgroundColor: 'rgba(239, 68, 68, 0.1)'}}>
            <ArrowUpRight size={20} color="#ef4444" />
          </div>
          <div style={styles.summaryInfo}>
            <span style={styles.summaryValue}>-{summaryStats.stockOut}</span>
            <span style={styles.summaryLabel}>Stock Out</span>
          </div>
        </div>

        <div style={styles.summaryCard}>
          <div style={{...styles.summaryIcon, backgroundColor: 'rgba(59, 130, 246, 0.1)'}}>
            <ArrowRightLeft size={20} color="#3b82f6" />
          </div>
          <div style={styles.summaryInfo}>
            <span style={styles.summaryValue}>{summaryStats.transfers}</span>
            <span style={styles.summaryLabel}>Transfers</span>
          </div>
        </div>

        <div style={styles.summaryCard}>
          <div style={{...styles.summaryIcon, backgroundColor: 'rgba(249, 115, 22, 0.1)'}}>
            <AlertCircle size={20} color="#f97316" />
          </div>
          <div style={styles.summaryInfo}>
            <span style={styles.summaryValue}>
              {summaryStats.adjustments >= 0 ? '+' : ''}{summaryStats.adjustments}
            </span>
            <span style={styles.summaryLabel}>Adjustments</span>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div style={styles.toolbar}>
        <div style={styles.searchBox}>
          <Search size={18} color="var(--color-text-muted)" />
          <input
            type="text"
            placeholder="Search items, references, notes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={styles.searchInput}
          />
        </div>

        <div style={styles.toolbarRight}>
          {/* Quick Type Filters */}
          <div style={styles.typeFilters}>
            {['all', 'in', 'out', 'transfer', 'adjustment'].map(type => (
              <button
                key={type}
                style={{
                  ...styles.typeFilterBtn,
                  ...(filters.type === type ? styles.typeFilterBtnActive : {})
                }}
                onClick={() => setFilters({ ...filters, type })}
              >
                {type === 'all' ? 'All' :
                 type === 'in' ? 'In' :
                 type === 'out' ? 'Out' :
                 type === 'transfer' ? 'Transfer' : 'Adjust'}
              </button>
            ))}
          </div>

          <button
            style={{
              ...styles.filterBtn,
              ...(showFilters ? styles.filterBtnActive : {})
            }}
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter size={16} />
            More Filters
          </button>
        </div>
      </div>

      {/* Expanded Filters */}
      {showFilters && (
        <div style={styles.filtersPanel}>
          <div style={styles.filterGroup}>
            <label style={styles.filterLabel}>Location</label>
            <select
              value={filters.location}
              onChange={(e) => setFilters({ ...filters, location: e.target.value })}
              style={styles.filterSelect}
            >
              <option value="all">All Locations</option>
              {locations.map(loc => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
          </div>

          <div style={styles.filterGroup}>
            <label style={styles.filterLabel}>User</label>
            <select
              value={filters.user}
              onChange={(e) => setFilters({ ...filters, user: e.target.value })}
              style={styles.filterSelect}
            >
              <option value="all">All Users</option>
              {users.map(user => (
                <option key={user} value={user}>{user}</option>
              ))}
            </select>
          </div>

          <div style={styles.filterGroup}>
            <label style={styles.filterLabel}>Date Range</label>
            <select
              value={filters.dateRange}
              onChange={(e) => setFilters({ ...filters, dateRange: e.target.value })}
              style={styles.filterSelect}
            >
              <option value="today">Today</option>
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
              <option value="90d">Last 90 Days</option>
              <option value="custom">Custom Range</option>
            </select>
          </div>

          <button
            style={styles.clearFiltersBtn}
            onClick={() => setFilters({
              type: 'all',
              location: 'all',
              dateRange: '7d',
              user: 'all'
            })}
          >
            Clear All
          </button>
        </div>
      )}

      {/* Movements List */}
      <div style={styles.movementsList}>
        {filteredMovements.length === 0 ? (
          <div style={styles.emptyState}>
            <Package size={48} color="var(--color-text-muted)" />
            <h3 style={styles.emptyTitle}>No movements found</h3>
            <p style={styles.emptyMessage}>
              Try adjusting your search or filters
            </p>
          </div>
        ) : (
          filteredMovements.map((movement) => {
            const color = getMovementColor(movement.type, movement.quantity);
            
            return (
              <div key={movement.id} style={styles.movementCard}>
                {/* Movement Type Indicator */}
                <div style={{
                  ...styles.movementTypeIndicator,
                  backgroundColor: `${color}15`,
                  color: color
                }}>
                  {getMovementIcon(movement.type)}
                </div>

                {/* Main Content */}
                <div style={styles.movementContent}>
                  {/* Top Row */}
                  <div style={styles.movementTopRow}>
                    <div style={styles.movementItem}>
                      <span style={styles.itemSku}>{movement.item.sku}</span>
                      <span style={styles.itemName}>{movement.item.name}</span>
                    </div>
                    <div style={styles.movementQuantity}>
                      <span style={{
                        ...styles.quantityValue,
                        color: color
                      }}>
                        {movement.type === 'in' ? '+' : 
                         movement.type === 'out' ? '-' : 
                         movement.quantity >= 0 ? '+' : ''}
                        {Math.abs(movement.quantity)}
                      </span>
                      <span style={styles.quantityLabel}>
                        {movement.previousQty !== undefined && (
                          <>
                            {movement.previousQty} → {movement.newQty}
                          </>
                        )}
                      </span>
                    </div>
                  </div>

                  {/* Details Row */}
                  <div style={styles.movementDetails}>
                    {/* Location */}
                    <div style={styles.detailItem}>
                      <MapPin size={14} />
                      {movement.type === 'transfer' ? (
                        <span>{movement.fromLocation} → {movement.toLocation}</span>
                      ) : (
                        <span>{movement.location}</span>
                      )}
                    </div>

                    {/* Reference */}
                    <div style={styles.detailItem}>
                      <FileText size={14} />
                      <span style={styles.reference}>{movement.reference}</span>
                      <span style={styles.referenceType}>
                        {getReferenceTypeLabel(movement.referenceType)}
                      </span>
                    </div>

                    {/* User */}
                    <div style={styles.detailItem}>
                      <User size={14} />
                      <span>{movement.user}</span>
                    </div>

                    {/* Time */}
                    <div style={styles.detailItem}>
                      <Clock size={14} />
                      <span>{movement.timeAgo}</span>
                    </div>
                  </div>

                  {/* Notes */}
                  {movement.notes && (
                    <div style={styles.movementNotes}>
                      {movement.adjustmentReason && (
                        <span style={styles.adjustmentReason}>
                          {getAdjustmentReasonLabel(movement.adjustmentReason)}:
                        </span>
                      )}
                      {movement.notes}
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div style={styles.movementActions}>
                  <button style={styles.movementActionBtn} title="View Details">
                    <Eye size={16} />
                  </button>
                  <button style={styles.movementActionBtn} title="More Options">
                    <MoreHorizontal size={16} />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Load More */}
      {filteredMovements.length > 0 && (
        <div style={styles.loadMore}>
          <button style={styles.loadMoreBtn}>
            Load More Movements
          </button>
          <span style={styles.loadMoreInfo}>
            Showing {filteredMovements.length} of {movements.length} movements
          </span>
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
    color: 'var(--color-text-muted)'
  },
  headerActions: {
    display: 'flex',
    gap: '12px'
  },
  actionBtn: {
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
  summaryGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '16px',
    marginBottom: '24px'
  },
  summaryCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    padding: '20px',
    backgroundColor: 'var(--color-surface)',
    borderRadius: '16px',
    border: '1px solid var(--color-border)'
  },
  summaryIcon: {
    width: '48px',
    height: '48px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  summaryInfo: {},
  summaryValue: {
    display: 'block',
    fontSize: '24px',
    fontWeight: 700
  },
  summaryLabel: {
    fontSize: '13px',
    color: 'var(--color-text-muted)'
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    alignItems: 'center',
    gap: '12px'
  },
  typeFilters: {
    display: 'flex',
    backgroundColor: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    borderRadius: '10px',
    overflow: 'hidden'
  },
  typeFilterBtn: {
    padding: '10px 16px',
    backgroundColor: 'transparent',
    border: 'none',
    color: 'var(--color-text-muted)',
    fontSize: '13px',
    cursor: 'pointer',
    transition: 'all 0.2s'
  },
  typeFilterBtnActive: {
    backgroundColor: 'var(--color-primary)',
    color: '#ffffff'
  },
  filterBtn: {
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
  filterBtnActive: {
    backgroundColor: 'var(--color-primary)',
    borderColor: 'var(--color-primary)',
    color: '#ffffff'
  },
  filtersPanel: {
    display: 'flex',
    alignItems: 'flex-end',
    gap: '20px',
    padding: '20px',
    backgroundColor: 'var(--color-surface)',
    borderRadius: '12px',
    border: '1px solid var(--color-border)',
    marginBottom: '16px'
  },
  filterGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  filterLabel: {
    fontSize: '12px',
    fontWeight: 600,
    color: 'var(--color-text-muted)'
  },
  filterSelect: {
    padding: '10px 14px',
    backgroundColor: 'var(--color-surface-2)',
    border: '1px solid var(--color-border)',
    borderRadius: '8px',
    color: 'var(--color-text)',
    fontSize: '14px',
    minWidth: '160px',
    cursor: 'pointer',
    outline: 'none'
  },
  clearFiltersBtn: {
    padding: '10px 16px',
    backgroundColor: 'transparent',
    border: '1px solid var(--color-border)',
    borderRadius: '8px',
    color: 'var(--color-text-muted)',
    fontSize: '14px',
    cursor: 'pointer'
  },
  movementsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  movementCard: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '16px',
    padding: '20px',
    backgroundColor: 'var(--color-surface)',
    borderRadius: '16px',
    border: '1px solid var(--color-border)'
  },
  movementTypeIndicator: {
    width: '48px',
    height: '48px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0
  },
  movementContent: {
    flex: 1,
    minWidth: 0
  },
  movementTopRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '12px'
  },
  movementItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px'
  },
  itemSku: {
    fontFamily: 'monospace',
    fontSize: '12px',
    color: 'var(--color-text-muted)'
  },
  itemName: {
    fontSize: '16px',
    fontWeight: 600
  },
  movementQuantity: {
    textAlign: 'right'
  },
  quantityValue: {
    display: 'block',
    fontSize: '24px',
    fontWeight: 700
  },
  quantityLabel: {
    fontSize: '12px',
    color: 'var(--color-text-muted)'
  },
  movementDetails: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
    marginBottom: '8px'
  },
  detailItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '13px',
    color: 'var(--color-text-muted)'
  },
  reference: {
    fontFamily: 'monospace',
    fontWeight: 600,
    color: 'var(--color-primary)'
  },
  referenceType: {
    padding: '2px 8px',
    backgroundColor: 'var(--color-surface-2)',
    borderRadius: '8px',
    fontSize: '11px'
  },
  movementNotes: {
    fontSize: '13px',
    color: 'var(--color-text-muted)',
    fontStyle: 'italic',
    marginTop: '8px',
    paddingTop: '12px',
    borderTop: '1px solid var(--color-border)'
  },
  adjustmentReason: {
    fontWeight: 600,
    color: 'var(--color-text)',
    fontStyle: 'normal',
    marginRight: '4px'
  },
  movementActions: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  movementActionBtn: {
    padding: '8px',
    backgroundColor: 'var(--color-surface-2)',
    border: 'none',
    borderRadius: '8px',
    color: 'var(--color-text-muted)',
    cursor: 'pointer'
  },
  emptyState: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '80px 20px',
    backgroundColor: 'var(--color-surface)',
    borderRadius: '16px',
    border: '1px solid var(--color-border)'
  },
  emptyTitle: {
    fontSize: '18px',
    fontWeight: 600,
    margin: '16px 0 8px 0'
  },
  emptyMessage: {
    fontSize: '14px',
    color: 'var(--color-text-muted)'
  },
  loadMore: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '12px',
    marginTop: '24px'
  },
  loadMoreBtn: {
    padding: '12px 24px',
    backgroundColor: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    borderRadius: '10px',
    color: 'var(--color-text)',
    fontSize: '14px',
    fontWeight: 500,
    cursor: 'pointer'
  },
  loadMoreInfo: {
    fontSize: '13px',
    color: 'var(--color-text-muted)'
  }
};

export default StockMovements;