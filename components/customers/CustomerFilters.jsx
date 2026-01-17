/**
 * CustomerFilters
 * 
 * Advanced filtering panel for customers.
 * - Segment filters
 * - Order count ranges
 * - Spending ranges
 * - Date filters (first/last order)
 * - Tag filters
 * - Loyalty tier filters
 */

import React, { useState } from 'react';
import {
  X,
  Calendar,
  DollarSign,
  ShoppingBag,
  Star,
  Tag,
  Users,
  RefreshCw,
  Filter,
  Award
} from 'lucide-react';

export function CustomerFilters({ filters, onChange, onClose }) {
  const [localFilters, setLocalFilters] = useState(filters);

  const orderCountOptions = [
    { value: 'all', label: 'Any' },
    { value: '1', label: '1 order' },
    { value: '2-5', label: '2-5 orders' },
    { value: '6-10', label: '6-10 orders' },
    { value: '11-25', label: '11-25 orders' },
    { value: '25+', label: '25+ orders' }
  ];

  const spendRangeOptions = [
    { value: 'all', label: 'Any' },
    { value: '0-50', label: 'Under $50' },
    { value: '50-100', label: '$50 - $100' },
    { value: '100-250', label: '$100 - $250' },
    { value: '250-500', label: '$250 - $500' },
    { value: '500-1000', label: '$500 - $1,000' },
    { value: '1000+', label: '$1,000+' }
  ];

  const dateRangeOptions = [
    { value: 'all', label: 'All Time' },
    { value: '7days', label: 'Last 7 Days' },
    { value: '30days', label: 'Last 30 Days' },
    { value: '90days', label: 'Last 90 Days' },
    { value: '6months', label: 'Last 6 Months' },
    { value: '1year', label: 'Last Year' }
  ];

  const loyaltyTierOptions = [
    { value: 'all', label: 'All Tiers' },
    { value: 'bronze', label: 'Bronze', color: '#cd7f32' },
    { value: 'silver', label: 'Silver', color: '#9ca3af' },
    { value: 'gold', label: 'Gold', color: '#f59e0b' },
    { value: 'platinum', label: 'Platinum', color: '#a855f7' }
  ];

  const tagOptions = [
    'Local',
    'Corporate',
    'Catering',
    'Weekend Regular',
    'Lunch Crowd',
    'Family',
    'First Timer',
    'Birthday Club',
    'Newsletter'
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...localFilters, [key]: value };
    setLocalFilters(newFilters);
  };

  const handleTagToggle = (tag) => {
    const currentTags = localFilters.tags || [];
    const newTags = currentTags.includes(tag)
      ? currentTags.filter(t => t !== tag)
      : [...currentTags, tag];
    handleFilterChange('tags', newTags);
  };

  const handleApply = () => {
    onChange(localFilters);
  };

  const handleReset = () => {
    const defaultFilters = {
      segment: 'all',
      dateRange: 'all',
      orderCount: 'all',
      spendRange: 'all',
      lastOrderDate: 'all',
      loyaltyTier: 'all',
      tags: []
    };
    setLocalFilters(defaultFilters);
    onChange(defaultFilters);
  };

  const activeFilterCount = Object.entries(localFilters).filter(([key, value]) => {
    if (key === 'tags') return value && value.length > 0;
    return value !== 'all';
  }).length;

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <Filter size={18} />
          <h3 style={styles.title}>Advanced Filters</h3>
          {activeFilterCount > 0 && (
            <span style={styles.activeCount}>{activeFilterCount} active</span>
          )}
        </div>
        <button style={styles.closeButton} onClick={onClose}>
          <X size={18} />
        </button>
      </div>

      <div style={styles.filtersGrid}>
        {/* Order Count Filter */}
        <div style={styles.filterGroup}>
          <label style={styles.filterLabel}>
            <ShoppingBag size={14} />
            Order Count
          </label>
          <div style={styles.buttonGroup}>
            {orderCountOptions.map(option => (
              <button
                key={option.value}
                style={{
                  ...styles.filterButton,
                  ...(localFilters.orderCount === option.value ? styles.filterButtonActive : {})
                }}
                onClick={() => handleFilterChange('orderCount', option.value)}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Total Spent Filter */}
        <div style={styles.filterGroup}>
          <label style={styles.filterLabel}>
            <DollarSign size={14} />
            Total Spent
          </label>
          <div style={styles.buttonGroup}>
            {spendRangeOptions.map(option => (
              <button
                key={option.value}
                style={{
                  ...styles.filterButton,
                  ...(localFilters.spendRange === option.value ? styles.filterButtonActive : {})
                }}
                onClick={() => handleFilterChange('spendRange', option.value)}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Last Order Date Filter */}
        <div style={styles.filterGroup}>
          <label style={styles.filterLabel}>
            <Calendar size={14} />
            Last Order
          </label>
          <div style={styles.buttonGroup}>
            {dateRangeOptions.map(option => (
              <button
                key={option.value}
                style={{
                  ...styles.filterButton,
                  ...(localFilters.lastOrderDate === option.value ? styles.filterButtonActive : {})
                }}
                onClick={() => handleFilterChange('lastOrderDate', option.value)}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Loyalty Tier Filter */}
        <div style={styles.filterGroup}>
          <label style={styles.filterLabel}>
            <Award size={14} />
            Loyalty Tier
          </label>
          <div style={styles.buttonGroup}>
            {loyaltyTierOptions.map(option => (
              <button
                key={option.value}
                style={{
                  ...styles.filterButton,
                  ...(localFilters.loyaltyTier === option.value ? {
                    ...styles.filterButtonActive,
                    borderColor: option.color || 'var(--color-primary)',
                    backgroundColor: option.color ? `${option.color}20` : 'rgba(59, 130, 246, 0.1)'
                  } : {})
                }}
                onClick={() => handleFilterChange('loyaltyTier', option.value)}
              >
                {option.color && (
                  <span style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: option.color
                  }} />
                )}
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tags Filter */}
        <div style={styles.filterGroup}>
          <label style={styles.filterLabel}>
            <Tag size={14} />
            Tags
          </label>
          <div style={styles.tagsGrid}>
            {tagOptions.map(tag => {
              const isSelected = (localFilters.tags || []).includes(tag);
              return (
                <button
                  key={tag}
                  style={{
                    ...styles.tagButton,
                    ...(isSelected ? styles.tagButtonActive : {})
                  }}
                  onClick={() => handleTagToggle(tag)}
                >
                  {tag}
                </button>
              );
            })}
          </div>
        </div>

        {/* Customer Since Filter */}
        <div style={styles.filterGroup}>
          <label style={styles.filterLabel}>
            <Users size={14} />
            Customer Since
          </label>
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
        </div>

        {/* Additional Options */}
        <div style={styles.filterGroup}>
          <label style={styles.filterLabel}>
            <Star size={14} />
            Additional Filters
          </label>
          <div style={styles.checkboxGroup}>
            <label style={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={localFilters.hasEmail || false}
                onChange={(e) => handleFilterChange('hasEmail', e.target.checked)}
                style={styles.checkbox}
              />
              Has email address
            </label>
            <label style={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={localFilters.hasPhone || false}
                onChange={(e) => handleFilterChange('hasPhone', e.target.checked)}
                style={styles.checkbox}
              />
              Has phone number
            </label>
            <label style={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={localFilters.hasBirthday || false}
                onChange={(e) => handleFilterChange('hasBirthday', e.target.checked)}
                style={styles.checkbox}
              />
              Has birthday on file
            </label>
            <label style={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={localFilters.subscribedToMarketing || false}
                onChange={(e) => handleFilterChange('subscribedToMarketing', e.target.checked)}
                style={styles.checkbox}
              />
              Subscribed to marketing
            </label>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div style={styles.actions}>
        <button style={styles.resetButton} onClick={handleReset}>
          <RefreshCw size={14} />
          Reset All
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
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '24px'
  },
  filterGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  filterLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
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
    padding: '8px 14px',
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
  tagsGrid: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px'
  },
  tagButton: {
    padding: '8px 14px',
    backgroundColor: 'var(--color-surface-2)',
    border: '1px solid var(--color-border)',
    borderRadius: '20px',
    color: 'var(--color-text-muted)',
    fontSize: '12px',
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'all 0.2s'
  },
  tagButtonActive: {
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
    borderColor: '#22c55e',
    color: '#22c55e'
  },
  checkboxGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
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
    height: '18px',
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

export default CustomerFilters;