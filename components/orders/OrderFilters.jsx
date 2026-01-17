/**
 * OrderFilters
 * 
 * Advanced filtering panel for orders.
 * - Status filters
 * - Date range selection
 * - Payment status
 * - Fulfillment type
 * - Amount range
 * - Customer filters
 * 
 * Collapsible panel that appears above order list.
 */

import React, { useState } from 'react';
import {
  X,
  Calendar,
  DollarSign,
  CreditCard,
  Truck,
  Package,
  User,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  RefreshCw,
  Filter
} from 'lucide-react';

export function OrderFilters({ filters, onChange, onClose }) {
  const [localFilters, setLocalFilters] = useState(filters);

  const statusOptions = [
    { value: 'all', label: 'All Statuses', icon: Package },
    { value: 'pending', label: 'Pending', icon: AlertCircle, color: '#eab308' },
    { value: 'processing', label: 'Processing', icon: Clock, color: '#3b82f6' },
    { value: 'completed', label: 'Completed', icon: CheckCircle, color: '#22c55e' },
    { value: 'cancelled', label: 'Cancelled', icon: XCircle, color: '#ef4444' }
  ];

  const paymentOptions = [
    { value: 'all', label: 'All Payments' },
    { value: 'paid', label: 'Paid', color: '#22c55e' },
    { value: 'pending', label: 'Pending', color: '#eab308' },
    { value: 'refunded', label: 'Refunded', color: '#ef4444' },
    { value: 'failed', label: 'Failed', color: '#ef4444' }
  ];

  const fulfillmentOptions = [
    { value: 'all', label: 'All Types' },
    { value: 'delivery', label: 'Delivery', icon: Truck },
    { value: 'pickup', label: 'Pickup', icon: Package },
    { value: 'dine_in', label: 'Dine In', icon: User }
  ];

  const dateRangeOptions = [
    { value: 'today', label: 'Today' },
    { value: 'yesterday', label: 'Yesterday' },
    { value: '7days', label: 'Last 7 Days' },
    { value: '30days', label: 'Last 30 Days' },
    { value: '90days', label: 'Last 90 Days' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...localFilters, [key]: value };
    setLocalFilters(newFilters);
  };

  const handleApply = () => {
    onChange(localFilters);
  };

  const handleReset = () => {
    const defaultFilters = {
      status: 'all',
      dateRange: '30days',
      paymentStatus: 'all',
      fulfillment: 'all',
      minAmount: '',
      maxAmount: '',
      customDateStart: '',
      customDateEnd: ''
    };
    setLocalFilters(defaultFilters);
    onChange(defaultFilters);
  };

  const activeFilterCount = Object.entries(localFilters).filter(([key, value]) => {
    if (key === 'minAmount' || key === 'maxAmount') return value !== '';
    if (key === 'customDateStart' || key === 'customDateEnd') return false;
    return value !== 'all' && value !== '30days';
  }).length;

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <Filter size={18} />
          <h3 style={styles.title}>Filters</h3>
          {activeFilterCount > 0 && (
            <span style={styles.activeCount}>{activeFilterCount} active</span>
          )}
        </div>
        <button style={styles.closeButton} onClick={onClose}>
          <X size={18} />
        </button>
      </div>

      <div style={styles.filtersGrid}>
        {/* Status Filter */}
        <div style={styles.filterGroup}>
          <label style={styles.filterLabel}>Order Status</label>
          <div style={styles.buttonGroup}>
            {statusOptions.map(option => {
              const Icon = option.icon;
              const isActive = localFilters.status === option.value;
              return (
                <button
                  key={option.value}
                  style={{
                    ...styles.filterButton,
                    ...(isActive ? {
                      ...styles.filterButtonActive,
                      borderColor: option.color || 'var(--color-primary)',
                      backgroundColor: option.color ? `${option.color}15` : 'rgba(59, 130, 246, 0.1)'
                    } : {})
                  }}
                  onClick={() => handleFilterChange('status', option.value)}
                >
                  {Icon && <Icon size={14} color={isActive ? option.color : undefined} />}
                  {option.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Date Range Filter */}
        <div style={styles.filterGroup}>
          <label style={styles.filterLabel}>Date Range</label>
          <div style={styles.buttonGroup}>
            {dateRangeOptions.map(option => (
              <button
                key={option.value}
                style={{
                  ...styles.filterButton,
                  ...(localFilters.dateRange === option.value ? styles.filterButtonActive : {})
                }}
                onClick={() => handleFilterChange('dateRange', option.value)}
              >
                {option.label}
              </button>
            ))}
          </div>
          
          {localFilters.dateRange === 'custom' && (
            <div style={styles.customDateRange}>
              <div style={styles.dateInputGroup}>
                <label style={styles.dateLabel}>From</label>
                <input
                  type="date"
                  value={localFilters.customDateStart || ''}
                  onChange={(e) => handleFilterChange('customDateStart', e.target.value)}
                  style={styles.dateInput}
                />
              </div>
              <div style={styles.dateInputGroup}>
                <label style={styles.dateLabel}>To</label>
                <input
                  type="date"
                  value={localFilters.customDateEnd || ''}
                  onChange={(e) => handleFilterChange('customDateEnd', e.target.value)}
                  style={styles.dateInput}
                />
              </div>
            </div>
          )}
        </div>

        {/* Payment Status Filter */}
        <div style={styles.filterGroup}>
          <label style={styles.filterLabel}>Payment Status</label>
          <div style={styles.buttonGroup}>
            {paymentOptions.map(option => {
              const isActive = localFilters.paymentStatus === option.value;
              return (
                <button
                  key={option.value}
                  style={{
                    ...styles.filterButton,
                    ...(isActive ? {
                      ...styles.filterButtonActive,
                      borderColor: option.color || 'var(--color-primary)',
                      backgroundColor: option.color ? `${option.color}15` : 'rgba(59, 130, 246, 0.1)'
                    } : {})
                  }}
                  onClick={() => handleFilterChange('paymentStatus', option.value)}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Fulfillment Type Filter */}
        <div style={styles.filterGroup}>
          <label style={styles.filterLabel}>Fulfillment Type</label>
          <div style={styles.buttonGroup}>
            {fulfillmentOptions.map(option => {
              const Icon = option.icon;
              const isActive = localFilters.fulfillment === option.value;
              return (
                <button
                  key={option.value}
                  style={{
                    ...styles.filterButton,
                    ...(isActive ? styles.filterButtonActive : {})
                  }}
                  onClick={() => handleFilterChange('fulfillment', option.value)}
                >
                  {Icon && <Icon size={14} />}
                  {option.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Amount Range Filter */}
        <div style={styles.filterGroup}>
          <label style={styles.filterLabel}>Order Amount</label>
          <div style={styles.amountRange}>
            <div style={styles.amountInput}>
              <DollarSign size={14} style={styles.amountIcon} />
              <input
                type="number"
                placeholder="Min"
                value={localFilters.minAmount || ''}
                onChange={(e) => handleFilterChange('minAmount', e.target.value)}
                style={styles.amountField}
              />
            </div>
            <span style={styles.amountSeparator}>to</span>
            <div style={styles.amountInput}>
              <DollarSign size={14} style={styles.amountIcon} />
              <input
                type="number"
                placeholder="Max"
                value={localFilters.maxAmount || ''}
                onChange={(e) => handleFilterChange('maxAmount', e.target.value)}
                style={styles.amountField}
              />
            </div>
          </div>
          
          {/* Quick Amount Buttons */}
          <div style={styles.quickAmounts}>
            <button 
              style={styles.quickAmountBtn}
              onClick={() => {
                handleFilterChange('minAmount', '');
                handleFilterChange('maxAmount', '25');
              }}
            >
              Under $25
            </button>
            <button 
              style={styles.quickAmountBtn}
              onClick={() => {
                handleFilterChange('minAmount', '25');
                handleFilterChange('maxAmount', '50');
              }}
            >
              $25 - $50
            </button>
            <button 
              style={styles.quickAmountBtn}
              onClick={() => {
                handleFilterChange('minAmount', '50');
                handleFilterChange('maxAmount', '100');
              }}
            >
              $50 - $100
            </button>
            <button 
              style={styles.quickAmountBtn}
              onClick={() => {
                handleFilterChange('minAmount', '100');
                handleFilterChange('maxAmount', '');
              }}
            >
              Over $100
            </button>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div style={styles.actions}>
        <button style={styles.resetButton} onClick={handleReset}>
          <RefreshCw size={14} />
          Reset Filters
        </button>
        <div style={styles.actionRight}>
          <button style={styles.cancelButton} onClick={onClose}>
            Cancel
          </button>
          <button style={styles.applyButton} onClick={handleApply}>
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: 'var(--color-surface)',
    borderRadius: '16px',
    border: '1px solid var(--color-border)',
    marginBottom: '16px',
    overflow: 'hidden'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 24px',
    borderBottom: '1px solid var(--color-border)',
    backgroundColor: 'var(--color-surface-2)'
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  title: {
    fontSize: '16px',
    fontWeight: 600,
    margin: 0
  },
  activeCount: {
    padding: '4px 10px',
    backgroundColor: 'var(--color-primary)',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: 600,
    color: '#ffffff'
  },
  closeButton: {
    padding: '8px',
    backgroundColor: 'transparent',
    border: 'none',
    color: 'var(--color-text-muted)',
    cursor: 'pointer',
    borderRadius: '8px'
  },
  filtersGrid: {
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '24px'
  },
  filterGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  filterLabel: {
    fontSize: '13px',
    fontWeight: 600,
    color: 'var(--color-text-muted)',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  },
  buttonGroup: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px'
  },
  filterButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '10px 16px',
    backgroundColor: 'var(--color-surface-2)',
    border: '1px solid var(--color-border)',
    borderRadius: '20px',
    color: 'var(--color-text)',
    fontSize: '13px',
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'all 0.2s'
  },
  filterButtonActive: {
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    borderColor: 'var(--color-primary)',
    color: 'var(--color-primary)'
  },
  customDateRange: {
    display: 'flex',
    gap: '16px',
    marginTop: '8px'
  },
  dateInputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px'
  },
  dateLabel: {
    fontSize: '12px',
    color: 'var(--color-text-muted)'
  },
  dateInput: {
    padding: '10px 14px',
    backgroundColor: 'var(--color-surface-2)',
    border: '1px solid var(--color-border)',
    borderRadius: '10px',
    color: 'var(--color-text)',
    fontSize: '14px',
    outline: 'none'
  },
  amountRange: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  amountInput: {
    position: 'relative',
    flex: 1
  },
  amountIcon: {
    position: 'absolute',
    left: '12px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: 'var(--color-text-muted)'
  },
  amountField: {
    width: '100%',
    padding: '10px 14px 10px 32px',
    backgroundColor: 'var(--color-surface-2)',
    border: '1px solid var(--color-border)',
    borderRadius: '10px',
    color: 'var(--color-text)',
    fontSize: '14px',
    outline: 'none'
  },
  amountSeparator: {
    color: 'var(--color-text-muted)',
    fontSize: '14px'
  },
  quickAmounts: {
    display: 'flex',
    gap: '8px',
    marginTop: '8px'
  },
  quickAmountBtn: {
    padding: '8px 14px',
    backgroundColor: 'transparent',
    border: '1px dashed var(--color-border)',
    borderRadius: '8px',
    color: 'var(--color-text-muted)',
    fontSize: '12px',
    cursor: 'pointer'
  },
  actions: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 24px',
    borderTop: '1px solid var(--color-border)',
    backgroundColor: 'var(--color-surface-2)'
  },
  resetButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 16px',
    backgroundColor: 'transparent',
    border: 'none',
    color: 'var(--color-text-muted)',
    fontSize: '13px',
    cursor: 'pointer'
  },
  actionRight: {
    display: 'flex',
    gap: '12px'
  },
  cancelButton: {
    padding: '10px 20px',
    backgroundColor: 'transparent',
    border: '1px solid var(--color-border)',
    borderRadius: '10px',
    color: 'var(--color-text)',
    fontSize: '14px',
    cursor: 'pointer'
  },
  applyButton: {
    padding: '10px 24px',
    backgroundColor: 'var(--color-primary)',
    border: 'none',
    borderRadius: '10px',
    color: '#ffffff',
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer'
  }
};

export default OrderFilters;