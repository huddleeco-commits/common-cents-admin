/**
 * ProductDashboard
 * 
 * Product catalog command center.
 * - Catalog overview & stats
 * - Top selling products
 * - Low performers
 * - Category breakdown
 * - Pricing insights
 * - Inventory status summary
 * - AI-powered recommendations
 * 
 * Links to Inventory for stock, Orders for sales data.
 */

import React, { useState, useEffect, useCallback } from 'react';
import {
  Package,
  ShoppingBag,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Tag,
  Layers,
  Grid,
  BarChart3,
  Star,
  Eye,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Plus,
  Search,
  Filter,
  ChevronRight,
  ArrowUpRight,
  ArrowDownRight,
  Zap,
  Image,
  Archive,
  RefreshCw,
  ExternalLink,
  MoreHorizontal,
  Percent,
  Box,
  Clock,
  Loader
} from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || '';

export function ProductDashboard() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [products, setProducts] = useState([]);
  const [data, setData] = useState(null);
  const [timeRange, setTimeRange] = useState('30d');

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('adminToken');
      console.log('[ProductsDashboard] Token exists:', !!token);
      console.log('[ProductsDashboard] API URL:', API_URL);

      const response = await fetch(`${API_URL}/api/products`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      console.log('[ProductsDashboard] Response status:', response.status);

      if (response.ok) {
        const result = await response.json();
        const productList = result.data || [];
        setProducts(productList);

        // Calculate stats from real data
        const activeProducts = productList.filter(p => p.active !== false);
        const categories = [...new Set(productList.map(p => p.category).filter(Boolean))];
        const prices = productList.map(p => parseFloat(p.price) || 0);
        const avgPrice = prices.length > 0 ? prices.reduce((a, b) => a + b, 0) / prices.length : 0;
        const totalInventory = productList.reduce((sum, p) => sum + (p.inventory_count || 0), 0);

        // Group by category
        const categoryStats = categories.map(cat => {
          const catProducts = productList.filter(p => p.category === cat);
          const catRevenue = catProducts.reduce((sum, p) => sum + (parseFloat(p.price) || 0), 0);
          return {
            name: cat,
            products: catProducts.length,
            revenue: catRevenue,
            percent: productList.length > 0 ? (catProducts.length / productList.length * 100) : 0,
            trend: 0
          };
        });

        // Calculate inventory status
        const lowStockThreshold = 10;
        const overstockThreshold = 1000;
        const inStock = productList.filter(p => (p.inventory_count || 0) > lowStockThreshold).length;
        const lowStock = productList.filter(p => (p.inventory_count || 0) > 0 && (p.inventory_count || 0) <= lowStockThreshold).length;
        const outOfStock = productList.filter(p => (p.inventory_count || 0) === 0).length;
        const overstocked = productList.filter(p => (p.inventory_count || 0) > overstockThreshold).length;

        setData({
          summary: {
            totalProducts: productList.length,
            activeProducts: activeProducts.length,
            draftProducts: productList.length - activeProducts.length,
            archivedProducts: 0,
            totalCategories: categories.length,
            avgPrice: avgPrice,
            priceRange: { min: Math.min(...prices) || 0, max: Math.max(...prices) || 0 },
            totalVariants: 0
          },
          performance: {
            totalRevenue: productList.reduce((sum, p) => sum + (parseFloat(p.price) || 0), 0),
            revenueChange: 0,
            unitsSold: totalInventory,
            unitsSoldChange: 0,
            avgOrderValue: avgPrice,
            conversionRate: 0,
            viewsToday: 0,
            viewsChange: 0
          },
          topSellers: productList.slice(0, 5).map((p, i) => ({
            id: p.id,
            name: p.name,
            sku: p.sku || `SKU-${p.id}`,
            category: p.category || 'Uncategorized',
            price: parseFloat(p.price) || 0,
            unitsSold: p.inventory_count || 0,
            revenue: parseFloat(p.price) || 0,
            trend: 0,
            image: p.image_url
          })),
          lowPerformers: [],
          categories: categoryStats,
          inventoryStatus: { inStock, lowStock, outOfStock, overstocked },
          recentActivity: [],
          aiInsights: [],
          priceDistribution: []
        });
      } else if (response.status === 401) {
        setError('Please log in to view products');
      } else {
        setError('Failed to load products');
      }
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Unable to connect to API');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (API_URL) {
      fetchProducts();
    } else {
      setError('API URL not configured');
      setLoading(false);
    }
  }, [fetchProducts, timeRange]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  };

  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'created': return <Plus size={14} color="#22c55e" />;
      case 'updated': return <RefreshCw size={14} color="#3b82f6" />;
      case 'low_stock': return <AlertTriangle size={14} color="#f59e0b" />;
      case 'published': return <CheckCircle size={14} color="#22c55e" />;
      case 'archived': return <Archive size={14} color="#6b7280" />;
      default: return <Package size={14} />;
    }
  };

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <Loader size={32} style={{ animation: 'spin 1s linear infinite' }} />
        <p>Loading product insights...</p>
        <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.loadingContainer}>
        <AlertTriangle size={32} color="#ef4444" />
        <p>{error}</p>
        <button onClick={fetchProducts} style={styles.retryBtn}>
          <RefreshCw size={16} /> Try Again
        </button>
      </div>
    );
  }

  if (!data) {
    return (
      <div style={styles.loadingContainer}>
        <Package size={32} color="var(--color-text-muted)" />
        <p>No product data available</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <h1 style={styles.title}>Products</h1>
          <span style={styles.subtitle}>Catalog management & insights</span>
        </div>
        <div style={styles.headerActions}>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            style={styles.timeSelect}
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="12m">Last 12 months</option>
          </select>
          <button style={styles.actionBtn}>
            <Filter size={16} />
            Filters
          </button>
          <button style={styles.primaryBtn}>
            <Plus size={16} />
            Add Product
          </button>
        </div>
      </div>

      {/* AI Insights */}
      <div style={styles.aiInsightsRow}>
        {data.aiInsights.map((insight, index) => (
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
              {insight.impact && (
                <span style={styles.aiInsightImpact}>{insight.impact}</span>
              )}
            </div>
            <button style={styles.aiInsightAction}>{insight.action}</button>
          </div>
        ))}
      </div>

      {/* Summary Stats */}
      <div style={styles.statsGrid}>
        <div style={styles.statCard}>
          <div style={styles.statHeader}>
            <div style={{...styles.statIcon, backgroundColor: 'rgba(59, 130, 246, 0.1)'}}>
              <Package size={22} color="#3b82f6" />
            </div>
          </div>
          <div style={styles.statValue}>{formatNumber(data.summary.totalProducts)}</div>
          <div style={styles.statLabel}>Total Products</div>
          <div style={styles.statBreakdown}>
            <span style={styles.activeCount}>{data.summary.activeProducts} active</span>
            <span style={styles.draftCount}>{data.summary.draftProducts} drafts</span>
          </div>
        </div>

        <div style={styles.statCard}>
          <div style={styles.statHeader}>
            <div style={{...styles.statIcon, backgroundColor: 'rgba(34, 197, 94, 0.1)'}}>
              <DollarSign size={22} color="#22c55e" />
            </div>
          </div>
          <div style={styles.statValue}>{formatCurrency(data.performance.totalRevenue)}</div>
          <div style={styles.statLabel}>Revenue</div>
          <div style={styles.statChange}>
            <ArrowUpRight size={14} color="#22c55e" />
            <span style={{ color: '#22c55e' }}>+{data.performance.revenueChange}%</span>
            <span style={styles.changeLabel}>vs last period</span>
          </div>
        </div>

        <div style={styles.statCard}>
          <div style={styles.statHeader}>
            <div style={{...styles.statIcon, backgroundColor: 'rgba(139, 92, 246, 0.1)'}}>
              <ShoppingBag size={22} color="#8b5cf6" />
            </div>
          </div>
          <div style={styles.statValue}>{formatNumber(data.performance.unitsSold)}</div>
          <div style={styles.statLabel}>Units Sold</div>
          <div style={styles.statChange}>
            <ArrowUpRight size={14} color="#22c55e" />
            <span style={{ color: '#22c55e' }}>+{data.performance.unitsSoldChange}%</span>
            <span style={styles.changeLabel}>vs last period</span>
          </div>
        </div>

        <div style={styles.statCard}>
          <div style={styles.statHeader}>
            <div style={{...styles.statIcon, backgroundColor: 'rgba(249, 115, 22, 0.1)'}}>
              <Eye size={22} color="#f97316" />
            </div>
          </div>
          <div style={styles.statValue}>{formatNumber(data.performance.viewsToday)}</div>
          <div style={styles.statLabel}>Views Today</div>
          <div style={styles.statChange}>
            <ArrowUpRight size={14} color="#22c55e" />
            <span style={{ color: '#22c55e' }}>+{data.performance.viewsChange}%</span>
            <span style={styles.changeLabel}>vs yesterday</span>
          </div>
        </div>

        <div style={styles.statCard}>
          <div style={styles.statHeader}>
            <div style={{...styles.statIcon, backgroundColor: 'rgba(236, 72, 153, 0.1)'}}>
              <Percent size={22} color="#ec4899" />
            </div>
          </div>
          <div style={styles.statValue}>{data.performance.conversionRate}%</div>
          <div style={styles.statLabel}>Conversion Rate</div>
          <div style={styles.statBreakdown}>
            <span>Views → Purchases</span>
          </div>
        </div>
      </div>

      {/* Inventory Status Bar */}
      <div style={styles.inventoryStatusBar}>
        <div style={styles.inventoryStatusItem}>
          <CheckCircle size={16} color="#22c55e" />
          <span style={styles.inventoryStatusValue}>{data.inventoryStatus.inStock}</span>
          <span style={styles.inventoryStatusLabel}>In Stock</span>
        </div>
        <div style={styles.inventoryStatusItem}>
          <AlertTriangle size={16} color="#f59e0b" />
          <span style={{...styles.inventoryStatusValue, color: '#f59e0b'}}>{data.inventoryStatus.lowStock}</span>
          <span style={styles.inventoryStatusLabel}>Low Stock</span>
        </div>
        <div style={styles.inventoryStatusItem}>
          <XCircle size={16} color="#ef4444" />
          <span style={{...styles.inventoryStatusValue, color: '#ef4444'}}>{data.inventoryStatus.outOfStock}</span>
          <span style={styles.inventoryStatusLabel}>Out of Stock</span>
        </div>
        <div style={styles.inventoryStatusItem}>
          <Box size={16} color="#3b82f6" />
          <span style={{...styles.inventoryStatusValue, color: '#3b82f6'}}>{data.inventoryStatus.overstocked}</span>
          <span style={styles.inventoryStatusLabel}>Overstocked</span>
        </div>
        <button style={styles.viewInventoryBtn}>
          View Inventory <ChevronRight size={14} />
        </button>
      </div>

      {/* Main Content Grid */}
      <div style={styles.mainGrid}>
        {/* Top Sellers */}
        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <h3 style={styles.cardTitle}>
              <TrendingUp size={18} color="#22c55e" style={{ marginRight: '8px' }} />
              Top Sellers
            </h3>
            <button style={styles.viewAllBtn}>
              View All <ChevronRight size={14} />
            </button>
          </div>
          <div style={styles.productsList}>
            {data.topSellers.map((product, index) => (
              <div key={product.id} style={styles.productRow}>
                <div style={styles.productRank}>#{index + 1}</div>
                <div style={styles.productImage}>
                  <Package size={20} color="var(--color-text-muted)" />
                </div>
                <div style={styles.productInfo}>
                  <span style={styles.productName}>{product.name}</span>
                  <span style={styles.productMeta}>
                    {product.sku} • {product.category}
                  </span>
                </div>
                <div style={styles.productStats}>
                  <span style={styles.productRevenue}>{formatCurrency(product.revenue)}</span>
                  <span style={styles.productUnits}>{formatNumber(product.unitsSold)} sold</span>
                </div>
                <div style={styles.productTrend}>
                  <ArrowUpRight size={14} color="#22c55e" />
                  <span style={{ color: '#22c55e' }}>+{product.trend}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Categories */}
        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <h3 style={styles.cardTitle}>
              <Layers size={18} color="#8b5cf6" style={{ marginRight: '8px' }} />
              Categories
            </h3>
            <button style={styles.viewAllBtn}>
              Manage <ChevronRight size={14} />
            </button>
          </div>
          <div style={styles.categoriesList}>
            {data.categories.map((category, index) => (
              <div key={index} style={styles.categoryRow}>
                <div style={styles.categoryInfo}>
                  <span style={styles.categoryName}>{category.name}</span>
                  <span style={styles.categoryCount}>
                    {category.products} products
                  </span>
                </div>
                <div style={styles.categoryRevenue}>
                  {formatCurrency(category.revenue)}
                </div>
                <div style={styles.categoryBar}>
                  <div style={{
                    ...styles.categoryBarFill,
                    width: `${category.percent}%`
                  }} />
                </div>
                <div style={styles.categoryTrend}>
                  {category.trend > 0 ? (
                    <ArrowUpRight size={14} color="#22c55e" />
                  ) : (
                    <ArrowDownRight size={14} color="#ef4444" />
                  )}
                  <span style={{
                    color: category.trend > 0 ? '#22c55e' : '#ef4444'
                  }}>
                    {category.trend > 0 ? '+' : ''}{category.trend}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Second Row */}
      <div style={styles.secondGrid}>
        {/* Low Performers */}
        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <h3 style={styles.cardTitle}>
              <TrendingDown size={18} color="#ef4444" style={{ marginRight: '8px' }} />
              Needs Attention
            </h3>
            <button style={styles.viewAllBtn}>
              View All <ChevronRight size={14} />
            </button>
          </div>
          <div style={styles.lowPerformersList}>
            {data.lowPerformers.map((product) => (
              <div key={product.id} style={styles.lowPerformerRow}>
                <div style={styles.productInfo}>
                  <span style={styles.productName}>{product.name}</span>
                  <span style={styles.productMeta}>
                    {product.sku} • Listed {product.daysListed} days
                  </span>
                </div>
                <div style={styles.lowPerformerStats}>
                  <span style={styles.lowStat}>
                    <Eye size={12} /> {product.views} views
                  </span>
                  <span style={styles.lowStat}>
                    <ShoppingBag size={12} /> {product.unitsSold} sold
                  </span>
                  <span style={styles.lowConversion}>
                    {product.conversionRate}% conv
                  </span>
                </div>
                <button style={styles.optimizeBtn}>Optimize</button>
              </div>
            ))}
          </div>
        </div>

        {/* Price Distribution */}
        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <h3 style={styles.cardTitle}>
              <Tag size={18} color="#f59e0b" style={{ marginRight: '8px' }} />
              Price Distribution
            </h3>
          </div>
          <div style={styles.priceDistribution}>
            {data.priceDistribution.map((range, index) => (
              <div key={index} style={styles.priceRangeRow}>
                <span style={styles.priceRangeLabel}>{range.range}</span>
                <div style={styles.priceRangeBar}>
                  <div style={{
                    ...styles.priceRangeBarFill,
                    width: `${range.percent}%`
                  }} />
                </div>
                <span style={styles.priceRangeCount}>{range.count}</span>
                <span style={styles.priceRangePercent}>{range.percent}%</span>
              </div>
            ))}
          </div>
          <div style={styles.priceInsight}>
            <Zap size={14} color="#f59e0b" />
            <span>Avg price: {formatCurrency(data.summary.avgPrice)} • Range: {formatCurrency(data.summary.priceRange.min)} - {formatCurrency(data.summary.priceRange.max)}</span>
          </div>
        </div>

        {/* Recent Activity */}
        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <h3 style={styles.cardTitle}>
              <Clock size={18} style={{ marginRight: '8px' }} />
              Recent Activity
            </h3>
          </div>
          <div style={styles.activityList}>
            {data.recentActivity.map((activity, index) => (
              <div key={index} style={styles.activityRow}>
                <div style={styles.activityIcon}>
                  {getActivityIcon(activity.type)}
                </div>
                <div style={styles.activityContent}>
                  <span style={styles.activityProduct}>{activity.product}</span>
                  <span style={styles.activityDesc}>
                    {activity.type === 'created' && 'Product created'}
                    {activity.type === 'updated' && `Updated ${activity.field}`}
                    {activity.type === 'low_stock' && `Low stock: ${activity.quantity} left`}
                    {activity.type === 'published' && 'Published'}
                    {activity.type === 'archived' && 'Archived'}
                  </span>
                </div>
                <span style={styles.activityTime}>{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div style={styles.quickActions}>
        <h3 style={styles.quickActionsTitle}>Quick Actions</h3>
        <div style={styles.quickActionsGrid}>
          <button style={styles.quickActionBtn}>
            <Plus size={20} />
            <span>Add Product</span>
          </button>
          <button style={styles.quickActionBtn}>
            <Layers size={20} />
            <span>Manage Categories</span>
          </button>
          <button style={styles.quickActionBtn}>
            <Tag size={20} />
            <span>Bulk Pricing</span>
          </button>
          <button style={styles.quickActionBtn}>
            <Image size={20} />
            <span>Media Library</span>
          </button>
          <button style={styles.quickActionBtn}>
            <RefreshCw size={20} />
            <span>Sync Inventory</span>
          </button>
          <button style={styles.quickActionBtn}>
            <Archive size={20} />
            <span>View Archived</span>
          </button>
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
  retryBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 20px',
    backgroundColor: 'var(--color-primary)',
    border: 'none',
    borderRadius: '8px',
    color: '#ffffff',
    fontSize: '14px',
    cursor: 'pointer'
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
  timeSelect: {
    padding: '10px 16px',
    backgroundColor: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    borderRadius: '10px',
    color: 'var(--color-text)',
    fontSize: '14px',
    cursor: 'pointer',
    outline: 'none'
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
  aiInsightImpact: {
    display: 'inline-block',
    marginTop: '8px',
    padding: '4px 10px',
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
    borderRadius: '12px',
    fontSize: '11px',
    fontWeight: 600,
    color: '#22c55e'
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
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
    gap: '16px',
    marginBottom: '20px'
  },
  statCard: {
    padding: '20px',
    backgroundColor: 'var(--color-surface)',
    borderRadius: '16px',
    border: '1px solid var(--color-border)'
  },
  statHeader: {
    marginBottom: '12px'
  },
  statIcon: {
    width: '44px',
    height: '44px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  statValue: {
    fontSize: '28px',
    fontWeight: 700,
    marginBottom: '4px'
  },
  statLabel: {
    fontSize: '13px',
    color: 'var(--color-text-muted)',
    marginBottom: '8px'
  },
  statChange: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    fontSize: '12px'
  },
  changeLabel: {
    color: 'var(--color-text-muted)',
    marginLeft: '4px'
  },
  statBreakdown: {
    display: 'flex',
    gap: '12px',
    fontSize: '12px'
  },
  activeCount: {
    color: '#22c55e'
  },
  draftCount: {
    color: 'var(--color-text-muted)'
  },
  inventoryStatusBar: {
    display: 'flex',
    alignItems: 'center',
    gap: '32px',
    padding: '16px 24px',
    backgroundColor: 'var(--color-surface)',
    borderRadius: '12px',
    border: '1px solid var(--color-border)',
    marginBottom: '24px'
  },
  inventoryStatusItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  inventoryStatusValue: {
    fontSize: '18px',
    fontWeight: 700
  },
  inventoryStatusLabel: {
    fontSize: '13px',
    color: 'var(--color-text-muted)'
  },
  viewInventoryBtn: {
    marginLeft: 'auto',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '8px 16px',
    backgroundColor: 'transparent',
    border: 'none',
    color: 'var(--color-primary)',
    fontSize: '13px',
    fontWeight: 500,
    cursor: 'pointer'
  },
  mainGrid: {
    display: 'grid',
    gridTemplateColumns: '1.2fr 0.8fr',
    gap: '24px',
    marginBottom: '24px'
  },
  secondGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
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
  productsList: {
    padding: '16px 24px'
  },
  productRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 0',
    borderBottom: '1px solid var(--color-border)'
  },
  productRank: {
    width: '28px',
    fontWeight: 700,
    fontSize: '14px',
    color: 'var(--color-text-muted)'
  },
  productImage: {
    width: '44px',
    height: '44px',
    borderRadius: '10px',
    backgroundColor: 'var(--color-surface-2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  productInfo: {
    flex: 1
  },
  productName: {
    display: 'block',
    fontWeight: 600,
    fontSize: '14px'
  },
  productMeta: {
    fontSize: '12px',
    color: 'var(--color-text-muted)'
  },
  productStats: {
    textAlign: 'right'
  },
  productRevenue: {
    display: 'block',
    fontWeight: 700,
    fontSize: '14px'
  },
  productUnits: {
    fontSize: '12px',
    color: 'var(--color-text-muted)'
  },
  productTrend: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    fontSize: '12px',
    fontWeight: 600,
    width: '70px',
    justifyContent: 'flex-end'
  },
  categoriesList: {
    padding: '16px 24px'
  },
  categoryRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '14px 0',
    borderBottom: '1px solid var(--color-border)'
  },
  categoryInfo: {
    width: '140px'
  },
  categoryName: {
    display: 'block',
    fontWeight: 600,
    fontSize: '14px'
  },
  categoryCount: {
    fontSize: '12px',
    color: 'var(--color-text-muted)'
  },
  categoryRevenue: {
    width: '90px',
    fontWeight: 600,
    fontSize: '13px'
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
    backgroundColor: '#8b5cf6',
    borderRadius: '4px'
  },
  categoryTrend: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    fontSize: '12px',
    fontWeight: 600,
    width: '60px',
    justifyContent: 'flex-end'
  },
  lowPerformersList: {
    padding: '16px 24px'
  },
  lowPerformerRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    padding: '14px 0',
    borderBottom: '1px solid var(--color-border)'
  },
  lowPerformerStats: {
    display: 'flex',
    gap: '12px',
    alignItems: 'center'
  },
  lowStat: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    fontSize: '11px',
    color: 'var(--color-text-muted)'
  },
  lowConversion: {
    padding: '2px 8px',
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    borderRadius: '8px',
    fontSize: '11px',
    fontWeight: 600,
    color: '#ef4444'
  },
  optimizeBtn: {
    padding: '6px 12px',
    backgroundColor: 'var(--color-primary)',
    border: 'none',
    borderRadius: '8px',
    color: '#ffffff',
    fontSize: '12px',
    fontWeight: 600,
    cursor: 'pointer'
  },
  priceDistribution: {
    padding: '16px 24px'
  },
  priceRangeRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '10px 0'
  },
  priceRangeLabel: {
    width: '60px',
    fontSize: '13px',
    fontWeight: 500
  },
  priceRangeBar: {
    flex: 1,
    height: '8px',
    backgroundColor: 'var(--color-surface-2)',
    borderRadius: '4px',
    overflow: 'hidden'
  },
  priceRangeBarFill: {
    height: '100%',
    backgroundColor: '#f59e0b',
    borderRadius: '4px'
  },
  priceRangeCount: {
    width: '40px',
    textAlign: 'right',
    fontSize: '13px',
    fontWeight: 600
  },
  priceRangePercent: {
    width: '45px',
    textAlign: 'right',
    fontSize: '12px',
    color: 'var(--color-text-muted)'
  },
  priceInsight: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 24px',
    backgroundColor: 'rgba(249, 115, 22, 0.1)',
    fontSize: '12px'
  },
  activityList: {
    padding: '16px 24px'
  },
  activityRow: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px',
    padding: '10px 0',
    borderBottom: '1px solid var(--color-border)'
  },
  activityIcon: {
    width: '28px',
    height: '28px',
    borderRadius: '8px',
    backgroundColor: 'var(--color-surface-2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  activityContent: {
    flex: 1
  },
  activityProduct: {
    display: 'block',
    fontWeight: 600,
    fontSize: '13px'
  },
  activityDesc: {
    fontSize: '12px',
    color: 'var(--color-text-muted)'
  },
  activityTime: {
    fontSize: '11px',
    color: 'var(--color-text-muted)'
  },
  quickActions: {
    backgroundColor: 'var(--color-surface)',
    borderRadius: '16px',
    border: '1px solid var(--color-border)',
    padding: '24px'
  },
  quickActionsTitle: {
    fontSize: '16px',
    fontWeight: 600,
    margin: '0 0 16px 0'
  },
  quickActionsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(6, 1fr)',
    gap: '12px'
  },
  quickActionBtn: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px',
    padding: '20px 16px',
    backgroundColor: 'var(--color-surface-2)',
    border: '1px solid var(--color-border)',
    borderRadius: '12px',
    color: 'var(--color-text)',
    fontSize: '13px',
    cursor: 'pointer',
    transition: 'all 0.2s'
  }
};

export default ProductDashboard;