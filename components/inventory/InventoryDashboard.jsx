/**
 * InventoryDashboard
 * 
 * Inventory command center - stock overview at a glance.
 * - Total inventory value
 * - Stock level summary
 * - Low stock alerts
 * - Recent movements
 * - Category breakdown
 * - Location overview
 * - AI-powered insights
 * 
 * Foundation for SYCOT multi-channel sync.
 */

import React, { useState, useEffect } from 'react';
import {
  Package,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Layers,
  MapPin,
  ArrowUpRight,
  ArrowDownRight,
  ArrowRightLeft,
  ShoppingCart,
  Truck,
  RefreshCw,
  Zap,
  ChevronRight,
  Plus,
  Search,
  Filter,
  BarChart3,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';

export function InventoryDashboard() {
  const [loading, setLoading] = useState(true);
  const [inventoryData, setInventoryData] = useState(null);
  const [syncStatus, setSyncStatus] = useState('synced'); // synced, syncing, error

  useEffect(() => {
    setTimeout(() => {
      setInventoryData({
        // Summary metrics
        summary: {
          totalItems: 1247,
          totalValue: 89450.00,
          valueChange: 8.5,
          inStock: 1089,
          lowStock: 67,
          outOfStock: 91,
          onOrder: 234,
          reserved: 156
        },

        // Stock health
        stockHealth: {
          healthy: 78,
          warning: 15,
          critical: 7
        },

        // Recent movements
        recentMovements: [
          { id: 1, type: 'in', item: 'Classic Burger Patties', quantity: 200, location: 'Main Kitchen', time: '10 min ago', user: 'John D.' },
          { id: 2, type: 'out', item: 'Chicken Wings (12pc)', quantity: 48, location: 'Main Kitchen', time: '25 min ago', user: 'System' },
          { id: 3, type: 'transfer', item: 'Napkins (500ct)', quantity: 10, from: 'Warehouse', to: 'Main Kitchen', time: '1 hr ago', user: 'Sarah M.' },
          { id: 4, type: 'adjustment', item: 'Tomatoes (lb)', quantity: -5, location: 'Walk-in Cooler', time: '2 hrs ago', user: 'Mike R.', reason: 'Spoilage' },
          { id: 5, type: 'in', item: 'Craft Beer (case)', quantity: 24, location: 'Bar Storage', time: '3 hrs ago', user: 'John D.' }
        ],

        // Low stock alerts
        lowStockAlerts: [
          { id: 1, item: 'Burger Buns', current: 24, minimum: 50, reorderPoint: 100, daysLeft: 1.5, severity: 'critical' },
          { id: 2, item: 'French Fries (5lb bag)', current: 8, minimum: 10, reorderPoint: 25, daysLeft: 2, severity: 'critical' },
          { id: 3, item: 'Ranch Dressing', current: 6, minimum: 5, reorderPoint: 12, daysLeft: 3, severity: 'warning' },
          { id: 4, item: 'Bacon (lb)', current: 12, minimum: 10, reorderPoint: 20, daysLeft: 4, severity: 'warning' },
          { id: 5, item: 'Paper Towels', current: 15, minimum: 10, reorderPoint: 30, daysLeft: 5, severity: 'warning' }
        ],

        // Category breakdown
        categories: [
          { name: 'Proteins', items: 156, value: 24500, percent: 27.4, status: 'healthy' },
          { name: 'Produce', items: 234, value: 8900, percent: 10.0, status: 'warning' },
          { name: 'Dry Goods', items: 312, value: 12400, percent: 13.9, status: 'healthy' },
          { name: 'Beverages', items: 189, value: 18600, percent: 20.8, status: 'healthy' },
          { name: 'Dairy', items: 87, value: 6200, percent: 6.9, status: 'warning' },
          { name: 'Frozen', items: 145, value: 11200, percent: 12.5, status: 'healthy' },
          { name: 'Supplies', items: 124, value: 7650, percent: 8.5, status: 'healthy' }
        ],

        // Locations
        locations: [
          { id: 1, name: 'Main Kitchen', items: 456, value: 32400, status: 'healthy', lastSync: '2 min ago' },
          { id: 2, name: 'Walk-in Cooler', items: 234, value: 18900, status: 'warning', lastSync: '2 min ago' },
          { id: 3, name: 'Bar Storage', items: 189, value: 15600, status: 'healthy', lastSync: '2 min ago' },
          { id: 4, name: 'Dry Storage', items: 278, value: 14200, status: 'healthy', lastSync: '2 min ago' },
          { id: 5, name: 'Warehouse', items: 90, value: 8350, status: 'healthy', lastSync: '5 min ago' }
        ],

        // Pending orders
        pendingOrders: [
          { id: 'PO-2024-156', supplier: 'Sysco Foods', items: 24, total: 1245.00, status: 'shipped', eta: 'Tomorrow' },
          { id: 'PO-2024-157', supplier: 'Local Produce Co', items: 12, total: 456.00, status: 'processing', eta: 'Wed' },
          { id: 'PO-2024-158', supplier: 'Beverage Dist.', items: 36, total: 890.00, status: 'confirmed', eta: 'Thu' }
        ],

        // Inventory turnover
        turnover: {
          current: 8.2,
          previous: 7.5,
          change: 9.3,
          benchmark: 7.0
        },

        // AI Insights
        aiInsights: [
          {
            type: 'warning',
            title: '2 Items Critical',
            message: 'Burger Buns and French Fries will run out in ~2 days based on current sales velocity.',
            action: 'Create PO'
          },
          {
            type: 'opportunity',
            title: 'Reduce Protein Stock',
            message: 'Protein inventory is 15% above optimal. Consider running a special to reduce carrying costs.',
            action: 'View analysis'
          },
          {
            type: 'insight',
            title: 'Turnover Improved',
            message: 'Inventory turnover increased 9.3% this month. Your stock is moving faster than benchmark.',
            action: 'See details'
          }
        ],

        // Channel sync status (SYCOT)
        channelSync: [
          { channel: 'Website', status: 'synced', lastSync: '1 min ago', items: 856 },
          { channel: 'Square POS', status: 'synced', lastSync: '1 min ago', items: 456 },
          { channel: 'DoorDash', status: 'synced', lastSync: '3 min ago', items: 234 },
          { channel: 'UberEats', status: 'syncing', lastSync: 'Syncing...', items: 234 }
        ]
      });
      setLoading(false);
    }, 600);
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  };

  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  const getMovementIcon = (type) => {
    switch (type) {
      case 'in': return <ArrowDownRight size={16} color="#22c55e" />;
      case 'out': return <ArrowUpRight size={16} color="#ef4444" />;
      case 'transfer': return <ArrowRightLeft size={16} color="#3b82f6" />;
      case 'adjustment': return <AlertCircle size={16} color="#f59e0b" />;
      default: return <Package size={16} />;
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'synced': return <CheckCircle size={14} color="#22c55e" />;
      case 'syncing': return <RefreshCw size={14} color="#3b82f6" style={{ animation: 'spin 1s linear infinite' }} />;
      case 'error': return <XCircle size={14} color="#ef4444" />;
      default: return <CheckCircle size={14} />;
    }
  };

  if (loading || !inventoryData) {
    return (
      <div style={styles.loadingContainer}>
        <Package size={32} style={{ animation: 'pulse 1s ease-in-out infinite' }} />
        <p>Loading inventory...</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <h1 style={styles.title}>Inventory</h1>
          <span style={styles.subtitle}>Stock management & tracking</span>
        </div>
        <div style={styles.headerActions}>
          {/* Sync Status */}
          <div style={styles.syncStatus}>
            {getStatusIcon(syncStatus)}
            <span>All channels synced</span>
          </div>
          <button style={styles.syncBtn}>
            <RefreshCw size={16} />
            Sync Now
          </button>
          <button style={styles.primaryBtn}>
            <Plus size={16} />
            Add Item
          </button>
        </div>
      </div>

      {/* AI Insights */}
      <div style={styles.aiInsightsRow}>
        {inventoryData.aiInsights.map((insight, index) => (
          <div key={index} style={{
            ...styles.aiInsightCard,
            borderLeftColor: insight.type === 'opportunity' ? '#22c55e' :
                            insight.type === 'warning' ? '#f97316' : '#3b82f6'
          }}>
            <Zap size={16} color={
              insight.type === 'opportunity' ? '#22c55e' :
              insight.type === 'warning' ? '#f97316' : '#3b82f6'
            } />
            <div style={styles.aiInsightContent}>
              <h4 style={styles.aiInsightTitle}>{insight.title}</h4>
              <p style={styles.aiInsightMessage}>{insight.message}</p>
            </div>
            <button style={styles.aiInsightAction}>{insight.action}</button>
          </div>
        ))}
      </div>

      {/* Summary Metrics */}
      <div style={styles.metricsGrid}>
        <div style={styles.metricCard}>
          <div style={styles.metricHeader}>
            <div style={{...styles.metricIcon, backgroundColor: 'rgba(59, 130, 246, 0.1)'}}>
              <Package size={22} color="#3b82f6" />
            </div>
          </div>
          <div style={styles.metricValue}>{formatNumber(inventoryData.summary.totalItems)}</div>
          <div style={styles.metricLabel}>Total Items</div>
          <div style={styles.metricBreakdown}>
            <span style={styles.breakdownItem}>
              <span style={{...styles.breakdownDot, backgroundColor: '#22c55e'}} />
              {inventoryData.summary.inStock} in stock
            </span>
          </div>
        </div>

        <div style={styles.metricCard}>
          <div style={styles.metricHeader}>
            <div style={{...styles.metricIcon, backgroundColor: 'rgba(34, 197, 94, 0.1)'}}>
              <DollarSign size={22} color="#22c55e" />
            </div>
          </div>
          <div style={styles.metricValue}>{formatCurrency(inventoryData.summary.totalValue)}</div>
          <div style={styles.metricLabel}>Total Value</div>
          <div style={styles.metricChange}>
            <ArrowUpRight size={14} color="#22c55e" />
            <span style={{ color: '#22c55e' }}>+{inventoryData.summary.valueChange}%</span>
            <span style={styles.changeLabel}>vs last month</span>
          </div>
        </div>

        <div style={styles.metricCard}>
          <div style={styles.metricHeader}>
            <div style={{...styles.metricIcon, backgroundColor: 'rgba(249, 115, 22, 0.1)'}}>
              <AlertTriangle size={22} color="#f97316" />
            </div>
          </div>
          <div style={styles.metricValue}>{inventoryData.summary.lowStock}</div>
          <div style={styles.metricLabel}>Low Stock</div>
          <div style={styles.metricBreakdown}>
            <span style={{...styles.breakdownItem, color: '#ef4444'}}>
              {inventoryData.summary.outOfStock} out of stock
            </span>
          </div>
        </div>

        <div style={styles.metricCard}>
          <div style={styles.metricHeader}>
            <div style={{...styles.metricIcon, backgroundColor: 'rgba(139, 92, 246, 0.1)'}}>
              <Truck size={22} color="#8b5cf6" />
            </div>
          </div>
          <div style={styles.metricValue}>{inventoryData.summary.onOrder}</div>
          <div style={styles.metricLabel}>On Order</div>
          <div style={styles.metricBreakdown}>
            <span style={styles.breakdownItem}>
              {inventoryData.summary.reserved} reserved
            </span>
          </div>
        </div>

        <div style={styles.metricCard}>
          <div style={styles.metricHeader}>
            <div style={{...styles.metricIcon, backgroundColor: 'rgba(6, 182, 212, 0.1)'}}>
              <TrendingUp size={22} color="#06b6d4" />
            </div>
          </div>
          <div style={styles.metricValue}>{inventoryData.turnover.current}x</div>
          <div style={styles.metricLabel}>Turnover Rate</div>
          <div style={styles.metricChange}>
            <ArrowUpRight size={14} color="#22c55e" />
            <span style={{ color: '#22c55e' }}>+{inventoryData.turnover.change}%</span>
            <span style={styles.changeLabel}>above benchmark</span>
          </div>
        </div>
      </div>

      {/* Stock Health Bar */}
      <div style={styles.healthCard}>
        <div style={styles.healthHeader}>
          <h3 style={styles.healthTitle}>Stock Health</h3>
          <div style={styles.healthLegend}>
            <span style={styles.legendItem}>
              <span style={{...styles.legendDot, backgroundColor: '#22c55e'}} />
              Healthy ({inventoryData.stockHealth.healthy}%)
            </span>
            <span style={styles.legendItem}>
              <span style={{...styles.legendDot, backgroundColor: '#f59e0b'}} />
              Warning ({inventoryData.stockHealth.warning}%)
            </span>
            <span style={styles.legendItem}>
              <span style={{...styles.legendDot, backgroundColor: '#ef4444'}} />
              Critical ({inventoryData.stockHealth.critical}%)
            </span>
          </div>
        </div>
        <div style={styles.healthBar}>
          <div style={{
            ...styles.healthSegment,
            width: `${inventoryData.stockHealth.healthy}%`,
            backgroundColor: '#22c55e'
          }} />
          <div style={{
            ...styles.healthSegment,
            width: `${inventoryData.stockHealth.warning}%`,
            backgroundColor: '#f59e0b'
          }} />
          <div style={{
            ...styles.healthSegment,
            width: `${inventoryData.stockHealth.critical}%`,
            backgroundColor: '#ef4444'
          }} />
        </div>
      </div>

      {/* Main Content Grid */}
      <div style={styles.mainGrid}>
        {/* Low Stock Alerts */}
        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <h3 style={styles.cardTitle}>
              <AlertTriangle size={18} color="#f97316" style={{ marginRight: '8px' }} />
              Low Stock Alerts
            </h3>
            <button style={styles.viewAllBtn}>
              View All <ChevronRight size={14} />
            </button>
          </div>
          <div style={styles.alertsList}>
            {inventoryData.lowStockAlerts.map((alert) => (
              <div key={alert.id} style={styles.alertRow}>
                <div style={{
                  ...styles.alertSeverity,
                  backgroundColor: alert.severity === 'critical' ? '#ef4444' : '#f59e0b'
                }} />
                <div style={styles.alertInfo}>
                  <span style={styles.alertItem}>{alert.item}</span>
                  <span style={styles.alertMeta}>
                    {alert.current} left • Reorder at {alert.reorderPoint}
                  </span>
                </div>
                <div style={styles.alertStats}>
                  <span style={{
                    ...styles.daysLeft,
                    color: alert.daysLeft <= 2 ? '#ef4444' : '#f59e0b'
                  }}>
                    ~{alert.daysLeft}d left
                  </span>
                </div>
                <button style={styles.reorderBtn}>Reorder</button>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Movements */}
        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <h3 style={styles.cardTitle}>Recent Movements</h3>
            <button style={styles.viewAllBtn}>
              View All <ChevronRight size={14} />
            </button>
          </div>
          <div style={styles.movementsList}>
            {inventoryData.recentMovements.map((movement) => (
              <div key={movement.id} style={styles.movementRow}>
                <div style={styles.movementIcon}>
                  {getMovementIcon(movement.type)}
                </div>
                <div style={styles.movementInfo}>
                  <span style={styles.movementItem}>{movement.item}</span>
                  <span style={styles.movementMeta}>
                    {movement.type === 'transfer' 
                      ? `${movement.from} → ${movement.to}`
                      : movement.location
                    }
                    {movement.reason && ` • ${movement.reason}`}
                  </span>
                </div>
                <div style={styles.movementQuantity}>
                  <span style={{
                    color: movement.type === 'in' ? '#22c55e' : 
                           movement.type === 'out' ? '#ef4444' : 
                           movement.quantity < 0 ? '#ef4444' : '#3b82f6'
                  }}>
                    {movement.type === 'in' ? '+' : movement.type === 'out' ? '-' : ''}
                    {Math.abs(movement.quantity)}
                  </span>
                </div>
                <div style={styles.movementTime}>
                  <span style={styles.timeAgo}>{movement.time}</span>
                  <span style={styles.movementUser}>{movement.user}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Categories & Locations */}
      <div style={styles.twoColumnGrid}>
        {/* Categories */}
        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <h3 style={styles.cardTitle}>Categories</h3>
            <Layers size={18} color="var(--color-text-muted)" />
          </div>
          <div style={styles.categoriesList}>
            {inventoryData.categories.map((category, index) => (
              <div key={index} style={styles.categoryRow}>
                <div style={styles.categoryInfo}>
                  <span style={styles.categoryName}>{category.name}</span>
                  <span style={styles.categoryItems}>{category.items} items</span>
                </div>
                <div style={styles.categoryValue}>
                  {formatCurrency(category.value)}
                </div>
                <div style={styles.categoryBar}>
                  <div style={{
                    ...styles.categoryBarFill,
                    width: `${category.percent}%`,
                    backgroundColor: category.status === 'healthy' ? '#22c55e' : '#f59e0b'
                  }} />
                </div>
                <span style={styles.categoryPercent}>{category.percent}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Locations */}
        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <h3 style={styles.cardTitle}>Locations</h3>
            <MapPin size={18} color="var(--color-text-muted)" />
          </div>
          <div style={styles.locationsList}>
            {inventoryData.locations.map((location) => (
              <div key={location.id} style={styles.locationRow}>
                <div style={styles.locationInfo}>
                  <div style={styles.locationHeader}>
                    <span style={styles.locationName}>{location.name}</span>
                    <span style={{
                      ...styles.locationStatus,
                      backgroundColor: location.status === 'healthy' 
                        ? 'rgba(34, 197, 94, 0.1)' 
                        : 'rgba(249, 115, 22, 0.1)',
                      color: location.status === 'healthy' ? '#22c55e' : '#f59e0b'
                    }}>
                      {location.status}
                    </span>
                  </div>
                  <span style={styles.locationMeta}>
                    {location.items} items • {formatCurrency(location.value)}
                  </span>
                </div>
                <div style={styles.locationSync}>
                  <CheckCircle size={12} color="#22c55e" />
                  <span>{location.lastSync}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Channel Sync Status (SYCOT) */}
      <div style={styles.card}>
        <div style={styles.cardHeader}>
          <h3 style={styles.cardTitle}>
            <RefreshCw size={18} style={{ marginRight: '8px' }} />
            Channel Sync Status
          </h3>
          <span style={styles.sycotBadge}>SYCOT</span>
        </div>
        <div style={styles.channelGrid}>
          {inventoryData.channelSync.map((channel, index) => (
            <div key={index} style={styles.channelCard}>
              <div style={styles.channelHeader}>
                {getStatusIcon(channel.status)}
                <span style={styles.channelName}>{channel.channel}</span>
              </div>
              <div style={styles.channelStats}>
                <span style={styles.channelItems}>{channel.items} items</span>
                <span style={styles.channelSync}>{channel.lastSync}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pending Orders */}
      <div style={styles.card}>
        <div style={styles.cardHeader}>
          <h3 style={styles.cardTitle}>Pending Orders</h3>
          <button style={styles.viewAllBtn}>
            View All <ChevronRight size={14} />
          </button>
        </div>
        <div style={styles.ordersList}>
          {inventoryData.pendingOrders.map((order) => (
            <div key={order.id} style={styles.orderRow}>
              <div style={styles.orderInfo}>
                <span style={styles.orderId}>{order.id}</span>
                <span style={styles.orderSupplier}>{order.supplier}</span>
              </div>
              <div style={styles.orderItems}>
                {order.items} items • {formatCurrency(order.total)}
              </div>
              <div style={{
                ...styles.orderStatus,
                backgroundColor: order.status === 'shipped' ? 'rgba(34, 197, 94, 0.1)' :
                                order.status === 'processing' ? 'rgba(59, 130, 246, 0.1)' :
                                'rgba(139, 92, 246, 0.1)',
                color: order.status === 'shipped' ? '#22c55e' :
                       order.status === 'processing' ? '#3b82f6' : '#8b5cf6'
              }}>
                {order.status}
              </div>
              <div style={styles.orderEta}>
                <Truck size={14} />
                <span>ETA: {order.eta}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
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
    alignItems: 'center',
    gap: '12px'
  },
  syncStatus: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 16px',
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
    borderRadius: '20px',
    fontSize: '13px',
    color: '#22c55e'
  },
  syncBtn: {
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
  aiInsightsRow: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '16px',
    marginBottom: '24px'
  },
  aiInsightCard: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px',
    padding: '16px 20px',
    backgroundColor: 'var(--color-surface)',
    borderRadius: '12px',
    border: '1px solid var(--color-border)',
    borderLeft: '4px solid'
  },
  aiInsightContent: {
    flex: 1
  },
  aiInsightTitle: {
    fontSize: '14px',
    fontWeight: 600,
    margin: '0 0 4px 0'
  },
  aiInsightMessage: {
    fontSize: '12px',
    color: 'var(--color-text-muted)',
    margin: 0,
    lineHeight: 1.5
  },
  aiInsightAction: {
    padding: '8px 14px',
    backgroundColor: 'var(--color-primary)',
    border: 'none',
    borderRadius: '8px',
    color: '#ffffff',
    fontSize: '12px',
    fontWeight: 600,
    cursor: 'pointer',
    whiteSpace: 'nowrap'
  },
  metricsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
    gap: '16px',
    marginBottom: '24px'
  },
  metricCard: {
    padding: '20px',
    backgroundColor: 'var(--color-surface)',
    borderRadius: '16px',
    border: '1px solid var(--color-border)'
  },
  metricHeader: {
    marginBottom: '12px'
  },
  metricIcon: {
    width: '44px',
    height: '44px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  metricValue: {
    fontSize: '28px',
    fontWeight: 700,
    marginBottom: '4px'
  },
  metricLabel: {
    fontSize: '13px',
    color: 'var(--color-text-muted)',
    marginBottom: '8px'
  },
  metricBreakdown: {
    fontSize: '12px'
  },
  breakdownItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    color: 'var(--color-text-muted)'
  },
  breakdownDot: {
    width: '6px',
    height: '6px',
    borderRadius: '50%'
  },
  metricChange: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    fontSize: '12px'
  },
  changeLabel: {
    color: 'var(--color-text-muted)',
    marginLeft: '4px'
  },
  healthCard: {
    backgroundColor: 'var(--color-surface)',
    borderRadius: '16px',
    border: '1px solid var(--color-border)',
    padding: '20px 24px',
    marginBottom: '24px'
  },
  healthHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px'
  },
  healthTitle: {
    fontSize: '16px',
    fontWeight: 600,
    margin: 0
  },
  healthLegend: {
    display: 'flex',
    gap: '20px'
  },
  legendItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '12px',
    color: 'var(--color-text-muted)'
  },
  legendDot: {
    width: '10px',
    height: '10px',
    borderRadius: '3px'
  },
  healthBar: {
    display: 'flex',
    height: '12px',
    borderRadius: '6px',
    overflow: 'hidden'
  },
  healthSegment: {
    height: '100%'
  },
  mainGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '24px',
    marginBottom: '24px'
  },
  twoColumnGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '24px',
    marginBottom: '24px'
  },
  card: {
    backgroundColor: 'var(--color-surface)',
    borderRadius: '16px',
    border: '1px solid var(--color-border)',
    overflow: 'hidden'
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 24px',
    borderBottom: '1px solid var(--color-border)'
  },
  cardTitle: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '16px',
    fontWeight: 600,
    margin: 0
  },
  viewAllBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    backgroundColor: 'transparent',
    border: 'none',
    color: 'var(--color-primary)',
    fontSize: '13px',
    cursor: 'pointer'
  },
  alertsList: {
    padding: '16px 24px'
  },
  alertRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    padding: '12px 0',
    borderBottom: '1px solid var(--color-border)'
  },
  alertSeverity: {
    width: '4px',
    height: '40px',
    borderRadius: '2px'
  },
  alertInfo: {
    flex: 1
  },
  alertItem: {
    display: 'block',
    fontWeight: 600
  },
  alertMeta: {
    fontSize: '12px',
    color: 'var(--color-text-muted)'
  },
  alertStats: {},
  daysLeft: {
    fontWeight: 600,
    fontSize: '13px'
  },
  reorderBtn: {
    padding: '8px 14px',
    backgroundColor: 'var(--color-primary)',
    border: 'none',
    borderRadius: '8px',
    color: '#ffffff',
    fontSize: '12px',
    fontWeight: 600,
    cursor: 'pointer'
  },
  movementsList: {
    padding: '16px 24px'
  },
  movementRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    padding: '12px 0',
    borderBottom: '1px solid var(--color-border)'
  },
  movementIcon: {
    width: '36px',
    height: '36px',
    borderRadius: '10px',
    backgroundColor: 'var(--color-surface-2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  movementInfo: {
    flex: 1
  },
  movementItem: {
    display: 'block',
    fontWeight: 500
  },
  movementMeta: {
    fontSize: '12px',
    color: 'var(--color-text-muted)'
  },
  movementQuantity: {
    fontWeight: 700,
    fontSize: '16px'
  },
  movementTime: {
    textAlign: 'right'
  },
  timeAgo: {
    display: 'block',
    fontSize: '12px',
    color: 'var(--color-text-muted)'
  },
  movementUser: {
    fontSize: '11px',
    color: 'var(--color-text-muted)'
  },
  categoriesList: {
    padding: '16px 24px'
  },
  categoryRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    padding: '12px 0',
    borderBottom: '1px solid var(--color-border)'
  },
  categoryInfo: {
    width: '120px'
  },
  categoryName: {
    display: 'block',
    fontWeight: 500
  },
  categoryItems: {
    fontSize: '12px',
    color: 'var(--color-text-muted)'
  },
  categoryValue: {
    width: '90px',
    fontWeight: 600,
    fontSize: '14px'
  },
  categoryBar: {
    flex: 1,
    height: '8px',
    backgroundColor: 'var(--color-surface-2)',
    borderRadius: '4px',
    overflow: 'hidden'
  },
  categoryBarFill: {
    height: '100%',
    borderRadius: '4px'
  },
  categoryPercent: {
    width: '50px',
    textAlign: 'right',
    fontWeight: 600,
    fontSize: '13px'
  },
  locationsList: {
    padding: '16px 24px'
  },
  locationRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '14px 0',
    borderBottom: '1px solid var(--color-border)'
  },
  locationInfo: {},
  locationHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '4px'
  },
  locationName: {
    fontWeight: 600
  },
  locationStatus: {
    padding: '2px 8px',
    borderRadius: '10px',
    fontSize: '11px',
    fontWeight: 600,
    textTransform: 'capitalize'
  },
  locationMeta: {
    fontSize: '12px',
    color: 'var(--color-text-muted)'
  },
  locationSync: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '12px',
    color: 'var(--color-text-muted)'
  },
  sycotBadge: {
    padding: '4px 10px',
    backgroundColor: 'rgba(139, 92, 246, 0.1)',
    borderRadius: '12px',
    fontSize: '11px',
    fontWeight: 700,
    color: '#8b5cf6'
  },
  channelGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '16px',
    padding: '20px 24px'
  },
  channelCard: {
    padding: '16px',
    backgroundColor: 'var(--color-surface-2)',
    borderRadius: '12px'
  },
  channelHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '12px'
  },
  channelName: {
    fontWeight: 600
  },
  channelStats: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '12px',
    color: 'var(--color-text-muted)'
  },
  channelItems: {},
  ordersList: {
    padding: '16px 24px'
  },
  orderRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    padding: '14px 0',
    borderBottom: '1px solid var(--color-border)'
  },
  orderInfo: {
    minWidth: '180px'
  },
  orderId: {
    display: 'block',
    fontFamily: 'monospace',
    fontWeight: 600
  },
  orderSupplier: {
    fontSize: '12px',
    color: 'var(--color-text-muted)'
  },
  orderItems: {
    flex: 1,
    fontSize: '14px'
  },
  orderStatus: {
    padding: '6px 12px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: 600,
    textTransform: 'capitalize'
  },
  orderEta: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '13px',
    color: 'var(--color-text-muted)'
  }
};

export default InventoryDashboard;