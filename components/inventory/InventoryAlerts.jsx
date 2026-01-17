/**
 * InventoryAlerts
 * 
 * Alert management for inventory.
 * - Low stock warnings
 * - Out of stock alerts
 * - Expiration tracking
 * - Reorder suggestions
 * - One-click ordering
 * - Alert preferences
 * 
 * AI-powered predictions for proactive management.
 */

import React, { useState, useEffect } from 'react';
import {
  AlertTriangle,
  AlertCircle,
  Clock,
  ShoppingCart,
  CheckCircle,
  X,
  Bell,
  BellOff,
  Settings,
  Zap,
  TrendingDown,
  Calendar,
  Package,
  Truck,
  DollarSign,
  ChevronRight,
  RefreshCw,
  Filter,
  Check
} from 'lucide-react';

export function InventoryAlerts() {
  const [alerts, setAlerts] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [selectedAlerts, setSelectedAlerts] = useState([]);

  // Alert settings
  const [alertSettings, setAlertSettings] = useState({
    lowStockEnabled: true,
    lowStockThreshold: 'reorder_point',
    outOfStockEnabled: true,
    expirationEnabled: true,
    expirationDays: 7,
    priceChangeEnabled: true,
    priceChangeThreshold: 10,
    emailNotifications: true,
    pushNotifications: true
  });

  // Mock alerts data
  useEffect(() => {
    setTimeout(() => {
      setAlerts([
        {
          id: 'ALT-001',
          type: 'critical',
          category: 'out_of_stock',
          title: 'Out of Stock',
          item: { id: 'INV-009', name: 'Chicken Breast (Frozen)', sku: 'CHKN-BRST-10' },
          message: 'Item is completely out of stock. Orders may be affected.',
          currentStock: 0,
          reorderQuantity: 40,
          supplier: { name: 'Sysco Foods', leadTime: 2 },
          estimatedCost: 239.60,
          createdAt: new Date(Date.now() - 1000 * 60 * 30),
          dismissed: false,
          pendingOrder: { quantity: 40, expectedDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 1) }
        },
        {
          id: 'ALT-002',
          type: 'critical',
          category: 'low_stock',
          title: 'Critical Low Stock',
          item: { id: 'INV-003', name: 'American Cheese Slices', sku: 'CHZ-AMER-160' },
          message: 'Stock critically low. Will run out in approximately 1.5 days.',
          currentStock: 3,
          minStock: 10,
          reorderQuantity: 20,
          supplier: { name: 'Sysco Foods', leadTime: 2 },
          estimatedCost: 259.80,
          daysUntilEmpty: 1.5,
          createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
          dismissed: false
        },
        {
          id: 'ALT-003',
          type: 'warning',
          category: 'low_stock',
          title: 'Low Stock Warning',
          item: { id: 'INV-002', name: 'Burger Buns (Pack of 12)', sku: 'BUN-BURG-12' },
          message: 'Stock below minimum level. Reorder recommended.',
          currentStock: 8,
          minStock: 15,
          reorderQuantity: 30,
          supplier: { name: 'Local Bakery Co', leadTime: 1 },
          estimatedCost: 119.70,
          daysUntilEmpty: 2,
          createdAt: new Date(Date.now() - 1000 * 60 * 60 * 4),
          dismissed: false
        },
        {
          id: 'ALT-004',
          type: 'warning',
          category: 'expiring',
          title: 'Expiring Soon',
          item: { id: 'INV-002', name: 'Burger Buns (Pack of 12)', sku: 'BUN-BURG-12' },
          message: '8 packs expiring in 3 days. Consider using in specials.',
          expirationDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3),
          quantity: 8,
          estimatedLoss: 31.92,
          createdAt: new Date(Date.now() - 1000 * 60 * 60 * 6),
          dismissed: false,
          suggestions: ['Create a burger special', 'Discount for quick sale', 'Staff meal use']
        },
        {
          id: 'ALT-005',
          type: 'info',
          category: 'reorder',
          title: 'Reorder Point Reached',
          item: { id: 'INV-006', name: 'Lettuce (Iceberg)', sku: 'PRD-LETT-ICE' },
          message: 'Stock at reorder point. Order now to prevent stockout.',
          currentStock: 12,
          reorderPoint: 12,
          reorderQuantity: 20,
          supplier: { name: 'Local Farms', leadTime: 1 },
          estimatedCost: 39.80,
          daysUntilEmpty: 2,
          createdAt: new Date(Date.now() - 1000 * 60 * 60 * 8),
          dismissed: false
        },
        {
          id: 'ALT-006',
          type: 'warning',
          category: 'expiring',
          title: 'Expiring Soon',
          item: { id: 'INV-001', name: 'Ground Beef (80/20)', sku: 'BEEF-8020-5LB' },
          message: '45 lbs expiring in 5 days. Plan usage accordingly.',
          expirationDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 5),
          quantity: 45,
          estimatedLoss: 202.50,
          createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12),
          dismissed: false,
          suggestions: ['Feature in daily special', 'Prep for freezing', 'Increase burger promotion']
        },
        {
          id: 'ALT-007',
          type: 'info',
          category: 'price_change',
          title: 'Price Increase Detected',
          item: { id: 'INV-003', name: 'American Cheese Slices', sku: 'CHZ-AMER-160' },
          message: 'Supplier increased price by 8.3%. Consider alternatives.',
          oldPrice: 11.99,
          newPrice: 12.99,
          percentChange: 8.3,
          alternatives: [
            { supplier: 'US Foods', price: 12.49 },
            { supplier: 'Restaurant Depot', price: 11.75 }
          ],
          createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
          dismissed: false
        }
      ]);
      setLoading(false);
    }, 500);
  }, []);

  const getAlertConfig = (type) => {
    switch (type) {
      case 'critical':
        return { color: '#ef4444', bg: 'rgba(239, 68, 68, 0.1)', icon: AlertCircle };
      case 'warning':
        return { color: '#f97316', bg: 'rgba(249, 115, 22, 0.1)', icon: AlertTriangle };
      case 'info':
        return { color: '#3b82f6', bg: 'rgba(59, 130, 246, 0.1)', icon: Bell };
      default:
        return { color: '#6b7280', bg: 'rgba(107, 114, 128, 0.1)', icon: Bell };
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'out_of_stock':
        return AlertCircle;
      case 'low_stock':
        return TrendingDown;
      case 'expiring':
        return Clock;
      case 'reorder':
        return ShoppingCart;
      case 'price_change':
        return DollarSign;
      default:
        return Bell;
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  };

  const formatTimeAgo = (date) => {
    const diff = Date.now() - date;
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const handleDismiss = (alertId) => {
    setAlerts(prev => prev.map(a => 
      a.id === alertId ? { ...a, dismissed: true } : a
    ));
  };

  const handleQuickOrder = (alert) => {
    console.log('Quick order for:', alert.item.name, alert.reorderQuantity);
    // Would integrate with supplier ordering
  };

  const handleBulkOrder = () => {
    const toOrder = alerts.filter(a => 
      selectedAlerts.includes(a.id) && 
      ['low_stock', 'out_of_stock', 'reorder'].includes(a.category)
    );
    console.log('Bulk order:', toOrder);
  };

  const handleSelectAlert = (alertId) => {
    setSelectedAlerts(prev =>
      prev.includes(alertId) 
        ? prev.filter(id => id !== alertId)
        : [...prev, alertId]
    );
  };

  const handleSelectAll = () => {
    const orderableAlerts = filteredAlerts
      .filter(a => ['low_stock', 'out_of_stock', 'reorder'].includes(a.category))
      .map(a => a.id);
    
    if (selectedAlerts.length === orderableAlerts.length) {
      setSelectedAlerts([]);
    } else {
      setSelectedAlerts(orderableAlerts);
    }
  };

  // Filter alerts
  const filteredAlerts = alerts.filter(alert => {
    if (alert.dismissed) return false;
    if (filter === 'all') return true;
    if (filter === 'critical') return alert.type === 'critical';
    if (filter === 'stock') return ['low_stock', 'out_of_stock', 'reorder'].includes(alert.category);
    if (filter === 'expiring') return alert.category === 'expiring';
    return true;
  });

  // Stats
  const stats = {
    total: alerts.filter(a => !a.dismissed).length,
    critical: alerts.filter(a => !a.dismissed && a.type === 'critical').length,
    warnings: alerts.filter(a => !a.dismissed && a.type === 'warning').length,
    expiring: alerts.filter(a => !a.dismissed && a.category === 'expiring').length
  };

  const totalReorderCost = alerts
    .filter(a => !a.dismissed && a.estimatedCost && ['low_stock', 'out_of_stock', 'reorder'].includes(a.category))
    .reduce((sum, a) => sum + a.estimatedCost, 0);

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <h2 style={styles.title}>Inventory Alerts</h2>
          <span style={styles.alertCount}>
            {stats.total} active alerts
          </span>
        </div>
        <div style={styles.headerActions}>
          <button 
            style={styles.settingsBtn}
            onClick={() => setShowSettings(!showSettings)}
          >
            <Settings size={16} />
            Settings
          </button>
          <button style={styles.refreshBtn}>
            <RefreshCw size={16} />
            Refresh
          </button>
        </div>
      </div>

      {/* Stats */}
      <div style={styles.statsRow}>
        <div style={{...styles.statBadge, ...styles.statCritical}}>
          <AlertCircle size={16} />
          <span>{stats.critical} Critical</span>
        </div>
        <div style={{...styles.statBadge, ...styles.statWarning}}>
          <AlertTriangle size={16} />
          <span>{stats.warnings} Warnings</span>
        </div>
        <div style={{...styles.statBadge, ...styles.statExpiring}}>
          <Clock size={16} />
          <span>{stats.expiring} Expiring</span>
        </div>
        {totalReorderCost > 0 && (
          <div style={styles.reorderCost}>
            <ShoppingCart size={16} />
            <span>Est. reorder cost: {formatCurrency(totalReorderCost)}</span>
          </div>
        )}
      </div>

      {/* AI Summary */}
      {stats.critical > 0 && (
        <div style={styles.aiSummary}>
          <div style={styles.aiIcon}>
            <Zap size={20} />
          </div>
          <div style={styles.aiContent}>
            <h4 style={styles.aiTitle}>AI Recommendation</h4>
            <p style={styles.aiText}>
              {stats.critical} critical items need immediate attention. 
              <strong> One-click order all low stock items</strong> for {formatCurrency(totalReorderCost)} to 
              prevent service disruption. Delivery in 1-2 days.
            </p>
          </div>
          <button style={styles.aiAction} onClick={handleBulkOrder}>
            <ShoppingCart size={14} />
            Order All ({formatCurrency(totalReorderCost)})
          </button>
        </div>
      )}

      {/* Filters */}
      <div style={styles.filterBar}>
        <div style={styles.filterTabs}>
          {[
            { id: 'all', label: 'All Alerts' },
            { id: 'critical', label: 'Critical' },
            { id: 'stock', label: 'Stock Issues' },
            { id: 'expiring', label: 'Expiring' }
          ].map(f => (
            <button
              key={f.id}
              style={{
                ...styles.filterTab,
                ...(filter === f.id ? styles.filterTabActive : {})
              }}
              onClick={() => setFilter(f.id)}
            >
              {f.label}
            </button>
          ))}
        </div>

        {selectedAlerts.length > 0 && (
          <div style={styles.bulkActions}>
            <span style={styles.selectedCount}>{selectedAlerts.length} selected</span>
            <button style={styles.bulkOrderBtn} onClick={handleBulkOrder}>
              <ShoppingCart size={14} />
              Order Selected
            </button>
            <button 
              style={styles.clearSelectionBtn}
              onClick={() => setSelectedAlerts([])}
            >
              <X size={14} />
            </button>
          </div>
        )}
      </div>

      {/* Alerts List */}
      <div style={styles.alertsList}>
        {filteredAlerts.map(alert => {
          const config = getAlertConfig(alert.type);
          const CategoryIcon = getCategoryIcon(alert.category);
          const AlertIcon = config.icon;
          const isSelected = selectedAlerts.includes(alert.id);
          const canOrder = ['low_stock', 'out_of_stock', 'reorder'].includes(alert.category);

          return (
            <div 
              key={alert.id} 
              style={{
                ...styles.alertCard,
                borderLeftColor: config.color,
                ...(isSelected ? styles.alertCardSelected : {})
              }}
            >
              <div style={styles.alertHeader}>
                {canOrder && (
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => handleSelectAlert(alert.id)}
                    style={styles.checkbox}
                  />
                )}
                <div style={{
                  ...styles.alertIcon,
                  backgroundColor: config.bg,
                  color: config.color
                }}>
                  <AlertIcon size={18} />
                </div>
                <div style={styles.alertInfo}>
                  <div style={styles.alertTitleRow}>
                    <span style={{...styles.alertTitle, color: config.color}}>
                      {alert.title}
                    </span>
                    <span style={styles.alertTime}>{formatTimeAgo(alert.createdAt)}</span>
                  </div>
                  <span style={styles.alertItem}>{alert.item.name}</span>
                </div>
                <button 
                  style={styles.dismissBtn}
                  onClick={() => handleDismiss(alert.id)}
                >
                  <X size={16} />
                </button>
              </div>

              <p style={styles.alertMessage}>{alert.message}</p>

              {/* Stock Info */}
              {alert.currentStock !== undefined && (
                <div style={styles.stockInfo}>
                  <div style={styles.stockDetail}>
                    <Package size={14} />
                    <span>Current: <strong>{alert.currentStock}</strong></span>
                  </div>
                  {alert.minStock && (
                    <div style={styles.stockDetail}>
                      <TrendingDown size={14} />
                      <span>Min: {alert.minStock}</span>
                    </div>
                  )}
                  {alert.daysUntilEmpty !== undefined && (
                    <div style={styles.stockDetail}>
                      <Clock size={14} />
                      <span>~{alert.daysUntilEmpty} days left</span>
                    </div>
                  )}
                </div>
              )}

              {/* Expiration Info */}
              {alert.expirationDate && (
                <div style={styles.expirationInfo}>
                  <Calendar size={14} />
                  <span>
                    Expires: {alert.expirationDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </span>
                  {alert.estimatedLoss && (
                    <span style={styles.lossWarning}>
                      Potential loss: {formatCurrency(alert.estimatedLoss)}
                    </span>
                  )}
                </div>
              )}

              {/* Suggestions */}
              {alert.suggestions && (
                <div style={styles.suggestions}>
                  <span style={styles.suggestionsLabel}>Suggestions:</span>
                  <div style={styles.suggestionTags}>
                    {alert.suggestions.map((s, i) => (
                      <span key={i} style={styles.suggestionTag}>{s}</span>
                    ))}
                  </div>
                </div>
              )}

              {/* Price Change Info */}
              {alert.category === 'price_change' && (
                <div style={styles.priceChangeInfo}>
                  <div style={styles.priceChange}>
                    <span>{formatCurrency(alert.oldPrice)}</span>
                    <ChevronRight size={14} />
                    <span style={styles.newPrice}>{formatCurrency(alert.newPrice)}</span>
                    <span style={styles.percentChange}>+{alert.percentChange}%</span>
                  </div>
                  {alert.alternatives && (
                    <div style={styles.alternatives}>
                      <span style={styles.altLabel}>Alternatives:</span>
                      {alert.alternatives.map((alt, i) => (
                        <span key={i} style={styles.altOption}>
                          {alt.supplier}: {formatCurrency(alt.price)}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Pending Order */}
              {alert.pendingOrder && (
                <div style={styles.pendingOrder}>
                  <Truck size={14} color="#22c55e" />
                  <span>
                    Order of {alert.pendingOrder.quantity} arriving {' '}
                    {alert.pendingOrder.expectedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </span>
                </div>
              )}

              {/* Actions */}
              {canOrder && !alert.pendingOrder && (
                <div style={styles.alertActions}>
                  <button 
                    style={styles.orderBtn}
                    onClick={() => handleQuickOrder(alert)}
                  >
                    <ShoppingCart size={14} />
                    Order {alert.reorderQuantity} ({formatCurrency(alert.estimatedCost)})
                  </button>
                  <button style={styles.viewBtn}>
                    View Item
                    <ChevronRight size={14} />
                  </button>
                </div>
              )}
            </div>
          );
        })}

        {filteredAlerts.length === 0 && (
          <div style={styles.emptyState}>
            <CheckCircle size={48} color="#22c55e" />
            <h3>All Clear!</h3>
            <p>No alerts matching your filter criteria.</p>
          </div>
        )}
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <div style={styles.settingsOverlay}>
          <div style={styles.settingsPanel}>
            <div style={styles.settingsHeader}>
              <h3 style={styles.settingsTitle}>Alert Settings</h3>
              <button 
                style={styles.closeSettings}
                onClick={() => setShowSettings(false)}
              >
                <X size={20} />
              </button>
            </div>

            <div style={styles.settingsContent}>
              <div style={styles.settingGroup}>
                <h4 style={styles.settingGroupTitle}>Stock Alerts</h4>
                
                <div style={styles.settingRow}>
                  <div style={styles.settingInfo}>
                    <span style={styles.settingLabel}>Low Stock Alerts</span>
                    <span style={styles.settingDesc}>Alert when stock falls below threshold</span>
                  </div>
                  <label style={styles.toggle}>
                    <input 
                      type="checkbox" 
                      checked={alertSettings.lowStockEnabled}
                      onChange={(e) => setAlertSettings(prev => ({...prev, lowStockEnabled: e.target.checked}))}
                    />
                    <span style={styles.toggleSlider}></span>
                  </label>
                </div>

                <div style={styles.settingRow}>
                  <div style={styles.settingInfo}>
                    <span style={styles.settingLabel}>Out of Stock Alerts</span>
                    <span style={styles.settingDesc}>Alert immediately when stock reaches zero</span>
                  </div>
                  <label style={styles.toggle}>
                    <input 
                      type="checkbox" 
                      checked={alertSettings.outOfStockEnabled}
                      onChange={(e) => setAlertSettings(prev => ({...prev, outOfStockEnabled: e.target.checked}))}
                    />
                    <span style={styles.toggleSlider}></span>
                  </label>
                </div>
              </div>

              <div style={styles.settingGroup}>
                <h4 style={styles.settingGroupTitle}>Expiration Alerts</h4>
                
                <div style={styles.settingRow}>
                  <div style={styles.settingInfo}>
                    <span style={styles.settingLabel}>Expiration Warnings</span>
                    <span style={styles.settingDesc}>Alert before items expire</span>
                  </div>
                  <label style={styles.toggle}>
                    <input 
                      type="checkbox" 
                      checked={alertSettings.expirationEnabled}
                      onChange={(e) => setAlertSettings(prev => ({...prev, expirationEnabled: e.target.checked}))}
                    />
                    <span style={styles.toggleSlider}></span>
                  </label>
                </div>

                <div style={styles.settingRow}>
                  <div style={styles.settingInfo}>
                    <span style={styles.settingLabel}>Days Before Expiration</span>
                    <span style={styles.settingDesc}>How early to alert</span>
                  </div>
                  <select 
                    value={alertSettings.expirationDays}
                    onChange={(e) => setAlertSettings(prev => ({...prev, expirationDays: parseInt(e.target.value)}))}
                    style={styles.settingSelect}
                  >
                    <option value={3}>3 days</option>
                    <option value={5}>5 days</option>
                    <option value={7}>7 days</option>
                    <option value={14}>14 days</option>
                  </select>
                </div>
              </div>

              <div style={styles.settingGroup}>
                <h4 style={styles.settingGroupTitle}>Notifications</h4>
                
                <div style={styles.settingRow}>
                  <div style={styles.settingInfo}>
                    <span style={styles.settingLabel}>Email Notifications</span>
                    <span style={styles.settingDesc}>Send alerts to email</span>
                  </div>
                  <label style={styles.toggle}>
                    <input 
                      type="checkbox" 
                      checked={alertSettings.emailNotifications}
                      onChange={(e) => setAlertSettings(prev => ({...prev, emailNotifications: e.target.checked}))}
                    />
                    <span style={styles.toggleSlider}></span>
                  </label>
                </div>

                <div style={styles.settingRow}>
                  <div style={styles.settingInfo}>
                    <span style={styles.settingLabel}>Push Notifications</span>
                    <span style={styles.settingDesc}>Send alerts to mobile app</span>
                  </div>
                  <label style={styles.toggle}>
                    <input 
                      type="checkbox" 
                      checked={alertSettings.pushNotifications}
                      onChange={(e) => setAlertSettings(prev => ({...prev, pushNotifications: e.target.checked}))}
                    />
                    <span style={styles.toggleSlider}></span>
                  </label>
                </div>
              </div>
            </div>

            <div style={styles.settingsFooter}>
              <button 
                style={styles.cancelBtn}
                onClick={() => setShowSettings(false)}
              >
                Cancel
              </button>
              <button style={styles.saveBtn}>
                Save Settings
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
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px'
  },
  title: {
    fontSize: '24px',
    fontWeight: 700,
    margin: 0
  },
  alertCount: {
    padding: '6px 12px',
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    borderRadius: '16px',
    fontSize: '13px',
    color: '#ef4444',
    fontWeight: 600
  },
  headerActions: {
    display: 'flex',
    gap: '12px'
  },
  settingsBtn: {
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
  refreshBtn: {
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
  statsRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    flexWrap: 'wrap'
  },
  statBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 16px',
    borderRadius: '10px',
    fontSize: '14px',
    fontWeight: 600
  },
  statCritical: {
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    color: '#ef4444'
  },
  statWarning: {
    backgroundColor: 'rgba(249, 115, 22, 0.1)',
    color: '#f97316'
  },
  statExpiring: {
    backgroundColor: 'rgba(234, 179, 8, 0.1)',
    color: '#eab308'
  },
  reorderCost: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginLeft: 'auto',
    fontSize: '14px',
    color: 'var(--color-text-muted)'
  },
  aiSummary: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    padding: '20px 24px',
    backgroundColor: 'rgba(139, 92, 246, 0.1)',
    borderRadius: '16px',
    border: '1px solid rgba(139, 92, 246, 0.2)'
  },
  aiIcon: {
    width: '48px',
    height: '48px',
    borderRadius: '12px',
    backgroundColor: '#8b5cf6',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#ffffff',
    flexShrink: 0
  },
  aiContent: {
    flex: 1
  },
  aiTitle: {
    fontSize: '14px',
    fontWeight: 600,
    margin: '0 0 4px 0',
    color: '#8b5cf6'
  },
  aiText: {
    fontSize: '14px',
    margin: 0,
    color: 'var(--color-text)',
    lineHeight: 1.5
  },
  aiAction: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 20px',
    backgroundColor: '#8b5cf6',
    border: 'none',
    borderRadius: '10px',
    color: '#ffffff',
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer',
    whiteSpace: 'nowrap'
  },
  filterBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  filterTabs: {
    display: 'flex',
    gap: '8px'
  },
  filterTab: {
    padding: '10px 16px',
    backgroundColor: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    borderRadius: '10px',
    color: 'var(--color-text)',
    fontSize: '13px',
    fontWeight: 500,
    cursor: 'pointer'
  },
  filterTabActive: {
    backgroundColor: 'var(--color-primary)',
    borderColor: 'var(--color-primary)',
    color: '#ffffff'
  },
  bulkActions: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  selectedCount: {
    fontSize: '13px',
    color: 'var(--color-text-muted)'
  },
  bulkOrderBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 16px',
    backgroundColor: 'var(--color-primary)',
    border: 'none',
    borderRadius: '10px',
    color: '#ffffff',
    fontSize: '13px',
    fontWeight: 600,
    cursor: 'pointer'
  },
  clearSelectionBtn: {
    padding: '10px',
    backgroundColor: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    borderRadius: '10px',
    color: 'var(--color-text-muted)',
    cursor: 'pointer'
  },
  alertsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  alertCard: {
    backgroundColor: 'var(--color-surface)',
    borderRadius: '16px',
    border: '1px solid var(--color-border)',
    borderLeft: '4px solid',
    padding: '20px 24px'
  },
  alertCardSelected: {
    backgroundColor: 'rgba(59, 130, 246, 0.05)'
  },
  alertHeader: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '16px',
    marginBottom: '12px'
  },
  checkbox: {
    width: '18px',
    height: '18px',
    cursor: 'pointer',
    marginTop: '4px'
  },
  alertIcon: {
    width: '40px',
    height: '40px',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0
  },
  alertInfo: {
    flex: 1
  },
  alertTitleRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '4px'
  },
  alertTitle: {
    fontSize: '14px',
    fontWeight: 600
  },
  alertTime: {
    fontSize: '12px',
    color: 'var(--color-text-muted)'
  },
  alertItem: {
    fontSize: '16px',
    fontWeight: 600
  },
  dismissBtn: {
    padding: '8px',
    backgroundColor: 'transparent',
    border: 'none',
    color: 'var(--color-text-muted)',
    cursor: 'pointer',
    borderRadius: '8px'
  },
  alertMessage: {
    fontSize: '14px',
    color: 'var(--color-text-muted)',
    margin: '0 0 16px 0',
    paddingLeft: '56px'
  },
  stockInfo: {
    display: 'flex',
    gap: '20px',
    paddingLeft: '56px',
    marginBottom: '16px'
  },
  stockDetail: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '13px',
    color: 'var(--color-text-muted)'
  },
  expirationInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    paddingLeft: '56px',
    marginBottom: '16px',
    fontSize: '13px',
    color: 'var(--color-text-muted)'
  },
  lossWarning: {
    color: '#ef4444',
    fontWeight: 600
  },
  suggestions: {
    paddingLeft: '56px',
    marginBottom: '16px'
  },
  suggestionsLabel: {
    fontSize: '12px',
    color: 'var(--color-text-muted)',
    marginBottom: '8px',
    display: 'block'
  },
  suggestionTags: {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap'
  },
  suggestionTag: {
    padding: '6px 12px',
    backgroundColor: 'var(--color-surface-2)',
    borderRadius: '16px',
    fontSize: '12px',
    color: 'var(--color-text)'
  },
  priceChangeInfo: {
    paddingLeft: '56px',
    marginBottom: '16px'
  },
  priceChange: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '8px'
  },
  newPrice: {
    fontWeight: 600
  },
  percentChange: {
    color: '#ef4444',
    fontWeight: 600
  },
  alternatives: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    fontSize: '13px'
  },
  altLabel: {
    color: 'var(--color-text-muted)'
  },
  altOption: {
    padding: '4px 10px',
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
    borderRadius: '8px',
    color: '#22c55e',
    fontWeight: 500
  },
  pendingOrder: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '12px 16px',
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
    borderRadius: '10px',
    marginLeft: '56px',
    marginBottom: '16px',
    fontSize: '13px',
    color: '#22c55e',
    fontWeight: 500
  },
  alertActions: {
    display: 'flex',
    gap: '12px',
    paddingLeft: '56px'
  },
  orderBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 20px',
    backgroundColor: 'var(--color-primary)',
    border: 'none',
    borderRadius: '10px',
    color: '#ffffff',
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer'
  },
  viewBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '12px 20px',
    backgroundColor: 'var(--color-surface-2)',
    border: '1px solid var(--color-border)',
    borderRadius: '10px',
    color: 'var(--color-text)',
    fontSize: '14px',
    cursor: 'pointer'
  },
  emptyState: {
    textAlign: 'center',
    padding: '60px 20px',
    backgroundColor: 'var(--color-surface)',
    borderRadius: '16px',
    border: '1px solid var(--color-border)'
  },
  settingsOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000
  },
  settingsPanel: {
    width: '100%',
    maxWidth: '500px',
    backgroundColor: 'var(--color-surface)',
    borderRadius: '20px',
    overflow: 'hidden'
  },
  settingsHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 24px',
    borderBottom: '1px solid var(--color-border)'
  },
  settingsTitle: {
    fontSize: '18px',
    fontWeight: 600,
    margin: 0
  },
  closeSettings: {
    padding: '8px',
    backgroundColor: 'transparent',
    border: 'none',
    color: 'var(--color-text-muted)',
    cursor: 'pointer'
  },
  settingsContent: {
    padding: '24px',
    maxHeight: '60vh',
    overflowY: 'auto'
  },
  settingGroup: {
    marginBottom: '24px'
  },
  settingGroupTitle: {
    fontSize: '14px',
    fontWeight: 600,
    marginBottom: '16px',
    color: 'var(--color-text-muted)',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  },
  settingRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 0',
    borderBottom: '1px solid var(--color-border)'
  },
  settingInfo: {},
  settingLabel: {
    display: 'block',
    fontWeight: 500,
    marginBottom: '2px'
  },
  settingDesc: {
    fontSize: '12px',
    color: 'var(--color-text-muted)'
  },
  toggle: {
    position: 'relative',
    width: '48px',
    height: '24px',
    display: 'inline-block'
  },
  toggleSlider: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'var(--color-surface-2)',
    borderRadius: '24px',
    cursor: 'pointer',
    transition: 'all 0.2s'
  },
  settingSelect: {
    padding: '8px 12px',
    backgroundColor: 'var(--color-surface-2)',
    border: '1px solid var(--color-border)',
    borderRadius: '8px',
    color: 'var(--color-text)',
    fontSize: '14px',
    outline: 'none'
  },
  settingsFooter: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '12px',
    padding: '16px 24px',
    borderTop: '1px solid var(--color-border)'
  },
  cancelBtn: {
    padding: '12px 24px',
    backgroundColor: 'var(--color-surface-2)',
    border: '1px solid var(--color-border)',
    borderRadius: '10px',
    color: 'var(--color-text)',
    fontSize: '14px',
    cursor: 'pointer'
  },
  saveBtn: {
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

export default InventoryAlerts;