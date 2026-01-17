/**
 * ProductInventory
 * 
 * Product-level inventory management:
 * - Stock levels by location
 * - Inventory adjustments
 * - Stock transfers
 * - Reorder management
 * - Inventory history
 * - Bulk updates
 */

import React, { useState, useEffect } from 'react';
import {
  Package,
  Search,
  Filter,
  Download,
  Upload,
  Plus,
  Minus,
  Edit,
  Save,
  X,
  Check,
  AlertTriangle,
  AlertCircle,
  CheckCircle,
  Clock,
  TrendingUp,
  TrendingDown,
  ArrowRight,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw,
  MapPin,
  Truck,
  Box,
  BarChart3,
  History,
  Settings,
  MoreHorizontal,
  ChevronDown,
  ChevronRight,
  Eye,
  Layers,
  Hash,
  Calendar,
  User,
  FileText,
  Clipboard,
  Send,
  RotateCcw,
  ShoppingCart,
  DollarSign,
  Percent
} from 'lucide-react';

export function ProductInventory() {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [locations, setLocations] = useState([]);
  const [adjustments, setAdjustments] = useState([]);
  const [stats, setStats] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [showAdjustModal, setShowAdjustModal] = useState(false);
  const [adjustingProduct, setAdjustingProduct] = useState(null);
  const [showTransferModal, setShowTransferModal] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setStats({
        totalProducts: 156,
        totalUnits: 4823,
        totalValue: 142580,
        lowStock: 12,
        outOfStock: 3,
        overstock: 8,
        turnoverRate: 4.2,
        avgDaysToSell: 18
      });

      setLocations([
        { id: 1, name: 'Main Warehouse', code: 'WH-01', type: 'warehouse' },
        { id: 2, name: 'Store Front', code: 'SF-01', type: 'retail' },
        { id: 3, name: 'Overflow Storage', code: 'WH-02', type: 'warehouse' }
      ]);

      setProducts([
        {
          id: 1,
          name: 'Premium Card Binder - Blue',
          sku: 'PCB-BLU-001',
          image: null,
          category: 'Binders',
          price: 49.99,
          cost: 22.50,
          totalStock: 145,
          committed: 12,
          available: 133,
          incoming: 50,
          reorderPoint: 25,
          reorderQty: 100,
          status: 'in_stock',
          stockByLocation: [
            { locationId: 1, qty: 120, bin: 'A1-01' },
            { locationId: 2, qty: 25, bin: 'D1' }
          ],
          lastReceived: '2024-01-10',
          lastSold: '2024-01-15',
          velocity: 'fast'
        },
        {
          id: 2,
          name: 'Card Sleeves 100-Pack',
          sku: 'CS-100-STD',
          image: null,
          category: 'Sleeves',
          price: 8.99,
          cost: 3.25,
          totalStock: 580,
          committed: 45,
          available: 535,
          incoming: 0,
          reorderPoint: 100,
          reorderQty: 500,
          status: 'in_stock',
          stockByLocation: [
            { locationId: 1, qty: 500, bin: 'B2-15' },
            { locationId: 2, qty: 80, bin: 'S2' }
          ],
          lastReceived: '2024-01-05',
          lastSold: '2024-01-15',
          velocity: 'fast'
        },
        {
          id: 3,
          name: 'Top Loaders 25-Pack',
          sku: 'TL-025-REG',
          image: null,
          category: 'Protection',
          price: 12.99,
          cost: 5.50,
          totalStock: 22,
          committed: 8,
          available: 14,
          incoming: 200,
          reorderPoint: 50,
          reorderQty: 200,
          status: 'low_stock',
          stockByLocation: [
            { locationId: 1, qty: 15, bin: 'B2-18' },
            { locationId: 2, qty: 7, bin: 'S3' }
          ],
          lastReceived: '2023-12-20',
          lastSold: '2024-01-15',
          velocity: 'fast'
        },
        {
          id: 4,
          name: 'Graded Card Display Case',
          sku: 'GCDC-001',
          image: null,
          category: 'Display',
          price: 89.99,
          cost: 42.00,
          totalStock: 0,
          committed: 0,
          available: 0,
          incoming: 30,
          reorderPoint: 10,
          reorderQty: 30,
          status: 'out_of_stock',
          stockByLocation: [],
          lastReceived: '2023-11-15',
          lastSold: '2024-01-12',
          velocity: 'medium'
        },
        {
          id: 5,
          name: 'Magnetic Card Holder 5-Pack',
          sku: 'MCH-005',
          image: null,
          category: 'Protection',
          price: 34.99,
          cost: 15.00,
          totalStock: 67,
          committed: 5,
          available: 62,
          incoming: 0,
          reorderPoint: 20,
          reorderQty: 50,
          status: 'in_stock',
          stockByLocation: [
            { locationId: 1, qty: 50, bin: 'B3-01' },
            { locationId: 2, qty: 17, bin: 'S4' }
          ],
          lastReceived: '2024-01-08',
          lastSold: '2024-01-14',
          velocity: 'medium'
        },
        {
          id: 6,
          name: 'Card Storage Box 3200ct',
          sku: 'CSB-3200',
          image: null,
          category: 'Storage',
          price: 24.99,
          cost: 10.00,
          totalStock: 8,
          committed: 2,
          available: 6,
          incoming: 0,
          reorderPoint: 15,
          reorderQty: 40,
          status: 'low_stock',
          stockByLocation: [
            { locationId: 1, qty: 8, bin: 'D1-05' }
          ],
          lastReceived: '2023-12-28',
          lastSold: '2024-01-15',
          velocity: 'slow'
        },
        {
          id: 7,
          name: 'UV Protected Frame - Large',
          sku: 'UVF-LG-001',
          image: null,
          category: 'Display',
          price: 129.99,
          cost: 58.00,
          totalStock: 45,
          committed: 3,
          available: 42,
          incoming: 0,
          reorderPoint: 8,
          reorderQty: 20,
          status: 'in_stock',
          stockByLocation: [
            { locationId: 1, qty: 40, bin: 'E2-12' },
            { locationId: 2, qty: 5, bin: 'D2' }
          ],
          lastReceived: '2024-01-02',
          lastSold: '2024-01-13',
          velocity: 'slow'
        },
        {
          id: 8,
          name: 'Premium Sleeves 200-Pack',
          sku: 'PS-200-PRO',
          image: null,
          category: 'Sleeves',
          price: 18.99,
          cost: 7.50,
          totalStock: 312,
          committed: 28,
          available: 284,
          incoming: 0,
          reorderPoint: 75,
          reorderQty: 300,
          status: 'overstock',
          stockByLocation: [
            { locationId: 1, qty: 250, bin: 'B2-20' },
            { locationId: 2, qty: 42, bin: 'S2' },
            { locationId: 3, qty: 20, bin: 'O1-05' }
          ],
          lastReceived: '2024-01-12',
          lastSold: '2024-01-14',
          velocity: 'medium'
        }
      ]);

      setAdjustments([
        {
          id: 1,
          productId: 1,
          productName: 'Premium Card Binder - Blue',
          sku: 'PCB-BLU-001',
          type: 'received',
          quantity: 50,
          previousQty: 95,
          newQty: 145,
          location: 'Main Warehouse',
          reason: 'Purchase Order #PO-2024-015',
          user: 'John D.',
          date: '2024-01-15T10:30:00'
        },
        {
          id: 2,
          productId: 3,
          productName: 'Top Loaders 25-Pack',
          sku: 'TL-025-REG',
          type: 'sold',
          quantity: -15,
          previousQty: 37,
          newQty: 22,
          location: 'Store Front',
          reason: 'Orders #ORD-2024-089, #ORD-2024-090',
          user: 'System',
          date: '2024-01-15T09:15:00'
        },
        {
          id: 3,
          productId: 6,
          productName: 'Card Storage Box 3200ct',
          sku: 'CSB-3200',
          type: 'adjustment',
          quantity: -2,
          previousQty: 10,
          newQty: 8,
          location: 'Main Warehouse',
          reason: 'Damaged inventory - water damage',
          user: 'Sarah M.',
          date: '2024-01-14T16:45:00'
        },
        {
          id: 4,
          productId: 2,
          productName: 'Card Sleeves 100-Pack',
          sku: 'CS-100-STD',
          type: 'transfer',
          quantity: 80,
          previousQty: 0,
          newQty: 80,
          location: 'Store Front',
          fromLocation: 'Main Warehouse',
          reason: 'Restock retail location',
          user: 'John D.',
          date: '2024-01-14T14:00:00'
        },
        {
          id: 5,
          productId: 5,
          productName: 'Magnetic Card Holder 5-Pack',
          sku: 'MCH-005',
          type: 'count',
          quantity: 3,
          previousQty: 64,
          newQty: 67,
          location: 'Main Warehouse',
          reason: 'Cycle count correction',
          user: 'Mike R.',
          date: '2024-01-13T11:30:00'
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

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  const formatDateTime = (dateStr) => {
    return new Date(dateStr).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    });
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'in_stock':
        return { bg: 'rgba(34, 197, 94, 0.1)', color: '#22c55e', label: 'In Stock' };
      case 'low_stock':
        return { bg: 'rgba(249, 115, 22, 0.1)', color: '#f97316', label: 'Low Stock' };
      case 'out_of_stock':
        return { bg: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', label: 'Out of Stock' };
      case 'overstock':
        return { bg: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6', label: 'Overstock' };
      default:
        return { bg: 'rgba(107, 114, 128, 0.1)', color: '#6b7280', label: status };
    }
  };

  const getVelocityStyle = (velocity) => {
    switch (velocity) {
      case 'fast':
        return { color: '#22c55e', icon: <TrendingUp size={12} /> };
      case 'medium':
        return { color: '#f59e0b', icon: <ArrowRight size={12} /> };
      case 'slow':
        return { color: '#ef4444', icon: <TrendingDown size={12} /> };
      default:
        return { color: '#6b7280', icon: null };
    }
  };

  const getAdjustmentStyle = (type) => {
    switch (type) {
      case 'received':
        return { bg: 'rgba(34, 197, 94, 0.1)', color: '#22c55e', icon: <Plus size={14} /> };
      case 'sold':
        return { bg: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6', icon: <ShoppingCart size={14} /> };
      case 'adjustment':
        return { bg: 'rgba(249, 115, 22, 0.1)', color: '#f97316', icon: <Edit size={14} /> };
      case 'transfer':
        return { bg: 'rgba(139, 92, 246, 0.1)', color: '#8b5cf6', icon: <ArrowRight size={14} /> };
      case 'count':
        return { bg: 'rgba(20, 184, 166, 0.1)', color: '#14b8a6', icon: <Clipboard size={14} /> };
      default:
        return { bg: 'rgba(107, 114, 128, 0.1)', color: '#6b7280', icon: <Box size={14} /> };
    }
  };

  const getLocationName = (locationId) => {
    const location = locations.find(l => l.id === locationId);
    return location ? location.name : 'Unknown';
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.sku.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectProduct = (productId) => {
    setSelectedProducts(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const handleSelectAll = () => {
    if (selectedProducts.length === filteredProducts.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(filteredProducts.map(p => p.id));
    }
  };

  const openAdjustModal = (product) => {
    setAdjustingProduct(product);
    setShowAdjustModal(true);
  };

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <Package size={48} style={{ opacity: 0.5 }} />
        <p>Loading inventory...</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <h1 style={styles.title}>Product Inventory</h1>
          <p style={styles.subtitle}>Manage stock levels and track inventory</p>
        </div>
        <div style={styles.headerRight}>
          <button style={styles.secondaryBtn}>
            <Download size={16} />
            Export
          </button>
          <button style={styles.secondaryBtn}>
            <Upload size={16} />
            Import
          </button>
          <button style={styles.primaryBtn} onClick={() => setShowAdjustModal(true)}>
            <Plus size={18} />
            Add Stock
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div style={styles.statsGrid}>
        <div style={styles.statCard}>
          <div style={{...styles.statIcon, backgroundColor: 'rgba(59, 130, 246, 0.1)'}}>
            <Package size={20} color="#3b82f6" />
          </div>
          <div style={styles.statInfo}>
            <span style={styles.statValue}>{formatNumber(stats.totalProducts)}</span>
            <span style={styles.statLabel}>Total Products</span>
          </div>
        </div>

        <div style={styles.statCard}>
          <div style={{...styles.statIcon, backgroundColor: 'rgba(139, 92, 246, 0.1)'}}>
            <Layers size={20} color="#8b5cf6" />
          </div>
          <div style={styles.statInfo}>
            <span style={styles.statValue}>{formatNumber(stats.totalUnits)}</span>
            <span style={styles.statLabel}>Total Units</span>
          </div>
        </div>

        <div style={styles.statCard}>
          <div style={{...styles.statIcon, backgroundColor: 'rgba(34, 197, 94, 0.1)'}}>
            <DollarSign size={20} color="#22c55e" />
          </div>
          <div style={styles.statInfo}>
            <span style={styles.statValue}>{formatCurrency(stats.totalValue)}</span>
            <span style={styles.statLabel}>Inventory Value</span>
          </div>
        </div>

        <div style={styles.statCard}>
          <div style={{...styles.statIcon, backgroundColor: 'rgba(249, 115, 22, 0.1)'}}>
            <AlertTriangle size={20} color="#f97316" />
          </div>
          <div style={styles.statInfo}>
            <span style={styles.statValue}>{stats.lowStock}</span>
            <span style={styles.statLabel}>Low Stock</span>
          </div>
        </div>

        <div style={styles.statCard}>
          <div style={{...styles.statIcon, backgroundColor: 'rgba(239, 68, 68, 0.1)'}}>
            <AlertCircle size={20} color="#ef4444" />
          </div>
          <div style={styles.statInfo}>
            <span style={styles.statValue}>{stats.outOfStock}</span>
            <span style={styles.statLabel}>Out of Stock</span>
          </div>
        </div>

        <div style={styles.statCard}>
          <div style={{...styles.statIcon, backgroundColor: 'rgba(20, 184, 166, 0.1)'}}>
            <RefreshCw size={20} color="#14b8a6" />
          </div>
          <div style={styles.statInfo}>
            <span style={styles.statValue}>{stats.turnoverRate}x</span>
            <span style={styles.statLabel}>Turnover Rate</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={styles.tabs}>
        {[
          { id: 'overview', label: 'Stock Levels', icon: Package },
          { id: 'locations', label: 'By Location', icon: MapPin },
          { id: 'history', label: 'History', icon: History },
          { id: 'reorder', label: 'Reorder', icon: RefreshCw }
        ].map(tab => {
          const TabIcon = tab.icon;
          return (
            <button
              key={tab.id}
              style={{
                ...styles.tab,
                ...(activeTab === tab.id ? styles.tabActive : {})
              }}
              onClick={() => setActiveTab(tab.id)}
            >
              <TabIcon size={16} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <>
          {/* Toolbar */}
          <div style={styles.toolbar}>
            <div style={styles.toolbarLeft}>
              <div style={styles.searchBox}>
                <Search size={18} color="var(--color-text-muted)" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={styles.searchInput}
                />
              </div>
              <button style={styles.filterBtn}>
                <Filter size={16} />
                Filter
              </button>
            </div>
            {selectedProducts.length > 0 && (
              <div style={styles.bulkActions}>
                <span style={styles.selectedCount}>{selectedProducts.length} selected</span>
                <button style={styles.bulkBtn}>
                  <Plus size={14} />
                  Add Stock
                </button>
                <button style={styles.bulkBtn}>
                  <ArrowRight size={14} />
                  Transfer
                </button>
                <button style={styles.bulkBtn}>
                  <Clipboard size={14} />
                  Count
                </button>
              </div>
            )}
          </div>

          {/* Products Table */}
          <div style={styles.tableWrapper}>
            <table style={styles.table}>
              <thead>
                <tr style={styles.tableHeader}>
                  <th style={styles.thCheckbox}>
                    <input
                      type="checkbox"
                      checked={selectedProducts.length === filteredProducts.length && filteredProducts.length > 0}
                      onChange={handleSelectAll}
                      style={styles.checkbox}
                    />
                  </th>
                  <th style={styles.th}>Product</th>
                  <th style={styles.th}>SKU</th>
                  <th style={styles.thRight}>On Hand</th>
                  <th style={styles.thRight}>Committed</th>
                  <th style={styles.thRight}>Available</th>
                  <th style={styles.thRight}>Incoming</th>
                  <th style={styles.th}>Status</th>
                  <th style={styles.th}>Velocity</th>
                  <th style={styles.thActions}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => {
                  const statusStyle = getStatusStyle(product.status);
                  const velocityStyle = getVelocityStyle(product.velocity);
                  const isSelected = selectedProducts.includes(product.id);
                  const needsReorder = product.available <= product.reorderPoint;

                  return (
                    <tr
                      key={product.id}
                      style={{
                        ...styles.tr,
                        ...(isSelected ? styles.trSelected : {})
                      }}
                    >
                      <td style={styles.tdCheckbox}>
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => handleSelectProduct(product.id)}
                          style={styles.checkbox}
                        />
                      </td>
                      <td style={styles.td}>
                        <div style={styles.productCell}>
                          <div style={styles.productImage}>
                            <Package size={20} color="var(--color-text-muted)" />
                          </div>
                          <div style={styles.productInfo}>
                            <span style={styles.productName}>{product.name}</span>
                            <span style={styles.productCategory}>{product.category}</span>
                          </div>
                        </div>
                      </td>
                      <td style={styles.td}>
                        <span style={styles.sku}>{product.sku}</span>
                      </td>
                      <td style={styles.tdRight}>
                        <span style={styles.stockQty}>{formatNumber(product.totalStock)}</span>
                      </td>
                      <td style={styles.tdRight}>
                        <span style={styles.committedQty}>{formatNumber(product.committed)}</span>
                      </td>
                      <td style={styles.tdRight}>
                        <span style={{
                          ...styles.availableQty,
                          color: product.available <= 0 ? '#ef4444' :
                            needsReorder ? '#f97316' : 'inherit'
                        }}>
                          {formatNumber(product.available)}
                        </span>
                      </td>
                      <td style={styles.tdRight}>
                        {product.incoming > 0 ? (
                          <span style={styles.incomingQty}>
                            <Truck size={12} />
                            {formatNumber(product.incoming)}
                          </span>
                        ) : (
                          <span style={styles.noIncoming}>—</span>
                        )}
                      </td>
                      <td style={styles.td}>
                        <span style={{
                          ...styles.statusBadge,
                          backgroundColor: statusStyle.bg,
                          color: statusStyle.color
                        }}>
                          {statusStyle.label}
                        </span>
                      </td>
                      <td style={styles.td}>
                        <span style={{
                          ...styles.velocityBadge,
                          color: velocityStyle.color
                        }}>
                          {velocityStyle.icon}
                          {product.velocity}
                        </span>
                      </td>
                      <td style={styles.tdActions}>
                        <div style={styles.actions}>
                          <button
                            style={styles.actionBtn}
                            title="Adjust Stock"
                            onClick={() => openAdjustModal(product)}
                          >
                            <Edit size={16} />
                          </button>
                          <button style={styles.actionBtn} title="Transfer">
                            <ArrowRight size={16} />
                          </button>
                          <button style={styles.actionBtn} title="History">
                            <History size={16} />
                          </button>
                          <button style={styles.actionBtn} title="More">
                            <MoreHorizontal size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* Locations Tab */}
      {activeTab === 'locations' && (
        <div style={styles.locationsGrid}>
          {locations.map((location) => {
            const locationProducts = products.filter(p =>
              p.stockByLocation.some(s => s.locationId === location.id)
            );
            const totalUnits = locationProducts.reduce((sum, p) => {
              const stock = p.stockByLocation.find(s => s.locationId === location.id);
              return sum + (stock?.qty || 0);
            }, 0);

            return (
              <div key={location.id} style={styles.locationCard}>
                <div style={styles.locationHeader}>
                  <div style={styles.locationIcon}>
                    <MapPin size={20} />
                  </div>
                  <div style={styles.locationInfo}>
                    <span style={styles.locationName}>{location.name}</span>
                    <span style={styles.locationCode}>{location.code}</span>
                  </div>
                  <button style={styles.iconBtn}>
                    <MoreHorizontal size={16} />
                  </button>
                </div>
                <div style={styles.locationStats}>
                  <div style={styles.locationStat}>
                    <span style={styles.locationStatValue}>{locationProducts.length}</span>
                    <span style={styles.locationStatLabel}>Products</span>
                  </div>
                  <div style={styles.locationStat}>
                    <span style={styles.locationStatValue}>{formatNumber(totalUnits)}</span>
                    <span style={styles.locationStatLabel}>Units</span>
                  </div>
                </div>
                <div style={styles.locationProducts}>
                  {locationProducts.slice(0, 5).map((product) => {
                    const stock = product.stockByLocation.find(s => s.locationId === location.id);
                    return (
                      <div key={product.id} style={styles.locationProductRow}>
                        <span style={styles.locationProductName}>{product.name}</span>
                        <span style={styles.locationProductQty}>{stock?.qty}</span>
                        <span style={styles.locationProductBin}>{stock?.bin}</span>
                      </div>
                    );
                  })}
                  {locationProducts.length > 5 && (
                    <button style={styles.viewAllBtn}>
                      View all {locationProducts.length} products
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* History Tab */}
      {activeTab === 'history' && (
        <div style={styles.historyList}>
          {adjustments.map((adj) => {
            const adjStyle = getAdjustmentStyle(adj.type);
            return (
              <div key={adj.id} style={styles.historyCard}>
                <div style={{
                  ...styles.historyIcon,
                  backgroundColor: adjStyle.bg,
                  color: adjStyle.color
                }}>
                  {adjStyle.icon}
                </div>
                <div style={styles.historyMain}>
                  <div style={styles.historyHeader}>
                    <span style={styles.historyProduct}>{adj.productName}</span>
                    <span style={styles.historySku}>{adj.sku}</span>
                  </div>
                  <div style={styles.historyDetails}>
                    <span style={styles.historyType}>{adj.type}</span>
                    <span style={styles.historyLocation}>
                      <MapPin size={12} />
                      {adj.location}
                      {adj.fromLocation && (
                        <span> ← {adj.fromLocation}</span>
                      )}
                    </span>
                  </div>
                  <p style={styles.historyReason}>{adj.reason}</p>
                </div>
                <div style={styles.historyRight}>
                  <span style={{
                    ...styles.historyQtyChange,
                    color: adj.quantity > 0 ? '#22c55e' : adj.quantity < 0 ? '#ef4444' : '#6b7280'
                  }}>
                    {adj.quantity > 0 ? '+' : ''}{adj.quantity}
                  </span>
                  <span style={styles.historyQtyResult}>
                    {adj.previousQty} → {adj.newQty}
                  </span>
                  <div style={styles.historyMeta}>
                    <span><User size={12} /> {adj.user}</span>
                    <span><Calendar size={12} /> {formatDateTime(adj.date)}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Reorder Tab */}
      {activeTab === 'reorder' && (
        <div style={styles.reorderSection}>
          <div style={styles.reorderHeader}>
            <h3 style={styles.reorderTitle}>Products Needing Reorder</h3>
            <button style={styles.primaryBtn}>
              <Send size={16} />
              Create Purchase Order
            </button>
          </div>
          <div style={styles.reorderList}>
            {products.filter(p => p.available <= p.reorderPoint).map((product) => {
              const statusStyle = getStatusStyle(product.status);
              return (
                <div key={product.id} style={styles.reorderCard}>
                  <div style={styles.reorderProduct}>
                    <div style={styles.productImage}>
                      <Package size={20} color="var(--color-text-muted)" />
                    </div>
                    <div style={styles.productInfo}>
                      <span style={styles.productName}>{product.name}</span>
                      <span style={styles.sku}>{product.sku}</span>
                    </div>
                  </div>
                  <div style={styles.reorderStats}>
                    <div style={styles.reorderStat}>
                      <span style={styles.reorderStatLabel}>Available</span>
                      <span style={{
                        ...styles.reorderStatValue,
                        color: product.available <= 0 ? '#ef4444' : '#f97316'
                      }}>
                        {product.available}
                      </span>
                    </div>
                    <div style={styles.reorderStat}>
                      <span style={styles.reorderStatLabel}>Reorder Point</span>
                      <span style={styles.reorderStatValue}>{product.reorderPoint}</span>
                    </div>
                    <div style={styles.reorderStat}>
                      <span style={styles.reorderStatLabel}>Suggested Qty</span>
                      <span style={styles.reorderStatValue}>{product.reorderQty}</span>
                    </div>
                    <div style={styles.reorderStat}>
                      <span style={styles.reorderStatLabel}>Incoming</span>
                      <span style={{
                        ...styles.reorderStatValue,
                        color: product.incoming > 0 ? '#22c55e' : 'inherit'
                      }}>
                        {product.incoming > 0 ? product.incoming : '—'}
                      </span>
                    </div>
                  </div>
                  <div style={styles.reorderActions}>
                    <input
                      type="number"
                      defaultValue={product.reorderQty}
                      style={styles.reorderInput}
                    />
                    <button style={styles.addToOrderBtn}>
                      <Plus size={14} />
                      Add to Order
                    </button>
                  </div>
                </div>
              );
            })}
            {products.filter(p => p.available <= p.reorderPoint).length === 0 && (
              <div style={styles.emptyState}>
                <CheckCircle size={48} color="#22c55e" />
                <h3>All stocked up!</h3>
                <p>No products currently need reordering</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Adjust Stock Modal */}
      {showAdjustModal && (
        <div style={styles.modalOverlay} onClick={() => setShowAdjustModal(false)}>
          <div style={styles.modal} onClick={e => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>Adjust Stock</h2>
              <button style={styles.modalClose} onClick={() => setShowAdjustModal(false)}>
                <X size={20} />
              </button>
            </div>
            <div style={styles.modalBody}>
              {adjustingProduct && (
                <div style={styles.adjustProduct}>
                  <span style={styles.adjustProductName}>{adjustingProduct.name}</span>
                  <span style={styles.adjustProductSku}>{adjustingProduct.sku}</span>
                  <span style={styles.adjustProductStock}>
                    Current stock: {adjustingProduct.totalStock}
                  </span>
                </div>
              )}

              <div style={styles.formGroup}>
                <label style={styles.formLabel}>Adjustment Type</label>
                <div style={styles.adjustTypeGrid}>
                  <button style={styles.adjustTypeBtn}>
                    <Plus size={18} />
                    Add Stock
                  </button>
                  <button style={styles.adjustTypeBtn}>
                    <Minus size={18} />
                    Remove Stock
                  </button>
                  <button style={styles.adjustTypeBtn}>
                    <Hash size={18} />
                    Set Quantity
                  </button>
                </div>
              </div>

              <div style={styles.formRow}>
                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>Quantity</label>
                  <input type="number" placeholder="0" style={styles.formInput} />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>Location</label>
                  <select style={styles.formSelect}>
                    {locations.map(loc => (
                      <option key={loc.id} value={loc.id}>{loc.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.formLabel}>Reason</label>
                <select style={styles.formSelect}>
                  <option value="">Select a reason...</option>
                  <option value="received">Stock Received</option>
                  <option value="damaged">Damaged</option>
                  <option value="lost">Lost/Stolen</option>
                  <option value="returned">Customer Return</option>
                  <option value="correction">Count Correction</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.formLabel}>Notes (optional)</label>
                <textarea
                  placeholder="Add any additional notes..."
                  rows={3}
                  style={styles.formTextarea}
                />
              </div>
            </div>
            <div style={styles.modalFooter}>
              <button style={styles.secondaryBtn} onClick={() => setShowAdjustModal(false)}>
                Cancel
              </button>
              <button style={styles.primaryBtn}>
                <Check size={16} />
                Save Adjustment
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
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(6, 1fr)',
    gap: '16px',
    marginBottom: '24px'
  },
  statCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    padding: '18px',
    backgroundColor: 'var(--color-surface)',
    borderRadius: '14px',
    border: '1px solid var(--color-border)'
  },
  statIcon: {
    width: '44px',
    height: '44px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  statInfo: {
    display: 'flex',
    flexDirection: 'column'
  },
  statValue: {
    fontSize: '20px',
    fontWeight: 700
  },
  statLabel: {
    fontSize: '12px',
    color: 'var(--color-text-muted)'
  },
  tabs: {
    display: 'flex',
    gap: '4px',
    marginBottom: '20px'
  },
  tab: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 20px',
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: '10px',
    color: 'var(--color-text-muted)',
    fontSize: '14px',
    fontWeight: 500,
    cursor: 'pointer'
  },
  tabActive: {
    backgroundColor: 'var(--color-surface)',
    color: 'var(--color-text)'
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px'
  },
  toolbarLeft: {
    display: 'flex',
    gap: '12px'
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
    padding: '8px 14px',
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
    textTransform: 'uppercase'
  },
  thRight: {
    padding: '14px 16px',
    textAlign: 'right',
    fontSize: '12px',
    fontWeight: 600,
    color: 'var(--color-text-muted)',
    textTransform: 'uppercase'
  },
  thCheckbox: {
    padding: '14px 16px',
    width: '40px'
  },
  thActions: {
    padding: '14px 16px',
    width: '140px'
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
  tdRight: {
    padding: '16px',
    fontSize: '14px',
    textAlign: 'right'
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
  productCell: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  productImage: {
    width: '40px',
    height: '40px',
    backgroundColor: 'var(--color-surface-2)',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  productInfo: {
    display: 'flex',
    flexDirection: 'column'
  },
  productName: {
    fontWeight: 500,
    marginBottom: '2px'
  },
  productCategory: {
    fontSize: '12px',
    color: 'var(--color-text-muted)'
  },
  sku: {
    fontFamily: 'monospace',
    fontSize: '13px',
    color: 'var(--color-text-muted)'
  },
  stockQty: {
    fontWeight: 600
  },
  committedQty: {
    color: 'var(--color-text-muted)'
  },
  availableQty: {
    fontWeight: 600
  },
  incomingQty: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    color: '#22c55e'
  },
  noIncoming: {
    color: 'var(--color-text-muted)'
  },
  statusBadge: {
    display: 'inline-flex',
    padding: '4px 10px',
    borderRadius: '6px',
    fontSize: '12px',
    fontWeight: 600
  },
  velocityBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    fontSize: '12px',
    fontWeight: 500,
    textTransform: 'capitalize'
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
  locationsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '20px'
  },
  locationCard: {
    backgroundColor: 'var(--color-surface)',
    borderRadius: '16px',
    border: '1px solid var(--color-border)',
    overflow: 'hidden'
  },
  locationHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '20px',
    borderBottom: '1px solid var(--color-border)'
  },
  locationIcon: {
    width: '44px',
    height: '44px',
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#3b82f6'
  },
  locationInfo: {
    flex: 1
  },
  locationName: {
    display: 'block',
    fontWeight: 600,
    marginBottom: '2px'
  },
  locationCode: {
    fontSize: '12px',
    color: 'var(--color-text-muted)'
  },
  iconBtn: {
    padding: '8px',
    backgroundColor: 'transparent',
    border: 'none',
    color: 'var(--color-text-muted)',
    cursor: 'pointer',
    borderRadius: '8px'
  },
  locationStats: {
    display: 'flex',
    borderBottom: '1px solid var(--color-border)'
  },
  locationStat: {
    flex: 1,
    padding: '16px',
    textAlign: 'center',
    borderRight: '1px solid var(--color-border)'
  },
  locationStatValue: {
    display: 'block',
    fontSize: '20px',
    fontWeight: 700,
    marginBottom: '4px'
  },
  locationStatLabel: {
    fontSize: '12px',
    color: 'var(--color-text-muted)'
  },
  locationProducts: {
    padding: '16px'
  },
  locationProductRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '10px 0',
    borderBottom: '1px solid var(--color-border)',
    fontSize: '13px'
  },
  locationProductName: {
    flex: 1,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  locationProductQty: {
    fontWeight: 600,
    minWidth: '40px',
    textAlign: 'right'
  },
  locationProductBin: {
    padding: '2px 8px',
    backgroundColor: 'var(--color-surface-2)',
    borderRadius: '4px',
    fontSize: '11px',
    fontWeight: 600,
    color: 'var(--color-primary)'
  },
  viewAllBtn: {
    width: '100%',
    padding: '10px',
    marginTop: '12px',
    backgroundColor: 'var(--color-surface-2)',
    border: 'none',
    borderRadius: '8px',
    color: 'var(--color-primary)',
    fontSize: '13px',
    cursor: 'pointer'
  },
  historyList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  historyCard: {
    display: 'flex',
    gap: '16px',
    padding: '20px',
    backgroundColor: 'var(--color-surface)',
    borderRadius: '12px',
    border: '1px solid var(--color-border)'
  },
  historyIcon: {
    width: '40px',
    height: '40px',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0
  },
  historyMain: {
    flex: 1
  },
  historyHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '6px'
  },
  historyProduct: {
    fontWeight: 600
  },
  historySku: {
    fontSize: '12px',
    color: 'var(--color-text-muted)',
    fontFamily: 'monospace'
  },
  historyDetails: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    marginBottom: '8px'
  },
  historyType: {
    padding: '4px 10px',
    backgroundColor: 'var(--color-surface-2)',
    borderRadius: '6px',
    fontSize: '12px',
    fontWeight: 500,
    textTransform: 'capitalize'
  },
  historyLocation: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    fontSize: '13px',
    color: 'var(--color-text-muted)'
  },
  historyReason: {
    fontSize: '13px',
    color: 'var(--color-text-muted)',
    margin: 0
  },
  historyRight: {
    textAlign: 'right',
    minWidth: '120px'
  },
  historyQtyChange: {
    display: 'block',
    fontSize: '20px',
    fontWeight: 700,
    marginBottom: '4px'
  },
  historyQtyResult: {
    display: 'block',
    fontSize: '12px',
    color: 'var(--color-text-muted)',
    marginBottom: '12px'
  },
  historyMeta: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    fontSize: '11px',
    color: 'var(--color-text-muted)'
  },
  reorderSection: {},
  reorderHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px'
  },
  reorderTitle: {
    fontSize: '16px',
    fontWeight: 600,
    margin: 0
  },
  reorderList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  reorderCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '24px',
    padding: '20px',
    backgroundColor: 'var(--color-surface)',
    borderRadius: '12px',
    border: '1px solid var(--color-border)'
  },
  reorderProduct: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    flex: 1
  },
  reorderStats: {
    display: 'flex',
    gap: '32px'
  },
  reorderStat: {
    textAlign: 'center'
  },
  reorderStatLabel: {
    display: 'block',
    fontSize: '11px',
    color: 'var(--color-text-muted)',
    marginBottom: '4px'
  },
  reorderStatValue: {
    fontSize: '18px',
    fontWeight: 700
  },
  reorderActions: {
    display: 'flex',
    gap: '12px',
    alignItems: 'center'
  },
  reorderInput: {
    width: '80px',
    padding: '10px 12px',
    backgroundColor: 'var(--color-surface-2)',
    border: '1px solid var(--color-border)',
    borderRadius: '8px',
    color: 'var(--color-text)',
    fontSize: '14px',
    textAlign: 'center'
  },
  addToOrderBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '10px 16px',
    backgroundColor: 'var(--color-primary)',
    border: 'none',
    borderRadius: '8px',
    color: '#fff',
    fontSize: '13px',
    fontWeight: 500,
    cursor: 'pointer'
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
    zIndex: 1000,
    padding: '20px'
  },
  modal: {
    width: '100%',
    maxWidth: '550px',
    backgroundColor: 'var(--color-surface)',
    borderRadius: '20px',
    overflow: 'hidden'
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
    padding: '8px',
    backgroundColor: 'transparent',
    border: 'none',
    color: 'var(--color-text-muted)',
    cursor: 'pointer',
    borderRadius: '8px'
  },
  modalBody: {
    padding: '24px'
  },
  adjustProduct: {
    padding: '16px',
    backgroundColor: 'var(--color-surface-2)',
    borderRadius: '12px',
    marginBottom: '24px'
  },
  adjustProductName: {
    display: 'block',
    fontWeight: 600,
    marginBottom: '4px'
  },
  adjustProductSku: {
    display: 'block',
    fontSize: '12px',
    color: 'var(--color-text-muted)',
    fontFamily: 'monospace',
    marginBottom: '8px'
  },
  adjustProductStock: {
    fontSize: '13px',
    color: 'var(--color-text-muted)'
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
    fontWeight: 500,
    marginBottom: '8px'
  },
  formInput: {
    width: '100%',
    padding: '12px 14px',
    backgroundColor: 'var(--color-surface-2)',
    border: '1px solid var(--color-border)',
    borderRadius: '10px',
    color: 'var(--color-text)',
    fontSize: '14px',
    boxSizing: 'border-box'
  },
  formSelect: {
    width: '100%',
    padding: '12px 14px',
    backgroundColor: 'var(--color-surface-2)',
    border: '1px solid var(--color-border)',
    borderRadius: '10px',
    color: 'var(--color-text)',
    fontSize: '14px',
    cursor: 'pointer',
    boxSizing: 'border-box'
  },
  formTextarea: {
    width: '100%',
    padding: '12px 14px',
    backgroundColor: 'var(--color-surface-2)',
    border: '1px solid var(--color-border)',
    borderRadius: '10px',
    color: 'var(--color-text)',
    fontSize: '14px',
    resize: 'vertical',
    fontFamily: 'inherit',
    boxSizing: 'border-box'
  },
  adjustTypeGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '12px'
  },
  adjustTypeBtn: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px',
    padding: '16px',
    backgroundColor: 'var(--color-surface-2)',
    border: '1px solid var(--color-border)',
    borderRadius: '12px',
    color: 'var(--color-text)',
    fontSize: '13px',
    cursor: 'pointer'
  },
  modalFooter: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '12px',
    padding: '20px 24px',
    borderTop: '1px solid var(--color-border)'
  }
};

export default ProductInventory;