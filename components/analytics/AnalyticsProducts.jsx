/**
 * ProductAnalytics
 * 
 * Product performance and insights.
 * - Top sellers
 * - Revenue by product
 * - Category performance
 * - Inventory turnover
 * - Product trends
 * - Underperformers
 * 
 * AI-powered product recommendations.
 */

import React, { useState, useEffect } from 'react';
import {
  Package,
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingCart,
  Star,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
  ChevronRight,
  Zap,
  AlertTriangle,
  Award,
  Target,
  Layers,
  RefreshCw,
  Filter,
  Search
} from 'lucide-react';

export function ProductAnalytics() {
  const [dateRange, setDateRange] = useState('30d');
  const [loading, setLoading] = useState(true);
  const [productData, setProductData] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setTimeout(() => {
      setProductData({
        // Summary
        summary: {
          totalProducts: 86,
          activeProducts: 78,
          totalRevenue: 148750,
          unitsold: 4523,
          avgPrice: 32.89,
          topPerformerRevenue: 18450
        },

        // Top selling products
        topProducts: [
          {
            id: 1,
            name: 'Classic Burger',
            category: 'Burgers',
            image: null,
            unitsSold: 856,
            revenue: 10272,
            avgRating: 4.8,
            reviews: 234,
            trend: 15.2,
            margin: 42,
            inStock: true
          },
          {
            id: 2,
            name: 'Chicken Wings (12pc)',
            category: 'Appetizers',
            image: null,
            unitsSold: 687,
            revenue: 10305,
            avgRating: 4.7,
            reviews: 189,
            trend: 22.8,
            margin: 38,
            inStock: true
          },
          {
            id: 3,
            name: 'Margherita Pizza',
            category: 'Pizza',
            image: null,
            unitsSold: 534,
            revenue: 8010,
            avgRating: 4.9,
            reviews: 156,
            trend: 8.5,
            margin: 45,
            inStock: true
          },
          {
            id: 4,
            name: 'Caesar Salad',
            category: 'Salads',
            image: null,
            unitsSold: 445,
            revenue: 4895,
            avgRating: 4.5,
            reviews: 98,
            trend: -3.2,
            margin: 52,
            inStock: true
          },
          {
            id: 5,
            name: 'Fish & Chips',
            category: 'Mains',
            image: null,
            unitsSold: 398,
            revenue: 5572,
            avgRating: 4.6,
            reviews: 112,
            trend: 12.1,
            margin: 35,
            inStock: true
          },
          {
            id: 6,
            name: 'BBQ Ribs',
            category: 'Mains',
            image: null,
            unitsSold: 356,
            revenue: 7476,
            avgRating: 4.8,
            reviews: 145,
            trend: 18.4,
            margin: 40,
            inStock: false
          },
          {
            id: 7,
            name: 'Loaded Nachos',
            category: 'Appetizers',
            image: null,
            unitsSold: 324,
            revenue: 3888,
            avgRating: 4.4,
            reviews: 87,
            trend: 5.6,
            margin: 48,
            inStock: true
          },
          {
            id: 8,
            name: 'Chocolate Lava Cake',
            category: 'Desserts',
            image: null,
            unitsSold: 289,
            revenue: 2601,
            avgRating: 4.9,
            reviews: 134,
            trend: 28.3,
            margin: 55,
            inStock: true
          }
        ],

        // Category performance
        categories: [
          { name: 'Burgers', products: 12, revenue: 32450, units: 2134, trend: 12.5, percent: 21.8 },
          { name: 'Pizza', products: 8, revenue: 28900, units: 1856, trend: 8.2, percent: 19.4 },
          { name: 'Appetizers', products: 15, revenue: 24680, units: 2890, trend: 15.8, percent: 16.6 },
          { name: 'Mains', products: 18, revenue: 22340, units: 1234, trend: 6.4, percent: 15.0 },
          { name: 'Salads', products: 10, revenue: 15670, units: 1567, trend: -2.1, percent: 10.5 },
          { name: 'Desserts', products: 12, revenue: 12890, units: 1845, trend: 22.4, percent: 8.7 },
          { name: 'Beverages', products: 11, revenue: 11820, units: 3456, trend: 4.2, percent: 8.0 }
        ],

        // Product trends over time
        trendData: [
          { date: 'Week 1', burgers: 7800, pizza: 6900, appetizers: 5800 },
          { date: 'Week 2', burgers: 8200, pizza: 7100, appetizers: 6200 },
          { date: 'Week 3', burgers: 7900, pizza: 7400, appetizers: 6100 },
          { date: 'Week 4', burgers: 8500, pizza: 7500, appetizers: 6580 }
        ],

        // Underperformers
        underperformers: [
          { id: 101, name: 'Garden Salad', category: 'Salads', units: 45, revenue: 405, trend: -28.5, reason: 'Low demand' },
          { id: 102, name: 'Veggie Wrap', category: 'Wraps', units: 34, revenue: 374, trend: -35.2, reason: 'Seasonal decline' },
          { id: 103, name: 'Fruit Cup', category: 'Sides', units: 28, revenue: 140, trend: -42.1, reason: 'Consider removing' },
          { id: 104, name: 'Onion Rings', category: 'Sides', units: 67, revenue: 335, trend: -18.4, reason: 'Price too high' }
        ],

        // New products performance
        newProducts: [
          { id: 201, name: 'Spicy Buffalo Burger', launchDate: '2 weeks ago', units: 156, revenue: 2028, rating: 4.7, trend: 'rising' },
          { id: 202, name: 'Truffle Fries', launchDate: '3 weeks ago', units: 234, revenue: 1872, rating: 4.5, trend: 'stable' },
          { id: 203, name: 'Mango Smoothie', launchDate: '1 week ago', units: 89, revenue: 534, rating: 4.8, trend: 'rising' }
        ],

        // Product mix
        productMix: {
          highMargin: { count: 24, percent: 28, revenue: 45600 },
          mediumMargin: { count: 42, percent: 49, revenue: 72400 },
          lowMargin: { count: 20, percent: 23, revenue: 30750 }
        },

        // AI insights
        aiInsights: [
          {
            type: 'opportunity',
            title: 'Desserts Trending Up 22%',
            message: 'Chocolate Lava Cake is your fastest growing item. Consider expanding dessert options.',
            action: 'Add desserts'
          },
          {
            type: 'warning',
            title: '4 Products Underperforming',
            message: 'These items have declined 20%+ this month. Review pricing or consider removing.',
            action: 'Review items'
          },
          {
            type: 'insight',
            title: 'Bundle Opportunity',
            message: 'Customers who buy burgers often add appetizers. Create a combo deal for +15% AOV.',
            action: 'Create bundle'
          }
        ]
      });
      setLoading(false);
    }, 600);
  }, [dateRange]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  };

  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  if (loading || !productData) {
    return (
      <div style={styles.loadingContainer}>
        <Package size={32} style={{ animation: 'pulse 1s ease-in-out infinite' }} />
        <p>Loading product analytics...</p>
      </div>
    );
  }

  const filteredProducts = productData.topProducts.filter(product => {
    if (activeCategory !== 'all' && product.category !== activeCategory) return false;
    if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <h1 style={styles.title}>Product Analytics</h1>
          <span style={styles.subtitle}>Performance insights for your menu</span>
        </div>
        <div style={styles.headerActions}>
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            style={styles.dateSelect}
          >
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
          </select>
        </div>
      </div>

      {/* AI Insights */}
      <div style={styles.aiInsightsRow}>
        {productData.aiInsights.map((insight, index) => (
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

      {/* Summary Cards */}
      <div style={styles.summaryGrid}>
        <div style={styles.summaryCard}>
          <Package size={22} color="#3b82f6" />
          <div style={styles.summaryInfo}>
            <span style={styles.summaryValue}>{productData.summary.totalProducts}</span>
            <span style={styles.summaryLabel}>Total Products</span>
          </div>
        </div>
        <div style={styles.summaryCard}>
          <DollarSign size={22} color="#22c55e" />
          <div style={styles.summaryInfo}>
            <span style={styles.summaryValue}>{formatCurrency(productData.summary.totalRevenue)}</span>
            <span style={styles.summaryLabel}>Total Revenue</span>
          </div>
        </div>
        <div style={styles.summaryCard}>
          <ShoppingCart size={22} color="#8b5cf6" />
          <div style={styles.summaryInfo}>
            <span style={styles.summaryValue}>{formatNumber(productData.summary.unitsold)}</span>
            <span style={styles.summaryLabel}>Units Sold</span>
          </div>
        </div>
        <div style={styles.summaryCard}>
          <Target size={22} color="#f59e0b" />
          <div style={styles.summaryInfo}>
            <span style={styles.summaryValue}>{formatCurrency(productData.summary.avgPrice)}</span>
            <span style={styles.summaryLabel}>Avg Price</span>
          </div>
        </div>
      </div>

      {/* Category Performance */}
      <div style={styles.card}>
        <div style={styles.cardHeader}>
          <h3 style={styles.cardTitle}>Category Performance</h3>
          <Layers size={18} color="var(--color-text-muted)" />
        </div>
        <div style={styles.categoryGrid}>
          {productData.categories.map((category, index) => (
            <div 
              key={index} 
              style={{
                ...styles.categoryCard,
                ...(activeCategory === category.name ? styles.categoryCardActive : {})
              }}
              onClick={() => setActiveCategory(activeCategory === category.name ? 'all' : category.name)}
            >
              <div style={styles.categoryHeader}>
                <span style={styles.categoryName}>{category.name}</span>
                <span style={{
                  ...styles.categoryTrend,
                  color: category.trend >= 0 ? '#22c55e' : '#ef4444'
                }}>
                  {category.trend >= 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                  {Math.abs(category.trend)}%
                </span>
              </div>
              <div style={styles.categoryRevenue}>{formatCurrency(category.revenue)}</div>
              <div style={styles.categoryMeta}>
                <span>{category.products} products</span>
                <span>•</span>
                <span>{formatNumber(category.units)} sold</span>
              </div>
              <div style={styles.categoryBar}>
                <div style={{
                  ...styles.categoryBarFill,
                  width: `${category.percent}%`
                }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Products & Product Mix */}
      <div style={styles.twoColumnGrid}>
        {/* Top Products */}
        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <h3 style={styles.cardTitle}>Top Selling Products</h3>
            <div style={styles.searchBox}>
              <Search size={14} />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={styles.searchInput}
              />
            </div>
          </div>
          <div style={styles.productsList}>
            {filteredProducts.slice(0, 6).map((product, index) => (
              <div key={product.id} style={styles.productRow}>
                <div style={styles.productRank}>
                  {index < 3 ? (
                    <Award size={16} color={
                      index === 0 ? '#f59e0b' : 
                      index === 1 ? '#94a3b8' : '#cd7f32'
                    } />
                  ) : (
                    <span>#{index + 1}</span>
                  )}
                </div>
                <div style={styles.productInfo}>
                  <span style={styles.productName}>{product.name}</span>
                  <span style={styles.productCategory}>{product.category}</span>
                </div>
                <div style={styles.productStats}>
                  <div style={styles.productStat}>
                    <span style={styles.productStatValue}>{formatNumber(product.unitsSold)}</span>
                    <span style={styles.productStatLabel}>sold</span>
                  </div>
                  <div style={styles.productStat}>
                    <span style={styles.productStatValue}>{formatCurrency(product.revenue)}</span>
                    <span style={styles.productStatLabel}>revenue</span>
                  </div>
                </div>
                <div style={styles.productMeta}>
                  <div style={styles.productRating}>
                    <Star size={12} color="#f59e0b" fill="#f59e0b" />
                    <span>{product.avgRating}</span>
                  </div>
                  <span style={{
                    ...styles.productTrend,
                    color: product.trend >= 0 ? '#22c55e' : '#ef4444'
                  }}>
                    {product.trend >= 0 ? '+' : ''}{product.trend}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Product Mix & Margin Analysis */}
        <div style={styles.rightColumn}>
          {/* Product Mix */}
          <div style={styles.card}>
            <div style={styles.cardHeader}>
              <h3 style={styles.cardTitle}>Product Mix by Margin</h3>
            </div>
            <div style={styles.mixContent}>
              <div style={styles.mixBar}>
                <div style={{
                  ...styles.mixSegment,
                  width: `${productData.productMix.highMargin.percent}%`,
                  backgroundColor: '#22c55e'
                }}>
                  {productData.productMix.highMargin.percent}%
                </div>
                <div style={{
                  ...styles.mixSegment,
                  width: `${productData.productMix.mediumMargin.percent}%`,
                  backgroundColor: '#3b82f6'
                }}>
                  {productData.productMix.mediumMargin.percent}%
                </div>
                <div style={{
                  ...styles.mixSegment,
                  width: `${productData.productMix.lowMargin.percent}%`,
                  backgroundColor: '#f97316'
                }}>
                  {productData.productMix.lowMargin.percent}%
                </div>
              </div>
              <div style={styles.mixLegend}>
                <div style={styles.mixLegendItem}>
                  <span style={{...styles.mixDot, backgroundColor: '#22c55e'}} />
                  <div style={styles.mixLegendInfo}>
                    <span style={styles.mixLegendLabel}>High Margin (40%+)</span>
                    <span style={styles.mixLegendValue}>
                      {productData.productMix.highMargin.count} products • {formatCurrency(productData.productMix.highMargin.revenue)}
                    </span>
                  </div>
                </div>
                <div style={styles.mixLegendItem}>
                  <span style={{...styles.mixDot, backgroundColor: '#3b82f6'}} />
                  <div style={styles.mixLegendInfo}>
                    <span style={styles.mixLegendLabel}>Medium Margin (25-40%)</span>
                    <span style={styles.mixLegendValue}>
                      {productData.productMix.mediumMargin.count} products • {formatCurrency(productData.productMix.mediumMargin.revenue)}
                    </span>
                  </div>
                </div>
                <div style={styles.mixLegendItem}>
                  <span style={{...styles.mixDot, backgroundColor: '#f97316'}} />
                  <div style={styles.mixLegendInfo}>
                    <span style={styles.mixLegendLabel}>Low Margin (&lt;25%)</span>
                    <span style={styles.mixLegendValue}>
                      {productData.productMix.lowMargin.count} products • {formatCurrency(productData.productMix.lowMargin.revenue)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* New Products */}
          <div style={styles.card}>
            <div style={styles.cardHeader}>
              <h3 style={styles.cardTitle}>New Product Performance</h3>
              <span style={styles.newBadge}>Recently Launched</span>
            </div>
            <div style={styles.newProductsList}>
              {productData.newProducts.map(product => (
                <div key={product.id} style={styles.newProductRow}>
                  <div style={styles.newProductInfo}>
                    <span style={styles.newProductName}>{product.name}</span>
                    <span style={styles.newProductLaunch}>Launched {product.launchDate}</span>
                  </div>
                  <div style={styles.newProductStats}>
                    <span style={styles.newProductRevenue}>{formatCurrency(product.revenue)}</span>
                    <div style={styles.newProductMeta}>
                      <Star size={10} color="#f59e0b" fill="#f59e0b" />
                      <span>{product.rating}</span>
                      <span style={{
                        ...styles.trendBadge,
                        backgroundColor: product.trend === 'rising' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(59, 130, 246, 0.1)',
                        color: product.trend === 'rising' ? '#22c55e' : '#3b82f6'
                      }}>
                        {product.trend === 'rising' ? <TrendingUp size={10} /> : null}
                        {product.trend}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Underperformers */}
      <div style={styles.card}>
        <div style={styles.cardHeader}>
          <h3 style={styles.cardTitle}>
            <AlertTriangle size={18} color="#f97316" style={{ marginRight: '8px' }} />
            Underperforming Products
          </h3>
          <button style={styles.actionBtn}>Review All</button>
        </div>
        <div style={styles.underperformersList}>
          {productData.underperformers.map(product => (
            <div key={product.id} style={styles.underperformerRow}>
              <div style={styles.underperformerInfo}>
                <span style={styles.underperformerName}>{product.name}</span>
                <span style={styles.underperformerCategory}>{product.category}</span>
              </div>
              <div style={styles.underperformerStats}>
                <div style={styles.underperformerStat}>
                  <span style={styles.underperformerValue}>{product.units}</span>
                  <span style={styles.underperformerLabel}>units</span>
                </div>
                <div style={styles.underperformerStat}>
                  <span style={styles.underperformerValue}>{formatCurrency(product.revenue)}</span>
                  <span style={styles.underperformerLabel}>revenue</span>
                </div>
              </div>
              <div style={styles.underperformerTrend}>
                <TrendingDown size={14} color="#ef4444" />
                <span style={{ color: '#ef4444' }}>{product.trend}%</span>
              </div>
              <span style={styles.underperformerReason}>{product.reason}</span>
              <div style={styles.underperformerActions}>
                <button style={styles.underperformerBtn}>Edit Price</button>
                <button style={{...styles.underperformerBtn, ...styles.underperformerBtnDanger}}>Remove</button>
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
    gap: '12px'
  },
  dateSelect: {
    padding: '10px 16px',
    backgroundColor: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    borderRadius: '10px',
    color: 'var(--color-text)',
    fontSize: '14px',
    cursor: 'pointer',
    outline: 'none'
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
  card: {
    backgroundColor: 'var(--color-surface)',
    borderRadius: '16px',
    border: '1px solid var(--color-border)',
    marginBottom: '24px',
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
  categoryGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '16px',
    padding: '20px 24px'
  },
  categoryCard: {
    padding: '16px',
    backgroundColor: 'var(--color-surface-2)',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'all 0.2s',
    border: '2px solid transparent'
  },
  categoryCardActive: {
    borderColor: 'var(--color-primary)',
    backgroundColor: 'rgba(59, 130, 246, 0.1)'
  },
  categoryHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '8px'
  },
  categoryName: {
    fontWeight: 600
  },
  categoryTrend: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    fontSize: '12px',
    fontWeight: 600
  },
  categoryRevenue: {
    fontSize: '20px',
    fontWeight: 700,
    marginBottom: '8px'
  },
  categoryMeta: {
    display: 'flex',
    gap: '8px',
    fontSize: '12px',
    color: 'var(--color-text-muted)',
    marginBottom: '12px'
  },
  categoryBar: {
    height: '4px',
    backgroundColor: 'var(--color-surface)',
    borderRadius: '2px',
    overflow: 'hidden'
  },
  categoryBarFill: {
    height: '100%',
    backgroundColor: 'var(--color-primary)',
    borderRadius: '2px'
  },
  twoColumnGrid: {
    display: 'grid',
    gridTemplateColumns: '1.5fr 1fr',
    gap: '24px',
    marginBottom: '24px'
  },
  searchBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 12px',
    backgroundColor: 'var(--color-surface-2)',
    borderRadius: '8px'
  },
  searchInput: {
    backgroundColor: 'transparent',
    border: 'none',
    color: 'var(--color-text)',
    fontSize: '13px',
    outline: 'none',
    width: '120px'
  },
  productsList: {
    padding: '16px 24px'
  },
  productRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    padding: '14px 0',
    borderBottom: '1px solid var(--color-border)'
  },
  productRank: {
    width: '32px',
    height: '32px',
    borderRadius: '8px',
    backgroundColor: 'var(--color-surface-2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '12px',
    fontWeight: 600
  },
  productInfo: {
    flex: 1,
    minWidth: 0
  },
  productName: {
    display: 'block',
    fontWeight: 600,
    marginBottom: '2px'
  },
  productCategory: {
    fontSize: '12px',
    color: 'var(--color-text-muted)'
  },
  productStats: {
    display: 'flex',
    gap: '24px'
  },
  productStat: {
    textAlign: 'center'
  },
  productStatValue: {
    display: 'block',
    fontWeight: 600
  },
  productStatLabel: {
    fontSize: '10px',
    color: 'var(--color-text-muted)',
    textTransform: 'uppercase'
  },
  productMeta: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: '4px'
  },
  productRating: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    fontSize: '12px',
    fontWeight: 600
  },
  productTrend: {
    fontSize: '12px',
    fontWeight: 600
  },
  rightColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px'
  },
  mixContent: {
    padding: '20px 24px'
  },
  mixBar: {
    display: 'flex',
    height: '32px',
    borderRadius: '8px',
    overflow: 'hidden',
    marginBottom: '20px'
  },
  mixSegment: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#ffffff',
    fontSize: '12px',
    fontWeight: 600
  },
  mixLegend: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  mixLegendItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  mixDot: {
    width: '12px',
    height: '12px',
    borderRadius: '4px'
  },
  mixLegendInfo: {},
  mixLegendLabel: {
    display: 'block',
    fontSize: '13px',
    fontWeight: 500
  },
  mixLegendValue: {
    fontSize: '12px',
    color: 'var(--color-text-muted)'
  },
  newBadge: {
    padding: '4px 10px',
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
    borderRadius: '12px',
    fontSize: '11px',
    fontWeight: 600,
    color: '#22c55e'
  },
  newProductsList: {
    padding: '16px 24px'
  },
  newProductRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 0',
    borderBottom: '1px solid var(--color-border)'
  },
  newProductInfo: {},
  newProductName: {
    display: 'block',
    fontWeight: 600,
    marginBottom: '2px'
  },
  newProductLaunch: {
    fontSize: '12px',
    color: 'var(--color-text-muted)'
  },
  newProductStats: {
    textAlign: 'right'
  },
  newProductRevenue: {
    display: 'block',
    fontWeight: 600,
    marginBottom: '4px'
  },
  newProductMeta: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '12px'
  },
  trendBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    padding: '2px 8px',
    borderRadius: '8px',
    fontSize: '11px',
    fontWeight: 600,
    textTransform: 'capitalize'
  },
  actionBtn: {
    padding: '8px 14px',
    backgroundColor: 'var(--color-surface-2)',
    border: '1px solid var(--color-border)',
    borderRadius: '8px',
    color: 'var(--color-text)',
    fontSize: '13px',
    cursor: 'pointer'
  },
  underperformersList: {
    padding: '16px 24px'
  },
  underperformerRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    padding: '16px 0',
    borderBottom: '1px solid var(--color-border)'
  },
  underperformerInfo: {
    minWidth: '160px'
  },
  underperformerName: {
    display: 'block',
    fontWeight: 600
  },
  underperformerCategory: {
    fontSize: '12px',
    color: 'var(--color-text-muted)'
  },
  underperformerStats: {
    display: 'flex',
    gap: '24px'
  },
  underperformerStat: {
    textAlign: 'center'
  },
  underperformerValue: {
    display: 'block',
    fontWeight: 600
  },
  underperformerLabel: {
    fontSize: '10px',
    color: 'var(--color-text-muted)',
    textTransform: 'uppercase'
  },
  underperformerTrend: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    fontWeight: 600
  },
  underperformerReason: {
    flex: 1,
    fontSize: '13px',
    color: 'var(--color-text-muted)',
    fontStyle: 'italic'
  },
  underperformerActions: {
    display: 'flex',
    gap: '8px'
  },
  underperformerBtn: {
    padding: '8px 14px',
    backgroundColor: 'var(--color-surface-2)',
    border: '1px solid var(--color-border)',
    borderRadius: '8px',
    color: 'var(--color-text)',
    fontSize: '12px',
    cursor: 'pointer'
  },
  underperformerBtnDanger: {
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    borderColor: 'rgba(239, 68, 68, 0.3)',
    color: '#ef4444'
  }
};

export default ProductAnalytics;