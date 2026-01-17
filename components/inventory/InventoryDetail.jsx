/**
 * InventoryDetail
 * 
 * Complete view of a single inventory item.
 * - Stock levels and history
 * - Supplier info and ordering
 * - Usage analytics
 * - Cost tracking
 * - Reorder automation settings
 * - Expiration tracking
 * 
 * Foundation for smart supplier integration!
 */

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Package,
  Edit2,
  Trash2,
  ShoppingCart,
  Truck,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Calendar,
  Clock,
  AlertTriangle,
  AlertCircle,
  CheckCircle,
  BarChart3,
  RefreshCw,
  Settings,
  Zap,
  ExternalLink,
  Plus,
  Minus,
  History,
  MapPin,
  Box,
  Target,
  Bell
} from 'lucide-react';

export function InventoryDetail() {
  const { itemId } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [adjustQuantity, setAdjustQuantity] = useState(0);
  const [showReorderModal, setShowReorderModal] = useState(false);

  // Mock item data
  useEffect(() => {
    setTimeout(() => {
      setItem({
        id: itemId || 'INV-001',
        name: 'Ground Beef (80/20)',
        description: 'Premium ground beef, 80% lean 20% fat. Perfect for burgers and tacos.',
        sku: 'BEEF-8020-5LB',
        barcode: '123456789012',
        category: 'proteins',
        
        // Stock Info
        currentStock: 45,
        unit: 'lbs',
        minStock: 20,
        maxStock: 100,
        reorderPoint: 25,
        reorderQuantity: 50,
        
        // Location
        location: 'Walk-in Cooler A',
        bin: 'Shelf 2, Section B',
        
        // Cost & Pricing
        costPerUnit: 4.50,
        lastCost: 4.25,
        avgCost: 4.35,
        totalValue: 202.50,
        
        // Supplier
        supplier: {
          id: 'SUP-001',
          name: 'Sysco Foods',
          contact: 'John Smith',
          phone: '(555) 123-4567',
          email: 'orders@sysco.com',
          accountNumber: 'ACC-78542',
          minOrder: 25,
          leadTime: 2, // days
          deliveryDays: ['Monday', 'Wednesday', 'Friday']
        },
        
        // Alternative Suppliers (for price comparison)
        alternativeSuppliers: [
          { id: 'SUP-003', name: 'US Foods', costPerUnit: 4.65, leadTime: 3 },
          { id: 'SUP-008', name: 'Restaurant Depot', costPerUnit: 4.25, leadTime: 0, note: 'Pickup only' }
        ],
        
        // Dates
        lastRestocked: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
        expirationDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 5),
        createdAt: new Date('2023-06-15'),
        
        // Status
        status: 'ok',
        
        // Usage Analytics
        usageRate: 15, // per day
        daysUntilEmpty: 3,
        weeklyUsage: [12, 18, 15, 20, 14, 22, 16], // last 7 days
        monthlyUsage: 456,
        
        // Reorder Settings
        autoReorder: true,
        autoReorderThreshold: 25,
        preferredSupplier: 'SUP-001',
        
        // Order History
        orderHistory: [
          { id: 'PO-001', date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), quantity: 50, cost: 225.00, supplier: 'Sysco Foods', status: 'delivered' },
          { id: 'PO-002', date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10), quantity: 50, cost: 212.50, supplier: 'Sysco Foods', status: 'delivered' },
          { id: 'PO-003', date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 17), quantity: 40, cost: 170.00, supplier: 'US Foods', status: 'delivered' },
          { id: 'PO-004', date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 25), quantity: 50, cost: 212.50, supplier: 'Sysco Foods', status: 'delivered' }
        ],
        
        // Stock Adjustments
        adjustmentHistory: [
          { id: 'ADJ-001', date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1), type: 'usage', quantity: -15, note: 'Daily usage', by: 'System' },
          { id: 'ADJ-002', date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), type: 'usage', quantity: -18, note: 'Daily usage', by: 'System' },
          { id: 'ADJ-003', date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), type: 'received', quantity: 50, note: 'PO-001 received', by: 'Mike S.' },
          { id: 'ADJ-004', date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), type: 'waste', quantity: -2, note: 'Expired product', by: 'Sarah K.' }
        ],
        
        // Related Items
        relatedItems: [
          { id: 'INV-002', name: 'Burger Buns', currentStock: 8, status: 'low' },
          { id: 'INV-003', name: 'American Cheese', currentStock: 3, status: 'critical' },
          { id: 'INV-006', name: 'Lettuce', currentStock: 12, status: 'reorder' }
        ]
      });
      setLoading(false);
    }, 500);
  }, [itemId]);

  const getStatusConfig = (status) => {
    switch (status) {
      case 'ok':
        return { label: 'In Stock', color: '#22c55e', bg: 'rgba(34, 197, 94, 0.1)', icon: CheckCircle };
      case 'low':
        return { label: 'Low Stock', color: '#eab308', bg: 'rgba(234, 179, 8, 0.1)', icon: AlertTriangle };
      case 'critical':
        return { label: 'Critical', color: '#f97316', bg: 'rgba(249, 115, 22, 0.1)', icon: AlertCircle };
      case 'reorder':
        return { label: 'Reorder', color: '#3b82f6', bg: 'rgba(59, 130, 246, 0.1)', icon: ShoppingCart };
      case 'out':
        return { label: 'Out of Stock', color: '#ef4444', bg: 'rgba(239, 68, 68, 0.1)', icon: AlertCircle };
      default:
        return { label: status, color: '#6b7280', bg: 'rgba(107, 114, 128, 0.1)', icon: Package };
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const handleStockAdjustment = (type) => {
    if (adjustQuantity === 0) return;
    
    const newStock = type === 'add' 
      ? item.currentStock + adjustQuantity 
      : item.currentStock - adjustQuantity;
    
    setItem(prev => ({
      ...prev,
      currentStock: Math.max(0, newStock),
      adjustmentHistory: [
        {
          id: `ADJ-${Date.now()}`,
          date: new Date(),
          type: type === 'add' ? 'received' : 'adjustment',
          quantity: type === 'add' ? adjustQuantity : -adjustQuantity,
          note: 'Manual adjustment',
          by: 'You'
        },
        ...prev.adjustmentHistory
      ]
    }));
    setAdjustQuantity(0);
  };

  const handleQuickReorder = () => {
    setShowReorderModal(true);
  };

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <RefreshCw size={32} style={{ animation: 'spin 1s linear infinite' }} />
        <p>Loading item...</p>
      </div>
    );
  }

  if (!item) {
    return (
      <div style={styles.errorContainer}>
        <AlertCircle size={48} />
        <h2>Item not found</h2>
        <button onClick={() => navigate('/inventory')}>Back to Inventory</button>
      </div>
    );
  }

  const statusConfig = getStatusConfig(item.status);
  const StatusIcon = statusConfig.icon;
  const costChange = ((item.costPerUnit - item.lastCost) / item.lastCost * 100).toFixed(1);
  const stockPercentage = (item.currentStock / item.maxStock) * 100;

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'orders', label: 'Order History' },
    { id: 'usage', label: 'Usage' },
    { id: 'settings', label: 'Settings' }
  ];

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <button style={styles.backButton} onClick={() => navigate('/inventory')}>
            <ArrowLeft size={20} />
          </button>
          <div style={styles.itemHeader}>
            <div style={styles.itemIcon}>
              <Package size={24} />
            </div>
            <div style={styles.itemHeaderInfo}>
              <div style={styles.nameRow}>
                <h1 style={styles.itemName}>{item.name}</h1>
                <span style={{
                  ...styles.statusBadge,
                  backgroundColor: statusConfig.bg,
                  color: statusConfig.color
                }}>
                  <StatusIcon size={14} />
                  {statusConfig.label}
                </span>
              </div>
              <div style={styles.itemMeta}>
                <span>SKU: {item.sku}</span>
                <span>•</span>
                <span>{item.category}</span>
                <span>•</span>
                <span>{item.location}</span>
              </div>
            </div>
          </div>
        </div>
        <div style={styles.headerActions}>
          <button style={styles.actionBtn} onClick={handleQuickReorder}>
            <ShoppingCart size={16} />
            Order Now
          </button>
          <button style={styles.actionBtn}>
            <Edit2 size={16} />
            Edit
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div style={styles.statsGrid}>
        <div style={styles.statCard}>
          <div style={styles.statHeader}>
            <Package size={18} color="#3b82f6" />
            <span style={styles.statLabel}>Current Stock</span>
          </div>
          <div style={styles.stockDisplay}>
            <span style={styles.stockValue}>{item.currentStock}</span>
            <span style={styles.stockUnit}>{item.unit}</span>
          </div>
          <div style={styles.stockBarLarge}>
            <div style={{
              ...styles.stockFillLarge,
              width: `${stockPercentage}%`,
              backgroundColor: statusConfig.color
            }} />
          </div>
          <div style={styles.stockRange}>
            <span>Min: {item.minStock}</span>
            <span>Max: {item.maxStock}</span>
          </div>
        </div>

        <div style={styles.statCard}>
          <div style={styles.statHeader}>
            <Clock size={18} color="#f97316" />
            <span style={styles.statLabel}>Days Until Empty</span>
          </div>
          <span style={styles.bigValue}>{item.daysUntilEmpty}</span>
          <span style={styles.statNote}>At current usage rate</span>
        </div>

        <div style={styles.statCard}>
          <div style={styles.statHeader}>
            <DollarSign size={18} color="#22c55e" />
            <span style={styles.statLabel}>Unit Cost</span>
          </div>
          <div style={styles.costDisplay}>
            <span style={styles.bigValue}>{formatCurrency(item.costPerUnit)}</span>
            {costChange !== '0.0' && (
              <span style={{
                ...styles.costChange,
                color: parseFloat(costChange) > 0 ? '#ef4444' : '#22c55e'
              }}>
                {parseFloat(costChange) > 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                {Math.abs(parseFloat(costChange))}%
              </span>
            )}
          </div>
          <span style={styles.statNote}>Total Value: {formatCurrency(item.totalValue)}</span>
        </div>

        <div style={styles.statCard}>
          <div style={styles.statHeader}>
            <BarChart3 size={18} color="#8b5cf6" />
            <span style={styles.statLabel}>Usage Rate</span>
          </div>
          <span style={styles.bigValue}>{item.usageRate}</span>
          <span style={styles.statNote}>{item.unit} per day avg</span>
        </div>
      </div>

      {/* AI Suggestion */}
      {item.daysUntilEmpty <= 3 && (
        <div style={styles.aiSuggestion}>
          <div style={styles.aiIcon}>
            <Zap size={20} />
          </div>
          <div style={styles.aiContent}>
            <h4 style={styles.aiTitle}>Smart Reorder Suggestion</h4>
            <p style={styles.aiText}>
              Based on usage patterns, order <strong>{item.reorderQuantity} {item.unit}</strong> now 
              to arrive before stockout. Best price: <strong>{formatCurrency(4.25)}/lb at Restaurant Depot</strong> (pickup) 
              or <strong>{formatCurrency(4.50)}/lb from Sysco</strong> (delivery in {item.supplier.leadTime} days).
            </p>
          </div>
          <button style={styles.aiAction} onClick={handleQuickReorder}>
            <ShoppingCart size={14} />
            Quick Order
          </button>
        </div>
      )}

      {/* Tabs */}
      <div style={styles.tabs}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            style={{
              ...styles.tab,
              ...(activeTab === tab.id ? styles.tabActive : {})
            }}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={styles.content}>
        {/* Left Column */}
        <div style={styles.leftColumn}>
          {activeTab === 'overview' && (
            <>
              {/* Stock Adjustment */}
              <div style={styles.card}>
                <div style={styles.cardHeader}>
                  <h3 style={styles.cardTitle}>Quick Stock Adjustment</h3>
                </div>
                <div style={styles.adjustmentForm}>
                  <div style={styles.adjustmentControls}>
                    <button 
                      style={styles.adjustBtn}
                      onClick={() => setAdjustQuantity(Math.max(0, adjustQuantity - 1))}
                    >
                      <Minus size={18} />
                    </button>
                    <input
                      type="number"
                      value={adjustQuantity}
                      onChange={(e) => setAdjustQuantity(Math.max(0, parseInt(e.target.value) || 0))}
                      style={styles.adjustInput}
                    />
                    <button 
                      style={styles.adjustBtn}
                      onClick={() => setAdjustQuantity(adjustQuantity + 1)}
                    >
                      <Plus size={18} />
                    </button>
                  </div>
                  <div style={styles.adjustActions}>
                    <button 
                      style={styles.addStockBtn}
                      onClick={() => handleStockAdjustment('add')}
                      disabled={adjustQuantity === 0}
                    >
                      <Plus size={14} />
                      Add Stock
                    </button>
                    <button 
                      style={styles.removeStockBtn}
                      onClick={() => handleStockAdjustment('remove')}
                      disabled={adjustQuantity === 0}
                    >
                      <Minus size={14} />
                      Remove Stock
                    </button>
                  </div>
                </div>
              </div>

              {/* Recent Adjustments */}
              <div style={styles.card}>
                <div style={styles.cardHeader}>
                  <h3 style={styles.cardTitle}>Recent Activity</h3>
                  <button style={styles.viewAllBtn}>View All</button>
                </div>
                <div style={styles.activityList}>
                  {item.adjustmentHistory.slice(0, 5).map(adj => (
                    <div key={adj.id} style={styles.activityItem}>
                      <div style={{
                        ...styles.activityIcon,
                        backgroundColor: adj.quantity > 0 ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)'
                      }}>
                        {adj.quantity > 0 ? <Plus size={14} color="#22c55e" /> : <Minus size={14} color="#ef4444" />}
                      </div>
                      <div style={styles.activityInfo}>
                        <span style={styles.activityTitle}>
                          {adj.quantity > 0 ? '+' : ''}{adj.quantity} {item.unit}
                        </span>
                        <span style={styles.activityNote}>{adj.note}</span>
                      </div>
                      <div style={styles.activityMeta}>
                        <span>{formatDate(adj.date)}</span>
                        <span>{adj.by}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Usage Chart */}
              <div style={styles.card}>
                <div style={styles.cardHeader}>
                  <h3 style={styles.cardTitle}>Weekly Usage</h3>
                </div>
                <div style={styles.chartContainer}>
                  <div style={styles.barChart}>
                    {item.weeklyUsage.map((usage, index) => {
                      const maxUsage = Math.max(...item.weeklyUsage);
                      const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
                      return (
                        <div key={index} style={styles.barGroup}>
                          <div style={styles.barValue}>{usage}</div>
                          <div style={styles.barWrapper}>
                            <div style={{
                              ...styles.bar,
                              height: `${(usage / maxUsage) * 100}%`
                            }} />
                          </div>
                          <span style={styles.barLabel}>{days[index]}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'orders' && (
            <div style={styles.card}>
              <div style={styles.cardHeader}>
                <h3 style={styles.cardTitle}>Order History</h3>
                <button style={styles.newOrderBtn}>
                  <Plus size={14} />
                  New Order
                </button>
              </div>
              <div style={styles.ordersList}>
                {item.orderHistory.map(order => (
                  <div key={order.id} style={styles.orderRow}>
                    <div style={styles.orderIcon}>
                      <Truck size={16} color="#3b82f6" />
                    </div>
                    <div style={styles.orderInfo}>
                      <span style={styles.orderId}>{order.id}</span>
                      <span style={styles.orderSupplier}>{order.supplier}</span>
                    </div>
                    <div style={styles.orderQuantity}>
                      <span>{order.quantity} {item.unit}</span>
                    </div>
                    <div style={styles.orderCost}>
                      <span>{formatCurrency(order.cost)}</span>
                      <span style={styles.orderUnitCost}>
                        {formatCurrency(order.cost / order.quantity)}/{item.unit}
                      </span>
                    </div>
                    <div style={styles.orderDate}>
                      {formatDate(order.date)}
                    </div>
                    <span style={styles.orderStatus}>
                      <CheckCircle size={12} />
                      {order.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'usage' && (
            <>
              <div style={styles.card}>
                <div style={styles.cardHeader}>
                  <h3 style={styles.cardTitle}>Usage Analytics</h3>
                </div>
                <div style={styles.usageStats}>
                  <div style={styles.usageStat}>
                    <span style={styles.usageValue}>{item.usageRate}</span>
                    <span style={styles.usageLabel}>Daily Average</span>
                  </div>
                  <div style={styles.usageStat}>
                    <span style={styles.usageValue}>{item.usageRate * 7}</span>
                    <span style={styles.usageLabel}>Weekly Estimate</span>
                  </div>
                  <div style={styles.usageStat}>
                    <span style={styles.usageValue}>{item.monthlyUsage}</span>
                    <span style={styles.usageLabel}>Last 30 Days</span>
                  </div>
                </div>
              </div>

              <div style={styles.card}>
                <div style={styles.cardHeader}>
                  <h3 style={styles.cardTitle}>Usage Forecast</h3>
                </div>
                <div style={styles.forecastInfo}>
                  <p>At current usage rate of <strong>{item.usageRate} {item.unit}/day</strong>:</p>
                  <ul style={styles.forecastList}>
                    <li>Stock will run out in approximately <strong>{item.daysUntilEmpty} days</strong></li>
                    <li>Recommended reorder date: <strong>{formatDate(new Date(Date.now() + 1000 * 60 * 60 * 24 * (item.daysUntilEmpty - item.supplier.leadTime)))}</strong></li>
                    <li>Suggested order quantity: <strong>{item.reorderQuantity} {item.unit}</strong></li>
                  </ul>
                </div>
              </div>
            </>
          )}

          {activeTab === 'settings' && (
            <>
              <div style={styles.card}>
                <div style={styles.cardHeader}>
                  <h3 style={styles.cardTitle}>Auto-Reorder Settings</h3>
                </div>
                <div style={styles.settingsList}>
                  <div style={styles.settingItem}>
                    <div style={styles.settingInfo}>
                      <span style={styles.settingLabel}>Auto-Reorder</span>
                      <span style={styles.settingDesc}>Automatically create purchase orders when stock is low</span>
                    </div>
                    <label style={styles.toggle}>
                      <input type="checkbox" checked={item.autoReorder} onChange={() => {}} />
                      <span style={styles.toggleSlider}></span>
                    </label>
                  </div>
                  <div style={styles.settingItem}>
                    <div style={styles.settingInfo}>
                      <span style={styles.settingLabel}>Reorder Point</span>
                      <span style={styles.settingDesc}>Trigger reorder when stock falls below this level</span>
                    </div>
                    <input 
                      type="number" 
                      value={item.reorderPoint} 
                      style={styles.settingInput}
                      onChange={() => {}}
                    />
                  </div>
                  <div style={styles.settingItem}>
                    <div style={styles.settingInfo}>
                      <span style={styles.settingLabel}>Reorder Quantity</span>
                      <span style={styles.settingDesc}>Default quantity to order</span>
                    </div>
                    <input 
                      type="number" 
                      value={item.reorderQuantity} 
                      style={styles.settingInput}
                      onChange={() => {}}
                    />
                  </div>
                </div>
              </div>

              <div style={styles.card}>
                <div style={styles.cardHeader}>
                  <h3 style={styles.cardTitle}>Alert Settings</h3>
                </div>
                <div style={styles.settingsList}>
                  <div style={styles.settingItem}>
                    <div style={styles.settingInfo}>
                      <Bell size={16} />
                      <span style={styles.settingLabel}>Low Stock Alert</span>
                    </div>
                    <label style={styles.toggle}>
                      <input type="checkbox" checked={true} onChange={() => {}} />
                      <span style={styles.toggleSlider}></span>
                    </label>
                  </div>
                  <div style={styles.settingItem}>
                    <div style={styles.settingInfo}>
                      <Bell size={16} />
                      <span style={styles.settingLabel}>Expiration Alert</span>
                    </div>
                    <label style={styles.toggle}>
                      <input type="checkbox" checked={true} onChange={() => {}} />
                      <span style={styles.toggleSlider}></span>
                    </label>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Right Column */}
        <div style={styles.rightColumn}>
          {/* Supplier Card */}
          <div style={styles.card}>
            <div style={styles.cardHeader}>
              <h3 style={styles.cardTitle}>Primary Supplier</h3>
              <button style={styles.changeBtn}>Change</button>
            </div>
            <div style={styles.supplierInfo}>
              <div style={styles.supplierName}>
                <Truck size={18} color="#3b82f6" />
                <span>{item.supplier.name}</span>
              </div>
              <div style={styles.supplierDetails}>
                <div style={styles.supplierDetail}>
                  <span style={styles.detailLabel}>Contact</span>
                  <span>{item.supplier.contact}</span>
                </div>
                <div style={styles.supplierDetail}>
                  <span style={styles.detailLabel}>Phone</span>
                  <span>{item.supplier.phone}</span>
                </div>
                <div style={styles.supplierDetail}>
                  <span style={styles.detailLabel}>Lead Time</span>
                  <span>{item.supplier.leadTime} days</span>
                </div>
                <div style={styles.supplierDetail}>
                  <span style={styles.detailLabel}>Min Order</span>
                  <span>{item.supplier.minOrder} {item.unit}</span>
                </div>
                <div style={styles.supplierDetail}>
                  <span style={styles.detailLabel}>Delivery Days</span>
                  <span>{item.supplier.deliveryDays.join(', ')}</span>
                </div>
              </div>
              <button style={styles.orderFromSupplier}>
                <ShoppingCart size={14} />
                Order from {item.supplier.name}
              </button>
            </div>
          </div>

          {/* Price Comparison */}
          <div style={styles.card}>
            <div style={styles.cardHeader}>
              <h3 style={styles.cardTitle}>Price Comparison</h3>
              <Zap size={16} color="#8b5cf6" />
            </div>
            <div style={styles.priceList}>
              <div style={{...styles.priceItem, ...styles.priceItemBest}}>
                <div style={styles.priceSupplier}>
                  <span style={styles.bestBadge}>Best Price</span>
                  <span>Restaurant Depot</span>
                </div>
                <div style={styles.priceInfo}>
                  <span style={styles.priceValue}>{formatCurrency(4.25)}</span>
                  <span style={styles.priceNote}>Pickup only</span>
                </div>
              </div>
              <div style={styles.priceItem}>
                <div style={styles.priceSupplier}>
                  <span>{item.supplier.name}</span>
                  <span style={styles.currentTag}>Current</span>
                </div>
                <div style={styles.priceInfo}>
                  <span style={styles.priceValue}>{formatCurrency(item.costPerUnit)}</span>
                  <span style={styles.priceNote}>{item.supplier.leadTime}d delivery</span>
                </div>
              </div>
              <div style={styles.priceItem}>
                <div style={styles.priceSupplier}>
                  <span>US Foods</span>
                </div>
                <div style={styles.priceInfo}>
                  <span style={styles.priceValue}>{formatCurrency(4.65)}</span>
                  <span style={styles.priceNote}>3d delivery</span>
                </div>
              </div>
            </div>
          </div>

          {/* Expiration */}
          {item.expirationDate && (
            <div style={styles.card}>
              <div style={styles.cardHeader}>
                <h3 style={styles.cardTitle}>Expiration</h3>
              </div>
              <div style={styles.expirationInfo}>
                <Calendar size={24} color={item.expirationDate - new Date() < 1000 * 60 * 60 * 24 * 7 ? '#f97316' : '#22c55e'} />
                <div style={styles.expirationDetails}>
                  <span style={styles.expirationDate}>{formatDate(item.expirationDate)}</span>
                  <span style={styles.expirationDays}>
                    {Math.ceil((item.expirationDate - new Date()) / (1000 * 60 * 60 * 24))} days remaining
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Related Items */}
          <div style={styles.card}>
            <div style={styles.cardHeader}>
              <h3 style={styles.cardTitle}>Related Items</h3>
            </div>
            <div style={styles.relatedList}>
              {item.relatedItems.map(related => {
                const relatedStatus = getStatusConfig(related.status);
                return (
                  <div 
                    key={related.id} 
                    style={styles.relatedItem}
                    onClick={() => navigate(`/inventory/${related.id}`)}
                  >
                    <div style={styles.relatedInfo}>
                      <span style={styles.relatedName}>{related.name}</span>
                      <span style={{
                        ...styles.relatedStatus,
                        color: relatedStatus.color
                      }}>
                        {related.currentStock} in stock
                      </span>
                    </div>
                    <span style={{
                      ...styles.statusDot,
                      backgroundColor: relatedStatus.color
                    }} />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Item Details */}
          <div style={styles.card}>
            <div style={styles.cardHeader}>
              <h3 style={styles.cardTitle}>Item Details</h3>
            </div>
            <div style={styles.detailsList}>
              <div style={styles.detailRow}>
                <span style={styles.detailLabel}>SKU</span>
                <span style={styles.detailValue}>{item.sku}</span>
              </div>
              <div style={styles.detailRow}>
                <span style={styles.detailLabel}>Barcode</span>
                <span style={styles.detailValue}>{item.barcode}</span>
              </div>
              <div style={styles.detailRow}>
                <span style={styles.detailLabel}>Category</span>
                <span style={styles.detailValue}>{item.category}</span>
              </div>
              <div style={styles.detailRow}>
                <span style={styles.detailLabel}>Location</span>
                <span style={styles.detailValue}>{item.location}</span>
              </div>
              <div style={styles.detailRow}>
                <span style={styles.detailLabel}>Bin</span>
                <span style={styles.detailValue}>{item.bin}</span>
              </div>
              <div style={styles.detailRow}>
                <span style={styles.detailLabel}>Created</span>
                <span style={styles.detailValue}>{formatDate(item.createdAt)}</span>
              </div>
            </div>
          </div>
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
  errorContainer: {
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
  headerLeft: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '16px'
  },
  backButton: {
    padding: '10px',
    backgroundColor: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    borderRadius: '10px',
    color: 'var(--color-text)',
    cursor: 'pointer'
  },
  itemHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px'
  },
  itemIcon: {
    width: '56px',
    height: '56px',
    borderRadius: '14px',
    backgroundColor: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'var(--color-primary)'
  },
  itemHeaderInfo: {},
  nameRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    marginBottom: '8px'
  },
  itemName: {
    fontSize: '28px',
    fontWeight: 700,
    margin: 0
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
  itemMeta: {
    display: 'flex',
    gap: '12px',
    color: 'var(--color-text-muted)',
    fontSize: '14px'
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
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '16px',
    marginBottom: '24px'
  },
  statCard: {
    padding: '20px',
    backgroundColor: 'var(--color-surface)',
    borderRadius: '12px',
    border: '1px solid var(--color-border)'
  },
  statHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '12px'
  },
  statLabel: {
    fontSize: '13px',
    color: 'var(--color-text-muted)'
  },
  stockDisplay: {
    display: 'flex',
    alignItems: 'baseline',
    gap: '8px',
    marginBottom: '12px'
  },
  stockValue: {
    fontSize: '32px',
    fontWeight: 700
  },
  stockUnit: {
    fontSize: '16px',
    color: 'var(--color-text-muted)'
  },
  stockBarLarge: {
    height: '8px',
    backgroundColor: 'var(--color-surface-2)',
    borderRadius: '4px',
    overflow: 'hidden',
    marginBottom: '8px'
  },
  stockFillLarge: {
    height: '100%',
    borderRadius: '4px',
    transition: 'width 0.3s'
  },
  stockRange: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '12px',
    color: 'var(--color-text-muted)'
  },
  bigValue: {
    display: 'block',
    fontSize: '32px',
    fontWeight: 700,
    marginBottom: '8px'
  },
  statNote: {
    fontSize: '12px',
    color: 'var(--color-text-muted)'
  },
  costDisplay: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  costChange: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    fontSize: '13px',
    fontWeight: 600
  },
  aiSuggestion: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    padding: '20px 24px',
    backgroundColor: 'rgba(139, 92, 246, 0.1)',
    borderRadius: '16px',
    border: '1px solid rgba(139, 92, 246, 0.2)',
    marginBottom: '24px'
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
  tabs: {
    display: 'flex',
    gap: '8px',
    marginBottom: '24px',
    borderBottom: '1px solid var(--color-border)',
    paddingBottom: '16px'
  },
  tab: {
    padding: '10px 20px',
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: '8px',
    color: 'var(--color-text-muted)',
    fontSize: '14px',
    fontWeight: 500,
    cursor: 'pointer'
  },
  tabActive: {
    backgroundColor: 'var(--color-primary)',
    color: '#ffffff'
  },
  content: {
    display: 'grid',
    gridTemplateColumns: '1fr 360px',
    gap: '24px'
  },
  leftColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px'
  },
  rightColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px'
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
    fontSize: '16px',
    fontWeight: 600,
    margin: 0
  },
  viewAllBtn: {
    backgroundColor: 'transparent',
    border: 'none',
    color: 'var(--color-primary)',
    fontSize: '13px',
    cursor: 'pointer'
  },
  adjustmentForm: {
    padding: '24px'
  },
  adjustmentControls: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '16px',
    marginBottom: '20px'
  },
  adjustBtn: {
    width: '48px',
    height: '48px',
    borderRadius: '12px',
    backgroundColor: 'var(--color-surface-2)',
    border: '1px solid var(--color-border)',
    color: 'var(--color-text)',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  adjustInput: {
    width: '100px',
    padding: '16px',
    fontSize: '24px',
    fontWeight: 700,
    textAlign: 'center',
    backgroundColor: 'var(--color-surface-2)',
    border: '1px solid var(--color-border)',
    borderRadius: '12px',
    color: 'var(--color-text)',
    outline: 'none'
  },
  adjustActions: {
    display: 'flex',
    gap: '12px'
  },
  addStockBtn: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    padding: '14px',
    backgroundColor: '#22c55e',
    border: 'none',
    borderRadius: '10px',
    color: '#ffffff',
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer'
  },
  removeStockBtn: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    padding: '14px',
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    border: '1px solid rgba(239, 68, 68, 0.3)',
    borderRadius: '10px',
    color: '#ef4444',
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer'
  },
  activityList: {
    padding: '16px 24px'
  },
  activityItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    padding: '12px 0',
    borderBottom: '1px solid var(--color-border)'
  },
  activityIcon: {
    width: '36px',
    height: '36px',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  activityInfo: {
    flex: 1
  },
  activityTitle: {
    display: 'block',
    fontWeight: 600
  },
  activityNote: {
    display: 'block',
    fontSize: '12px',
    color: 'var(--color-text-muted)'
  },
  activityMeta: {
    textAlign: 'right',
    fontSize: '12px',
    color: 'var(--color-text-muted)'
  },
  chartContainer: {
    padding: '24px'
  },
  barChart: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: '150px',
    gap: '12px'
  },
  barGroup: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px',
    flex: 1
  },
  barValue: {
    fontSize: '12px',
    fontWeight: 600
  },
  barWrapper: {
    width: '100%',
    height: '100px',
    display: 'flex',
    alignItems: 'flex-end'
  },
  bar: {
    width: '100%',
    backgroundColor: 'var(--color-primary)',
    borderRadius: '4px 4px 0 0',
    transition: 'height 0.3s'
  },
  barLabel: {
    fontSize: '12px',
    color: 'var(--color-text-muted)'
  },
  newOrderBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '8px 16px',
    backgroundColor: 'var(--color-primary)',
    border: 'none',
    borderRadius: '8px',
    color: '#ffffff',
    fontSize: '13px',
    fontWeight: 600,
    cursor: 'pointer'
  },
  ordersList: {
    padding: '16px 24px'
  },
  orderRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    padding: '16px 0',
    borderBottom: '1px solid var(--color-border)'
  },
  orderIcon: {
    width: '36px',
    height: '36px',
    borderRadius: '10px',
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  orderInfo: {
    flex: 1
  },
  orderId: {
    display: 'block',
    fontWeight: 600,
    color: 'var(--color-primary)'
  },
  orderSupplier: {
    display: 'block',
    fontSize: '12px',
    color: 'var(--color-text-muted)'
  },
  orderQuantity: {
    fontSize: '14px'
  },
  orderCost: {
    textAlign: 'right'
  },
  orderUnitCost: {
    display: 'block',
    fontSize: '11px',
    color: 'var(--color-text-muted)'
  },
  orderDate: {
    fontSize: '13px',
    color: 'var(--color-text-muted)'
  },
  orderStatus: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '6px 12px',
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
    borderRadius: '16px',
    fontSize: '12px',
    fontWeight: 600,
    color: '#22c55e',
    textTransform: 'capitalize'
  },
  usageStats: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '16px',
    padding: '24px'
  },
  usageStat: {
    textAlign: 'center'
  },
  usageValue: {
    display: 'block',
    fontSize: '28px',
    fontWeight: 700
  },
  usageLabel: {
    fontSize: '12px',
    color: 'var(--color-text-muted)'
  },
  forecastInfo: {
    padding: '24px'
  },
  forecastList: {
    marginTop: '12px',
    paddingLeft: '20px',
    lineHeight: 2
  },
  settingsList: {
    padding: '16px 24px'
  },
  settingItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 0',
    borderBottom: '1px solid var(--color-border)'
  },
  settingInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  settingLabel: {
    fontWeight: 500
  },
  settingDesc: {
    display: 'block',
    fontSize: '12px',
    color: 'var(--color-text-muted)'
  },
  settingInput: {
    width: '80px',
    padding: '10px',
    backgroundColor: 'var(--color-surface-2)',
    border: '1px solid var(--color-border)',
    borderRadius: '8px',
    color: 'var(--color-text)',
    textAlign: 'center',
    fontSize: '14px',
    outline: 'none'
  },
  toggle: {
    position: 'relative',
    width: '48px',
    height: '24px'
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
  changeBtn: {
    backgroundColor: 'transparent',
    border: 'none',
    color: 'var(--color-primary)',
    fontSize: '13px',
    cursor: 'pointer'
  },
  supplierInfo: {
    padding: '20px 24px'
  },
  supplierName: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    fontSize: '18px',
    fontWeight: 600,
    marginBottom: '16px'
  },
  supplierDetails: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    marginBottom: '20px'
  },
  supplierDetail: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  detailLabel: {
    fontSize: '13px',
    color: 'var(--color-text-muted)'
  },
  orderFromSupplier: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    width: '100%',
    padding: '14px',
    backgroundColor: 'var(--color-primary)',
    border: 'none',
    borderRadius: '10px',
    color: '#ffffff',
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer'
  },
  priceList: {
    padding: '16px 24px'
  },
  priceItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '14px 0',
    borderBottom: '1px solid var(--color-border)'
  },
  priceItemBest: {
    backgroundColor: 'rgba(34, 197, 94, 0.05)',
    margin: '0 -24px',
    padding: '14px 24px',
    borderBottom: '1px solid var(--color-border)'
  },
  priceSupplier: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px'
  },
  bestBadge: {
    fontSize: '10px',
    color: '#22c55e',
    fontWeight: 600,
    textTransform: 'uppercase'
  },
  currentTag: {
    fontSize: '10px',
    color: 'var(--color-primary)',
    fontWeight: 600
  },
  priceInfo: {
    textAlign: 'right'
  },
  priceValue: {
    display: 'block',
    fontSize: '16px',
    fontWeight: 700
  },
  priceNote: {
    fontSize: '11px',
    color: 'var(--color-text-muted)'
  },
  expirationInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    padding: '20px 24px'
  },
  expirationDetails: {},
  expirationDate: {
    display: 'block',
    fontSize: '18px',
    fontWeight: 600
  },
  expirationDays: {
    fontSize: '13px',
    color: 'var(--color-text-muted)'
  },
  relatedList: {
    padding: '16px 24px'
  },
  relatedItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 0',
    borderBottom: '1px solid var(--color-border)',
    cursor: 'pointer'
  },
  relatedInfo: {},
  relatedName: {
    display: 'block',
    fontWeight: 500
  },
  relatedStatus: {
    fontSize: '12px'
  },
  statusDot: {
    width: '10px',
    height: '10px',
    borderRadius: '50%'
  },
  detailsList: {
    padding: '20px 24px'
  },
  detailRow: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px 0',
    borderBottom: '1px solid var(--color-border)'
  },
  detailValue: {
    fontWeight: 500
  }
};

export default InventoryDetail;