/**
 * InventoryLocations
 * 
 * Multi-location inventory management.
 * - Warehouses, stores, booths
 * - Location-based stock levels
 * - Transfer between locations
 * - Location performance
 * - Sync status per location
 * 
 * SYCOT Foundation - manages WHERE inventory lives.
 * Works for any business: warehouses, retail stores,
 * card show booths, food trucks, pop-up shops, etc.
 */

import React, { useState, useEffect } from 'react';
import {
  MapPin,
  Package,
  ArrowRightLeft,
  Plus,
  Search,
  Settings,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  CheckCircle,
  XCircle,
  AlertTriangle,
  RefreshCw,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Clock,
  Users,
  Truck,
  Building,
  Store,
  Warehouse,
  Home,
  Zap,
  ChevronRight,
  BarChart3,
  Download,
  Upload,
  Layers
} from 'lucide-react';

export function InventoryLocations() {
  const [loading, setLoading] = useState(true);
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // grid, list

  useEffect(() => {
    setTimeout(() => {
      setLocations([
        {
          id: 1,
          name: 'Main Warehouse',
          type: 'warehouse',
          address: '1234 Industrial Blvd, Suite 100',
          city: 'Dallas, TX',
          status: 'active',
          syncStatus: 'synced',
          lastSync: '2 min ago',
          manager: 'John Davidson',
          stats: {
            totalItems: 856,
            totalValue: 124500.00,
            lowStock: 12,
            outOfStock: 3,
            utilizationPercent: 72,
            turnoverRate: 8.2
          },
          channels: ['Website', 'Amazon', 'eBay'],
          recentActivity: 45,
          isPrimary: true
        },
        {
          id: 2,
          name: 'Retail Store - Downtown',
          type: 'store',
          address: '567 Main Street',
          city: 'Dallas, TX',
          status: 'active',
          syncStatus: 'synced',
          lastSync: '1 min ago',
          manager: 'Sarah Mitchell',
          stats: {
            totalItems: 234,
            totalValue: 45600.00,
            lowStock: 8,
            outOfStock: 2,
            utilizationPercent: 85,
            turnoverRate: 12.4
          },
          channels: ['POS', 'Website'],
          recentActivity: 28,
          isPrimary: false
        },
        {
          id: 3,
          name: 'Showroom Floor',
          type: 'showroom',
          address: '567 Main Street (Floor 2)',
          city: 'Dallas, TX',
          status: 'active',
          syncStatus: 'synced',
          lastSync: '3 min ago',
          manager: 'Mike Roberts',
          stats: {
            totalItems: 89,
            totalValue: 28900.00,
            lowStock: 5,
            outOfStock: 0,
            utilizationPercent: 90,
            turnoverRate: 6.8
          },
          channels: ['POS'],
          recentActivity: 12,
          isPrimary: false
        },
        {
          id: 4,
          name: 'Card Show Booth',
          type: 'booth',
          address: 'Dallas Convention Center',
          city: 'Dallas, TX',
          status: 'active',
          syncStatus: 'syncing',
          lastSync: 'Syncing...',
          manager: 'You',
          stats: {
            totalItems: 156,
            totalValue: 18750.00,
            lowStock: 0,
            outOfStock: 0,
            utilizationPercent: 95,
            turnoverRate: 15.2
          },
          channels: ['SlabTrack POS', 'Square'],
          recentActivity: 67,
          isPrimary: false,
          isTemporary: true,
          eventName: 'Dallas Card Show 2024',
          eventDates: 'Jan 20-21, 2024'
        },
        {
          id: 5,
          name: 'Storage Unit B',
          type: 'storage',
          address: '8900 Storage Lane, Unit B-42',
          city: 'Irving, TX',
          status: 'active',
          syncStatus: 'synced',
          lastSync: '15 min ago',
          manager: 'John Davidson',
          stats: {
            totalItems: 423,
            totalValue: 67200.00,
            lowStock: 0,
            outOfStock: 0,
            utilizationPercent: 45,
            turnoverRate: 2.1
          },
          channels: [],
          recentActivity: 3,
          isPrimary: false
        },
        {
          id: 6,
          name: 'Returns Processing',
          type: 'returns',
          address: '1234 Industrial Blvd, Suite 102',
          city: 'Dallas, TX',
          status: 'active',
          syncStatus: 'warning',
          lastSync: '45 min ago',
          manager: 'Lisa Chen',
          stats: {
            totalItems: 34,
            totalValue: 4200.00,
            lowStock: 0,
            outOfStock: 0,
            utilizationPercent: 28,
            turnoverRate: 0
          },
          channels: [],
          recentActivity: 8,
          isPrimary: false,
          pendingReturns: 12
        }
      ]);
      setLoading(false);
    }, 500);
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  };

  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  const getLocationIcon = (type) => {
    switch (type) {
      case 'warehouse': return Warehouse;
      case 'store': return Store;
      case 'showroom': return Building;
      case 'booth': return MapPin;
      case 'storage': return Package;
      case 'returns': return RefreshCw;
      default: return MapPin;
    }
  };

  const getLocationColor = (type) => {
    switch (type) {
      case 'warehouse': return '#3b82f6';
      case 'store': return '#22c55e';
      case 'showroom': return '#8b5cf6';
      case 'booth': return '#f59e0b';
      case 'storage': return '#6b7280';
      case 'returns': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getSyncStatusIcon = (status) => {
    switch (status) {
      case 'synced':
        return <CheckCircle size={14} color="#22c55e" />;
      case 'syncing':
        return <RefreshCw size={14} color="#3b82f6" style={{ animation: 'spin 1s linear infinite' }} />;
      case 'warning':
        return <AlertTriangle size={14} color="#f59e0b" />;
      case 'error':
        return <XCircle size={14} color="#ef4444" />;
      default:
        return <CheckCircle size={14} />;
    }
  };

  const getSyncStatusLabel = (status) => {
    switch (status) {
      case 'synced': return 'Synced';
      case 'syncing': return 'Syncing...';
      case 'warning': return 'Needs Attention';
      case 'error': return 'Sync Error';
      default: return status;
    }
  };

  // Calculate totals
  const totals = locations.reduce((acc, loc) => ({
    totalItems: acc.totalItems + loc.stats.totalItems,
    totalValue: acc.totalValue + loc.stats.totalValue,
    lowStock: acc.lowStock + loc.stats.lowStock,
    outOfStock: acc.outOfStock + loc.stats.outOfStock
  }), { totalItems: 0, totalValue: 0, lowStock: 0, outOfStock: 0 });

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <MapPin size={32} style={{ animation: 'pulse 1s ease-in-out infinite' }} />
        <p>Loading locations...</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <h1 style={styles.title}>Inventory Locations</h1>
          <span style={styles.subtitle}>
            {locations.length} locations • {formatNumber(totals.totalItems)} total items
          </span>
        </div>
        <div style={styles.headerActions}>
          <button
            style={styles.transferBtn}
            onClick={() => setShowTransferModal(true)}
          >
            <ArrowRightLeft size={16} />
            Transfer Stock
          </button>
          <button
            style={styles.primaryBtn}
            onClick={() => setShowAddModal(true)}
          >
            <Plus size={16} />
            Add Location
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div style={styles.summaryGrid}>
        <div style={styles.summaryCard}>
          <div style={{...styles.summaryIcon, backgroundColor: 'rgba(59, 130, 246, 0.1)'}}>
            <MapPin size={22} color="#3b82f6" />
          </div>
          <div style={styles.summaryInfo}>
            <span style={styles.summaryValue}>{locations.length}</span>
            <span style={styles.summaryLabel}>Locations</span>
          </div>
        </div>

        <div style={styles.summaryCard}>
          <div style={{...styles.summaryIcon, backgroundColor: 'rgba(34, 197, 94, 0.1)'}}>
            <Package size={22} color="#22c55e" />
          </div>
          <div style={styles.summaryInfo}>
            <span style={styles.summaryValue}>{formatNumber(totals.totalItems)}</span>
            <span style={styles.summaryLabel}>Total Items</span>
          </div>
        </div>

        <div style={styles.summaryCard}>
          <div style={{...styles.summaryIcon, backgroundColor: 'rgba(139, 92, 246, 0.1)'}}>
            <DollarSign size={22} color="#8b5cf6" />
          </div>
          <div style={styles.summaryInfo}>
            <span style={styles.summaryValue}>{formatCurrency(totals.totalValue)}</span>
            <span style={styles.summaryLabel}>Total Value</span>
          </div>
        </div>

        <div style={styles.summaryCard}>
          <div style={{...styles.summaryIcon, backgroundColor: 'rgba(249, 115, 22, 0.1)'}}>
            <AlertTriangle size={22} color="#f97316" />
          </div>
          <div style={styles.summaryInfo}>
            <span style={styles.summaryValue}>{totals.lowStock}</span>
            <span style={styles.summaryLabel}>Low Stock Items</span>
          </div>
        </div>

        <div style={styles.summaryCard}>
          <div style={{...styles.summaryIcon, backgroundColor: 'rgba(239, 68, 68, 0.1)'}}>
            <XCircle size={22} color="#ef4444" />
          </div>
          <div style={styles.summaryInfo}>
            <span style={styles.summaryValue}>{totals.outOfStock}</span>
            <span style={styles.summaryLabel}>Out of Stock</span>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div style={styles.toolbar}>
        <div style={styles.searchBox}>
          <Search size={18} color="var(--color-text-muted)" />
          <input
            type="text"
            placeholder="Search locations..."
            style={styles.searchInput}
          />
        </div>

        <div style={styles.toolbarRight}>
          <div style={styles.viewToggle}>
            <button
              style={{
                ...styles.viewBtn,
                ...(viewMode === 'grid' ? styles.viewBtnActive : {})
              }}
              onClick={() => setViewMode('grid')}
            >
              <Layers size={16} />
            </button>
            <button
              style={{
                ...styles.viewBtn,
                ...(viewMode === 'list' ? styles.viewBtnActive : {})
              }}
              onClick={() => setViewMode('list')}
            >
              <BarChart3 size={16} />
            </button>
          </div>

          <button style={styles.actionBtn}>
            <RefreshCw size={16} />
            Sync All
          </button>
        </div>
      </div>

      {/* Locations Grid */}
      <div style={viewMode === 'grid' ? styles.locationsGrid : styles.locationsList}>
        {locations.map((location) => {
          const LocationIcon = getLocationIcon(location.type);
          const locationColor = getLocationColor(location.type);

          return (
            <div
              key={location.id}
              style={viewMode === 'grid' ? styles.locationCard : styles.locationListItem}
              onClick={() => setSelectedLocation(location)}
            >
              {/* Card Header */}
              <div style={styles.locationHeader}>
                <div style={styles.locationTitleRow}>
                  <div style={{
                    ...styles.locationIcon,
                    backgroundColor: `${locationColor}15`,
                    color: locationColor
                  }}>
                    <LocationIcon size={20} />
                  </div>
                  <div style={styles.locationTitleInfo}>
                    <div style={styles.locationNameRow}>
                      <span style={styles.locationName}>{location.name}</span>
                      {location.isPrimary && (
                        <span style={styles.primaryBadge}>Primary</span>
                      )}
                      {location.isTemporary && (
                        <span style={styles.tempBadge}>Temporary</span>
                      )}
                    </div>
                    <span style={styles.locationType}>
                      {location.type.charAt(0).toUpperCase() + location.type.slice(1)}
                    </span>
                  </div>
                </div>
                <button style={styles.menuBtn}>
                  <MoreHorizontal size={18} />
                </button>
              </div>

              {/* Event Info (for temporary locations) */}
              {location.isTemporary && location.eventName && (
                <div style={styles.eventInfo}>
                  <Zap size={14} color="#f59e0b" />
                  <span>{location.eventName}</span>
                  <span style={styles.eventDates}>{location.eventDates}</span>
                </div>
              )}

              {/* Location Address */}
              <div style={styles.locationAddress}>
                <MapPin size={14} />
                <span>{location.address}</span>
              </div>

              {/* Sync Status */}
              <div style={styles.syncStatus}>
                {getSyncStatusIcon(location.syncStatus)}
                <span style={{
                  color: location.syncStatus === 'synced' ? '#22c55e' :
                         location.syncStatus === 'syncing' ? '#3b82f6' :
                         location.syncStatus === 'warning' ? '#f59e0b' : '#ef4444'
                }}>
                  {getSyncStatusLabel(location.syncStatus)}
                </span>
                <span style={styles.lastSync}>{location.lastSync}</span>
              </div>

              {/* Stats Grid */}
              <div style={styles.statsGrid}>
                <div style={styles.statItem}>
                  <span style={styles.statValue}>{formatNumber(location.stats.totalItems)}</span>
                  <span style={styles.statLabel}>Items</span>
                </div>
                <div style={styles.statItem}>
                  <span style={styles.statValue}>{formatCurrency(location.stats.totalValue)}</span>
                  <span style={styles.statLabel}>Value</span>
                </div>
                <div style={styles.statItem}>
                  <span style={{
                    ...styles.statValue,
                    color: location.stats.lowStock > 0 ? '#f59e0b' : 'inherit'
                  }}>
                    {location.stats.lowStock}
                  </span>
                  <span style={styles.statLabel}>Low Stock</span>
                </div>
                <div style={styles.statItem}>
                  <span style={styles.statValue}>{location.stats.utilizationPercent}%</span>
                  <span style={styles.statLabel}>Utilization</span>
                </div>
              </div>

              {/* Utilization Bar */}
              <div style={styles.utilizationBar}>
                <div style={{
                  ...styles.utilizationFill,
                  width: `${location.stats.utilizationPercent}%`,
                  backgroundColor: location.stats.utilizationPercent > 90 ? '#f59e0b' :
                                   location.stats.utilizationPercent > 75 ? '#22c55e' : '#3b82f6'
                }} />
              </div>

              {/* Connected Channels */}
              {location.channels.length > 0 && (
                <div style={styles.channelsRow}>
                  <span style={styles.channelsLabel}>Channels:</span>
                  <div style={styles.channelTags}>
                    {location.channels.map((channel, idx) => (
                      <span key={idx} style={styles.channelTag}>{channel}</span>
                    ))}
                  </div>
                </div>
              )}

              {/* Manager & Activity */}
              <div style={styles.locationFooter}>
                <div style={styles.managerInfo}>
                  <Users size={14} />
                  <span>{location.manager}</span>
                </div>
                <div style={styles.activityInfo}>
                  <Clock size={14} />
                  <span>{location.recentActivity} movements today</span>
                </div>
              </div>

              {/* Quick Actions */}
              <div style={styles.quickActions}>
                <button style={styles.quickActionBtn}>
                  <Eye size={14} />
                  View Items
                </button>
                <button style={styles.quickActionBtn}>
                  <ArrowRightLeft size={14} />
                  Transfer
                </button>
                <button style={styles.quickActionBtn}>
                  <Edit size={14} />
                  Edit
                </button>
              </div>
            </div>
          );
        })}

        {/* Add Location Card */}
        <div
          style={styles.addLocationCard}
          onClick={() => setShowAddModal(true)}
        >
          <Plus size={32} color="var(--color-text-muted)" />
          <span style={styles.addLocationText}>Add New Location</span>
          <span style={styles.addLocationSubtext}>
            Warehouse, store, booth, or storage
          </span>
        </div>
      </div>

      {/* Transfer Modal Placeholder */}
      {showTransferModal && (
        <div style={styles.modalOverlay} onClick={() => setShowTransferModal(false)}>
          <div style={styles.modal} onClick={e => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>Transfer Stock</h2>
              <button
                style={styles.modalClose}
                onClick={() => setShowTransferModal(false)}
              >
                ×
              </button>
            </div>
            <div style={styles.modalBody}>
              <div style={styles.formGroup}>
                <label style={styles.formLabel}>From Location</label>
                <select style={styles.formSelect}>
                  <option value="">Select source location...</option>
                  {locations.map(loc => (
                    <option key={loc.id} value={loc.id}>{loc.name}</option>
                  ))}
                </select>
              </div>

              <div style={styles.transferArrow}>
                <ArrowRightLeft size={24} color="var(--color-primary)" />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.formLabel}>To Location</label>
                <select style={styles.formSelect}>
                  <option value="">Select destination location...</option>
                  {locations.map(loc => (
                    <option key={loc.id} value={loc.id}>{loc.name}</option>
                  ))}
                </select>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.formLabel}>Items to Transfer</label>
                <div style={styles.itemSearchBox}>
                  <Search size={16} />
                  <input
                    type="text"
                    placeholder="Search items to add..."
                    style={styles.itemSearchInput}
                  />
                </div>
                <div style={styles.selectedItems}>
                  <span style={styles.noItemsText}>No items selected</span>
                </div>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.formLabel}>Notes</label>
                <textarea
                  placeholder="Add transfer notes..."
                  style={styles.formTextarea}
                />
              </div>
            </div>
            <div style={styles.modalFooter}>
              <button
                style={styles.cancelBtn}
                onClick={() => setShowTransferModal(false)}
              >
                Cancel
              </button>
              <button style={styles.submitBtn}>
                <ArrowRightLeft size={16} />
                Create Transfer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Location Modal Placeholder */}
      {showAddModal && (
        <div style={styles.modalOverlay} onClick={() => setShowAddModal(false)}>
          <div style={styles.modal} onClick={e => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>Add New Location</h2>
              <button
                style={styles.modalClose}
                onClick={() => setShowAddModal(false)}
              >
                ×
              </button>
            </div>
            <div style={styles.modalBody}>
              <div style={styles.formGroup}>
                <label style={styles.formLabel}>Location Name</label>
                <input
                  type="text"
                  placeholder="e.g., Main Warehouse, Store #2, Card Show Booth"
                  style={styles.formInput}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.formLabel}>Location Type</label>
                <div style={styles.typeOptions}>
                  {[
                    { type: 'warehouse', label: 'Warehouse', icon: Warehouse },
                    { type: 'store', label: 'Store', icon: Store },
                    { type: 'showroom', label: 'Showroom', icon: Building },
                    { type: 'booth', label: 'Booth/Event', icon: MapPin },
                    { type: 'storage', label: 'Storage', icon: Package }
                  ].map(option => {
                    const OptionIcon = option.icon;
                    return (
                      <button key={option.type} style={styles.typeOption}>
                        <OptionIcon size={20} />
                        <span>{option.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div style={styles.formRow}>
                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>Address</label>
                  <input
                    type="text"
                    placeholder="Street address"
                    style={styles.formInput}
                  />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>City, State</label>
                  <input
                    type="text"
                    placeholder="City, ST"
                    style={styles.formInput}
                  />
                </div>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.formLabel}>Manager</label>
                <select style={styles.formSelect}>
                  <option value="">Select manager...</option>
                  <option value="you">You</option>
                  <option value="john">John Davidson</option>
                  <option value="sarah">Sarah Mitchell</option>
                </select>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.checkboxLabel}>
                  <input type="checkbox" style={styles.checkbox} />
                  <span>This is a temporary/event location</span>
                </label>
              </div>
            </div>
            <div style={styles.modalFooter}>
              <button
                style={styles.cancelBtn}
                onClick={() => setShowAddModal(false)}
              >
                Cancel
              </button>
              <button style={styles.submitBtn}>
                <Plus size={16} />
                Create Location
              </button>
            </div>
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
    color: 'var(--color-text-muted)'
  },
  headerActions: {
    display: 'flex',
    gap: '12px'
  },
  transferBtn: {
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
    gridTemplateColumns: 'repeat(5, 1fr)',
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
    marginBottom: '24px'
  },
  searchBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    flex: 1,
    maxWidth: '300px',
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
  viewToggle: {
    display: 'flex',
    backgroundColor: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    borderRadius: '10px',
    overflow: 'hidden'
  },
  viewBtn: {
    padding: '10px 14px',
    backgroundColor: 'transparent',
    border: 'none',
    color: 'var(--color-text-muted)',
    cursor: 'pointer'
  },
  viewBtnActive: {
    backgroundColor: 'var(--color-primary)',
    color: '#ffffff'
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
  locationsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))',
    gap: '20px'
  },
  locationsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  locationCard: {
    backgroundColor: 'var(--color-surface)',
    borderRadius: '16px',
    border: '1px solid var(--color-border)',
    padding: '20px',
    cursor: 'pointer',
    transition: 'all 0.2s'
  },
  locationListItem: {
    backgroundColor: 'var(--color-surface)',
    borderRadius: '16px',
    border: '1px solid var(--color-border)',
    padding: '20px',
    cursor: 'pointer'
  },
  locationHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '12px'
  },
  locationTitleRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  locationIcon: {
    width: '44px',
    height: '44px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  locationTitleInfo: {},
  locationNameRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  locationName: {
    fontSize: '16px',
    fontWeight: 600
  },
  primaryBadge: {
    padding: '2px 8px',
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    borderRadius: '8px',
    fontSize: '10px',
    fontWeight: 700,
    color: '#3b82f6',
    textTransform: 'uppercase'
  },
  tempBadge: {
    padding: '2px 8px',
    backgroundColor: 'rgba(249, 115, 22, 0.1)',
    borderRadius: '8px',
    fontSize: '10px',
    fontWeight: 700,
    color: '#f59e0b',
    textTransform: 'uppercase'
  },
  locationType: {
    fontSize: '12px',
    color: 'var(--color-text-muted)'
  },
  menuBtn: {
    padding: '8px',
    backgroundColor: 'transparent',
    border: 'none',
    color: 'var(--color-text-muted)',
    cursor: 'pointer',
    borderRadius: '8px'
  },
  eventInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 12px',
    backgroundColor: 'rgba(249, 115, 22, 0.1)',
    borderRadius: '10px',
    marginBottom: '12px',
    fontSize: '13px',
    color: '#f59e0b'
  },
  eventDates: {
    marginLeft: 'auto',
    fontSize: '12px',
    opacity: 0.8
  },
  locationAddress: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '13px',
    color: 'var(--color-text-muted)',
    marginBottom: '12px'
  },
  syncStatus: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '12px',
    marginBottom: '16px'
  },
  lastSync: {
    color: 'var(--color-text-muted)',
    marginLeft: 'auto'
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '12px',
    marginBottom: '12px'
  },
  statItem: {
    textAlign: 'center'
  },
  statValue: {
    display: 'block',
    fontSize: '18px',
    fontWeight: 700
  },
  statLabel: {
    fontSize: '11px',
    color: 'var(--color-text-muted)'
  },
  utilizationBar: {
    height: '6px',
    backgroundColor: 'var(--color-surface-2)',
    borderRadius: '3px',
    overflow: 'hidden',
    marginBottom: '16px'
  },
  utilizationFill: {
    height: '100%',
    borderRadius: '3px',
    transition: 'width 0.3s'
  },
  channelsRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '12px'
  },
  channelsLabel: {
    fontSize: '12px',
    color: 'var(--color-text-muted)'
  },
  channelTags: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '6px'
  },
  channelTag: {
    padding: '4px 10px',
    backgroundColor: 'var(--color-surface-2)',
    borderRadius: '12px',
    fontSize: '11px',
    fontWeight: 500
  },
  locationFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: '12px',
    borderTop: '1px solid var(--color-border)',
    marginBottom: '12px'
  },
  managerInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '12px',
    color: 'var(--color-text-muted)'
  },
  activityInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '12px',
    color: 'var(--color-text-muted)'
  },
  quickActions: {
    display: 'flex',
    gap: '8px'
  },
  quickActionBtn: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px',
    padding: '10px',
    backgroundColor: 'var(--color-surface-2)',
    border: 'none',
    borderRadius: '8px',
    color: 'var(--color-text)',
    fontSize: '12px',
    cursor: 'pointer'
  },
  addLocationCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    padding: '40px 20px',
    backgroundColor: 'var(--color-surface)',
    borderRadius: '16px',
    border: '2px dashed var(--color-border)',
    cursor: 'pointer',
    transition: 'all 0.2s',
    minHeight: '300px'
  },
  addLocationText: {
    fontSize: '16px',
    fontWeight: 600
  },
  addLocationSubtext: {
    fontSize: '13px',
    color: 'var(--color-text-muted)'
  },
  // Modal Styles
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000
  },
  modal: {
    width: '100%',
    maxWidth: '520px',
    backgroundColor: 'var(--color-surface)',
    borderRadius: '20px',
    overflow: 'hidden',
    maxHeight: '90vh',
    overflowY: 'auto'
  },
  modalHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 24px',
    borderBottom: '1px solid var(--color-border)'
  },
  modalTitle: {
    fontSize: '18px',
    fontWeight: 600,
    margin: 0
  },
  modalClose: {
    width: '32px',
    height: '32px',
    backgroundColor: 'var(--color-surface-2)',
    border: 'none',
    borderRadius: '8px',
    fontSize: '20px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  modalBody: {
    padding: '24px'
  },
  modalFooter: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '12px',
    padding: '20px 24px',
    borderTop: '1px solid var(--color-border)'
  },
  formGroup: {
    marginBottom: '20px'
  },
  formRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px'
  },
  formLabel: {
    display: 'block',
    fontSize: '13px',
    fontWeight: 600,
    marginBottom: '8px',
    color: 'var(--color-text)'
  },
  formInput: {
    width: '100%',
    padding: '12px 16px',
    backgroundColor: 'var(--color-surface-2)',
    border: '1px solid var(--color-border)',
    borderRadius: '10px',
    color: 'var(--color-text)',
    fontSize: '14px',
    outline: 'none',
    boxSizing: 'border-box'
  },
  formSelect: {
    width: '100%',
    padding: '12px 16px',
    backgroundColor: 'var(--color-surface-2)',
    border: '1px solid var(--color-border)',
    borderRadius: '10px',
    color: 'var(--color-text)',
    fontSize: '14px',
    outline: 'none',
    cursor: 'pointer'
  },
  formTextarea: {
    width: '100%',
    padding: '12px 16px',
    backgroundColor: 'var(--color-surface-2)',
    border: '1px solid var(--color-border)',
    borderRadius: '10px',
    color: 'var(--color-text)',
    fontSize: '14px',
    outline: 'none',
    minHeight: '80px',
    resize: 'vertical',
    boxSizing: 'border-box'
  },
  transferArrow: {
    display: 'flex',
    justifyContent: 'center',
    padding: '12px 0'
  },
  itemSearchBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '12px 16px',
    backgroundColor: 'var(--color-surface-2)',
    border: '1px solid var(--color-border)',
    borderRadius: '10px',
    marginBottom: '12px'
  },
  itemSearchInput: {
    flex: 1,
    backgroundColor: 'transparent',
    border: 'none',
    color: 'var(--color-text)',
    fontSize: '14px',
    outline: 'none'
  },
  selectedItems: {
    padding: '20px',
    backgroundColor: 'var(--color-surface-2)',
    borderRadius: '10px',
    textAlign: 'center'
  },
  noItemsText: {
    color: 'var(--color-text-muted)',
    fontSize: '13px'
  },
  typeOptions: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '10px'
  },
  typeOption: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px',
    padding: '16px',
    backgroundColor: 'var(--color-surface-2)',
    border: '2px solid var(--color-border)',
    borderRadius: '12px',
    cursor: 'pointer',
    fontSize: '12px',
    fontWeight: 500
  },
  checkboxLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontSize: '14px',
    cursor: 'pointer'
  },
  checkbox: {
    width: '18px',
    height: '18px'
  },
  cancelBtn: {
    padding: '12px 20px',
    backgroundColor: 'var(--color-surface-2)',
    border: '1px solid var(--color-border)',
    borderRadius: '10px',
    color: 'var(--color-text)',
    fontSize: '14px',
    cursor: 'pointer'
  },
  submitBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 24px',
    backgroundColor: 'var(--color-primary)',
    border: 'none',
    borderRadius: '10px',
    color: '#ffffff',
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer'
  }
};

export default InventoryLocations;