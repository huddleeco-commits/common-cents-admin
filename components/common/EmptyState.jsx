/**
 * EmptyState
 *
 * Reusable empty state component with action buttons.
 * Shows when lists/tables have no data.
 */

import React from 'react';
import { Package, Plus, Upload, RefreshCw, Search, Filter } from 'lucide-react';

export function EmptyState({
  icon: Icon = Package,
  title = 'No items found',
  description = 'Get started by creating your first item.',
  actions = [],
  suggestions = []
}) {
  return (
    <div style={styles.container}>
      <div style={styles.iconWrapper}>
        <Icon size={48} strokeWidth={1.5} />
      </div>

      <h3 style={styles.title}>{title}</h3>
      <p style={styles.description}>{description}</p>

      {actions.length > 0 && (
        <div style={styles.actions}>
          {actions.map((action, index) => (
            <button
              key={index}
              onClick={action.onClick}
              style={index === 0 ? styles.primaryButton : styles.secondaryButton}
            >
              {action.icon && <action.icon size={18} />}
              {action.label}
            </button>
          ))}
        </div>
      )}

      {suggestions.length > 0 && (
        <div style={styles.suggestions}>
          <p style={styles.suggestionsTitle}>Suggestions:</p>
          <ul style={styles.suggestionsList}>
            {suggestions.map((suggestion, index) => (
              <li key={index} style={styles.suggestionItem}>
                {suggestion}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

// Pre-configured empty states for common scenarios
export function EmptyOrders({ onCreateOrder }) {
  return (
    <EmptyState
      icon={Package}
      title="No orders yet"
      description="Orders will appear here when customers make purchases."
      actions={[
        { label: 'Create Manual Order', icon: Plus, onClick: onCreateOrder }
      ]}
      suggestions={[
        'Share your store link to get your first order',
        'Make sure your products are published',
        'Check that payment methods are configured'
      ]}
    />
  );
}

export function EmptyCustomers({ onAddCustomer, onImportCustomers }) {
  return (
    <EmptyState
      icon={Package}
      title="No customers yet"
      description="Your customer list will grow as people sign up and make purchases."
      actions={[
        { label: 'Add Customer', icon: Plus, onClick: onAddCustomer },
        { label: 'Import CSV', icon: Upload, onClick: onImportCustomers }
      ]}
      suggestions={[
        'Customers are created automatically when they register',
        'You can also add customers manually',
        'Import existing customers from a CSV file'
      ]}
    />
  );
}

export function EmptyProducts({ onAddProduct, onImportProducts }) {
  return (
    <EmptyState
      icon={Package}
      title="No products yet"
      description="Add your first product to start selling."
      actions={[
        { label: 'Add Product', icon: Plus, onClick: onAddProduct },
        { label: 'Import Products', icon: Upload, onClick: onImportProducts }
      ]}
    />
  );
}

export function EmptySearchResults({ query, onClearSearch }) {
  return (
    <EmptyState
      icon={Search}
      title="No results found"
      description={`No items match "${query}". Try adjusting your search.`}
      actions={[
        { label: 'Clear Search', icon: RefreshCw, onClick: onClearSearch }
      ]}
      suggestions={[
        'Check for typos in your search',
        'Try using different keywords',
        'Remove some filters to broaden results'
      ]}
    />
  );
}

export function EmptyFilterResults({ onClearFilters }) {
  return (
    <EmptyState
      icon={Filter}
      title="No matches"
      description="No items match your current filters."
      actions={[
        { label: 'Clear All Filters', icon: RefreshCw, onClick: onClearFilters }
      ]}
    />
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '60px 20px',
    textAlign: 'center',
    minHeight: '300px'
  },
  iconWrapper: {
    width: '100px',
    height: '100px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'var(--color-surface-2, rgba(255,255,255,0.05))',
    borderRadius: '50%',
    marginBottom: '24px',
    color: 'var(--color-text-muted, #666)'
  },
  title: {
    fontSize: '20px',
    fontWeight: 600,
    color: 'var(--color-text, #fff)',
    margin: '0 0 8px 0'
  },
  description: {
    fontSize: '14px',
    color: 'var(--color-text-muted, #888)',
    margin: '0 0 24px 0',
    maxWidth: '400px',
    lineHeight: 1.5
  },
  actions: {
    display: 'flex',
    gap: '12px',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  primaryButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 24px',
    backgroundColor: 'var(--color-primary, #6366f1)',
    border: 'none',
    borderRadius: '10px',
    color: '#ffffff',
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer'
  },
  secondaryButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 20px',
    backgroundColor: 'var(--color-surface, #1a1a2e)',
    border: '1px solid var(--color-border, #2a2a3a)',
    borderRadius: '10px',
    color: 'var(--color-text, #fff)',
    fontSize: '14px',
    cursor: 'pointer'
  },
  suggestions: {
    marginTop: '32px',
    padding: '20px',
    backgroundColor: 'var(--color-surface, rgba(255,255,255,0.03))',
    borderRadius: '12px',
    maxWidth: '400px'
  },
  suggestionsTitle: {
    fontSize: '12px',
    fontWeight: 600,
    color: 'var(--color-text-muted, #888)',
    textTransform: 'uppercase',
    margin: '0 0 12px 0'
  },
  suggestionsList: {
    margin: 0,
    padding: '0 0 0 20px',
    textAlign: 'left'
  },
  suggestionItem: {
    fontSize: '13px',
    color: 'var(--color-text-muted, #888)',
    marginBottom: '8px',
    lineHeight: 1.4
  }
};

export default EmptyState;
