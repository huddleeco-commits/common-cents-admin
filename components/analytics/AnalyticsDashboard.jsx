/**
 * AnalyticsDashboard
 * 
 * Main analytics overview - the data command center.
 * - Key metrics at a glance
 * - Revenue trends
 * - Customer insights
 * - Product performance
 * - AI-powered insights
 * - Customizable date ranges
 * 
 * Works for any industry via brain.json configuration.
 */

import React, { useState, useEffect } from 'react';
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  ShoppingCart,
  Package,
  Calendar,
  Download,
  RefreshCw,
  Zap,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  Target,
  Clock,
  Star,
  ChevronRight,
  Filter,
  MoreHorizontal
} from 'lucide-react';

export function AnalyticsDashboard() {
  const [dateRange, setDateRange] = useState('7d');
  const [compareMode, setCompareMode] = useState(true);
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState(null);

  // Date range options
  const dateRanges = [
    { id: 'today', label: 'Today' },
    { id: '7d', label: '7 Days' },
    { id: '30d', label: '30 Days' },
    { id: '90d', label: '90 Days' },
    { id: 'ytd', label: 'Year to Date' },
    { id: 'custom', label: 'Custom' }
  ];

  // Mock analytics data
  useEffect(() => {
    setTimeout(() => {
      setMetrics({
        revenue: {
          current: 48750.00,
          previous: 42300.00,
          change: 15.2,
          trend: 'up'
        },
        orders: {
          current: 847,
          previous: 756,
          change: 12.0,
          trend: 'up'
        },
        customers: {
          current: 234,
          previous: 198,
          change: 18.2,
          trend: 'up',
          newCustomers: 67,
          returning: 167
        },
        avgOrderValue: {
          current: 57.56,
          previous: 55.95,
          change: 2.9,
          trend: 'up'
        },
        conversionRate: {
          current: 3.8,
          previous: 3.2,
          change: 18.8,
          trend: 'up'
        },
        traffic: {
          current: 22340,
          previous: 23625,
          change: -5.4,
          trend: 'down'
        },

        // Revenue chart data
        revenueChart: [
          { date: 'Mon', revenue: 5200, orders: 98, lastWeek: 4800 },
          { date: 'Tue', revenue: 6100, orders: 112, lastWeek: 5400 },
          { date: 'Wed', revenue: 7800, orders: 134, lastWeek: 6200 },
          { date: 'Thu', revenue: 6900, orders: 118, lastWeek: 5800 },
          { date: 'Fri', revenue: 8200, orders: 145, lastWeek: 7100 },
          { date: 'Sat', revenue: 9100, orders: 156, lastWeek: 8200 },
          { date: 'Sun', revenue: 5450, orders: 84, lastWeek: 4800 }
        ],

        // Top products
        topProducts: [
          { id: 1, name: 'Classic Burger', orders: 234, revenue: 2808.00, trend: 12 },
          { id: 2, name: 'Chicken Wings', orders: 198, revenue: 2970.00, trend: 8 },
          { id: 3, name: 'Caesar Salad', orders: 167, revenue: 1837.00, trend: -3 },
          { id: 4, name: 'Margherita Pizza', orders: 145, revenue: 2175.00, trend: 15 },
          { id: 5, name: 'Fish & Chips', orders: 123, revenue: 1722.00, trend: 5 }
        ],

        // Customer segments performance
        customerSegments: [
          { name: 'VIP', customers: 45, revenue: 12400, avgOrder: 89.50 },
          { name: 'Regular', customers: 167, revenue: 28500, avgOrder: 52.30 },
          { name: 'New', customers: 67, revenue: 7850, avgOrder: 38.75 }
        ],

        // Peak hours
        peakHours: [
          { hour: '11am', orders: 45 },
          { hour: '12pm', orders: 89 },
          { hour: '1pm', orders: 78 },
          { hour: '5pm', orders: 56 },
          { hour: '6pm', orders: 92 },
          { hour: '7pm', orders: 98 },
          { hour: '8pm', orders: 67 }
        ],

        // AI Insights
        aiInsights: [
          {
            type: 'opportunity',
            title: 'Weekend Revenue Spike',
            message: 'Saturday revenue is 32% higher than weekday average. Consider weekend-specific promotions.',
            impact: '+$2,400/week potential'
          },
          {
            type: 'warning',
            title: 'Traffic Down, Conversion Up',
            message: 'Website traffic decreased 5.4% but conversion rate improved 18.8%. Your marketing is attracting better-qualified visitors.',
            impact: 'Positive trend'
          },
          {
            type: 'insight',
            title: 'VIP Segment Growing',
            message: '12 customers upgraded to VIP status this week. Consider a loyalty program expansion.',
            impact: '+$3,200 lifetime value'
          }
        ]
      });
      setLoading(false);
    }, 800);
  }, [dateRange]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  };

  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  const formatPercent = (num) => {
    return `${num > 0 ? '+' : ''}${num.toFixed(1)}%`;
  };

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <RefreshCw size={32} style={{ animation: 'spin 1s linear infinite' }} />
        <p>Loading analytics...</p>
      </div>
    );
  }

  const maxRevenue = Math.max(...metrics.revenueChart.map(d => Math.max(d.revenue, d.lastWeek)));
  const maxOrders = Math.max(...metrics.peakHours.map(d => d.orders));

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <h1 style={styles.title}>Analytics</h1>
          <span style={styles.subtitle}>Business performance insights</span>
        </div>
        <div style={styles.headerActions}>
          <div style={styles.dateRangePicker}>
            {dateRanges.slice(0, 5).map(range => (
              <button
                key={range.id}
                style={{
                  ...styles.dateRangeBtn,
                  ...(dateRange === range.id ? styles.dateRangeBtnActive : {})
                }}
                onClick={() => setDateRange(range.id)}
              >
                {range.label}
              </button>
            ))}
          </div>
          <button style={styles.actionBtn}>
            <Download size={16} />
            Export
          </button>
          <button style={styles.refreshBtn}>
            <RefreshCw size={16} />
          </button>
        </div>
      </div>

      {/* AI Insights Banner */}
      <div style={styles.aiInsightsBanner}>
        <div style={styles.aiHeader}>
          <div style={styles.aiIcon}>
            <Zap size={20} />
          </div>
          <h3 style={styles.aiTitle}>AI Insights</h3>
          <span style={styles.insightCount}>{metrics.aiInsights.length} new insights</span>
        </div>
        <div style={styles.insightsScroll}>
          {metrics.aiInsights.map((insight, index) => (
            <div key={index} style={styles.insightCard}>
              <div style={{
                ...styles.insightDot,
                backgroundColor: insight.type === 'opportunity' ? '#22c55e' :
                                 insight.type === 'warning' ? '#f97316' : '#3b82f6'
              }} />
              <div style={styles.insightContent}>
                <h4 style={styles.insightTitle}>{insight.title}</h4>
                <p style={styles.insightMessage}>{insight.message}</p>
                <span style={styles.insightImpact}>{insight.impact}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Key Metrics */}
      <div style={styles.metricsGrid}>
        <div style={styles.metricCard}>
          <div style={styles.metricHeader}>
            <div style={{...styles.metricIcon, backgroundColor: 'rgba(34, 197, 94, 0.1)'}}>
              <DollarSign size={20} color="#22c55e" />
            </div>
            <span style={styles.metricLabel}>Revenue</span>
          </div>
          <div style={styles.metricValue}>{formatCurrency(metrics.revenue.current)}</div>
          <div style={styles.metricChange}>
            {metrics.revenue.trend === 'up' ? 
              <ArrowUpRight size={16} color="#22c55e" /> : 
              <ArrowDownRight size={16} color="#ef4444" />
            }
            <span style={{
              color: metrics.revenue.trend === 'up' ? '#22c55e' : '#ef4444'
            }}>
              {formatPercent(metrics.revenue.change)}
            </span>
            <span style={styles.metricCompare}>vs last period</span>
          </div>
        </div>

        <div style={styles.metricCard}>
          <div style={styles.metricHeader}>
            <div style={{...styles.metricIcon, backgroundColor: 'rgba(59, 130, 246, 0.1)'}}>
              <ShoppingCart size={20} color="#3b82f6" />
            </div>
            <span style={styles.metricLabel}>Orders</span>
          </div>
          <div style={styles.metricValue}>{formatNumber(metrics.orders.current)}</div>
          <div style={styles.metricChange}>
            {metrics.orders.trend === 'up' ? 
              <ArrowUpRight size={16} color="#22c55e" /> : 
              <ArrowDownRight size={16} color="#ef4444" />
            }
            <span style={{
              color: metrics.orders.trend === 'up' ? '#22c55e' : '#ef4444'
            }}>
              {formatPercent(metrics.orders.change)}
            </span>
            <span style={styles.metricCompare}>vs last period</span>
          </div>
        </div>

        <div style={styles.metricCard}>
          <div style={styles.metricHeader}>
            <div style={{...styles.metricIcon, backgroundColor: 'rgba(139, 92, 246, 0.1)'}}>
              <Users size={20} color="#8b5cf6" />
            </div>
            <span style={styles.metricLabel}>Customers</span>
          </div>
          <div style={styles.metricValue}>{formatNumber(metrics.customers.current)}</div>
          <div style={styles.metricChange}>
            {metrics.customers.trend === 'up' ? 
              <ArrowUpRight size={16} color="#22c55e" /> : 
              <ArrowDownRight size={16} color="#ef4444" />
            }
            <span style={{
              color: metrics.customers.trend === 'up' ? '#22c55e' : '#ef4444'
            }}>
              {formatPercent(metrics.customers.change)}
            </span>
            <span style={styles.metricCompare}>
              {metrics.customers.newCustomers} new
            </span>
          </div>
        </div>

        <div style={styles.metricCard}>
          <div style={styles.metricHeader}>
            <div style={{...styles.metricIcon, backgroundColor: 'rgba(249, 115, 22, 0.1)'}}>
              <Target size={20} color="#f97316" />
            </div>
            <span style={styles.metricLabel}>Avg Order Value</span>
          </div>
          <div style={styles.metricValue}>{formatCurrency(metrics.avgOrderValue.current)}</div>
          <div style={styles.metricChange}>
            {metrics.avgOrderValue.trend === 'up' ? 
              <ArrowUpRight size={16} color="#22c55e" /> : 
              <ArrowDownRight size={16} color="#ef4444" />
            }
            <span style={{
              color: metrics.avgOrderValue.trend === 'up' ? '#22c55e' : '#ef4444'
            }}>
              {formatPercent(metrics.avgOrderValue.change)}
            </span>
            <span style={styles.metricCompare}>vs last period</span>
          </div>
        </div>

        <div style={styles.metricCard}>
          <div style={styles.metricHeader}>
            <div style={{...styles.metricIcon, backgroundColor: 'rgba(236, 72, 153, 0.1)'}}>
              <TrendingUp size={20} color="#ec4899" />
            </div>
            <span style={styles.metricLabel}>Conversion Rate</span>
          </div>
          <div style={styles.metricValue}>{metrics.conversionRate.current}%</div>
          <div style={styles.metricChange}>
            {metrics.conversionRate.trend === 'up' ? 
              <ArrowUpRight size={16} color="#22c55e" /> : 
              <ArrowDownRight size={16} color="#ef4444" />
            }
            <span style={{
              color: metrics.conversionRate.trend === 'up' ? '#22c55e' : '#ef4444'
            }}>
              {formatPercent(metrics.conversionRate.change)}
            </span>
            <span style={styles.metricCompare}>vs last period</span>
          </div>
        </div>

        <div style={styles.metricCard}>
          <div style={styles.metricHeader}>
            <div style={{...styles.metricIcon, backgroundColor: 'rgba(6, 182, 212, 0.1)'}}>
              <Eye size={20} color="#06b6d4" />
            </div>
            <span style={styles.metricLabel}>Traffic</span>
          </div>
          <div style={styles.metricValue}>{formatNumber(metrics.traffic.current)}</div>
          <div style={styles.metricChange}>
            {metrics.traffic.trend === 'up' ? 
              <ArrowUpRight size={16} color="#22c55e" /> : 
              <ArrowDownRight size={16} color="#ef4444" />
            }
            <span style={{
              color: metrics.traffic.trend === 'up' ? '#22c55e' : '#ef4444'
            }}>
              {formatPercent(metrics.traffic.change)}
            </span>
            <span style={styles.metricCompare}>visitors</span>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div style={styles.chartsRow}>
        {/* Revenue Chart */}
        <div style={styles.chartCard}>
          <div style={styles.chartHeader}>
            <h3 style={styles.chartTitle}>Revenue Trend</h3>
            <div style={styles.chartLegend}>
              <span style={styles.legendItem}>
                <span style={{...styles.legendDot, backgroundColor: 'var(--color-primary)'}} />
                This Week
              </span>
              {compareMode && (
                <span style={styles.legendItem}>
                  <span style={{...styles.legendDot, backgroundColor: 'var(--color-text-muted)', opacity: 0.5}} />
                  Last Week
                </span>
              )}
            </div>
          </div>
          <div style={styles.chartContainer}>
            <div style={styles.barChart}>
              {metrics.revenueChart.map((day, index) => (
                <div key={index} style={styles.barGroup}>
                  <div style={styles.barValues}>
                    <span style={styles.barValue}>{formatCurrency(day.revenue)}</span>
                  </div>
                  <div style={styles.barsContainer}>
                    {compareMode && (
                      <div style={{
                        ...styles.bar,
                        ...styles.barCompare,
                        height: `${(day.lastWeek / maxRevenue) * 150}px`
                      }} />
                    )}
                    <div style={{
                      ...styles.bar,
                      ...styles.barPrimary,
                      height: `${(day.revenue / maxRevenue) * 150}px`
                    }} />
                  </div>
                  <span style={styles.barLabel}>{day.date}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Peak Hours */}
        <div style={styles.chartCard}>
          <div style={styles.chartHeader}>
            <h3 style={styles.chartTitle}>Peak Hours</h3>
            <Clock size={16} color="var(--color-text-muted)" />
          </div>
          <div style={styles.peakHoursChart}>
            {metrics.peakHours.map((hour, index) => (
              <div key={index} style={styles.hourRow}>
                <span style={styles.hourLabel}>{hour.hour}</span>
                <div style={styles.hourBarContainer}>
                  <div style={{
                    ...styles.hourBar,
                    width: `${(hour.orders / maxOrders) * 100}%`
                  }} />
                </div>
                <span style={styles.hourValue}>{hour.orders}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div style={styles.bottomRow}>
        {/* Top Products */}
        <div style={styles.tableCard}>
          <div style={styles.tableHeader}>
            <h3 style={styles.tableTitle}>Top Products</h3>
            <button style={styles.viewAllBtn}>
              View All <ChevronRight size={14} />
            </button>
          </div>
          <div style={styles.tableContent}>
            {metrics.topProducts.map((product, index) => (
              <div key={product.id} style={styles.productRow}>
                <span style={styles.productRank}>#{index + 1}</span>
                <div style={styles.productInfo}>
                  <span style={styles.productName}>{product.name}</span>
                  <span style={styles.productOrders}>{product.orders} orders</span>
                </div>
                <div style={styles.productStats}>
                  <span style={styles.productRevenue}>{formatCurrency(product.revenue)}</span>
                  <span style={{
                    ...styles.productTrend,
                    color: product.trend >= 0 ? '#22c55e' : '#ef4444'
                  }}>
                    {product.trend >= 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                    {Math.abs(product.trend)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Customer Segments */}
        <div style={styles.tableCard}>
          <div style={styles.tableHeader}>
            <h3 style={styles.tableTitle}>Customer Segments</h3>
            <button style={styles.viewAllBtn}>
              View All <ChevronRight size={14} />
            </button>
          </div>
          <div style={styles.segmentsContent}>
            {metrics.customerSegments.map((segment, index) => (
              <div key={index} style={styles.segmentCard}>
                <div style={styles.segmentHeader}>
                  <span style={styles.segmentName}>{segment.name}</span>
                  <span style={styles.segmentCustomers}>{segment.customers} customers</span>
                </div>
                <div style={styles.segmentStats}>
                  <div style={styles.segmentStat}>
                    <span style={styles.segmentStatValue}>{formatCurrency(segment.revenue)}</span>
                    <span style={styles.segmentStatLabel}>Revenue</span>
                  </div>
                  <div style={styles.segmentStat}>
                    <span style={styles.segmentStatValue}>{formatCurrency(segment.avgOrder)}</span>
                    <span style={styles.segmentStatLabel}>Avg Order</span>
                  </div>
                </div>
                <div style={styles.segmentBar}>
                  <div style={{
                    ...styles.segmentBarFill,
                    width: `${(segment.revenue / metrics.customerSegments.reduce((a, b) => a + b.revenue, 0)) * 100}%`,
                    backgroundColor: index === 0 ? '#8b5cf6' : index === 1 ? '#3b82f6' : '#22c55e'
                  }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div style={styles.quickStatsCard}>
          <h3 style={styles.quickStatsTitle}>Quick Stats</h3>
          <div style={styles.quickStatsList}>
            <div style={styles.quickStat}>
              <div style={styles.quickStatIcon}>
                <Star size={16} color="#f59e0b" />
              </div>
              <div style={styles.quickStatInfo}>
                <span style={styles.quickStatValue}>4.8</span>
                <span style={styles.quickStatLabel}>Avg Rating</span>
              </div>
            </div>
            <div style={styles.quickStat}>
              <div style={styles.quickStatIcon}>
                <Clock size={16} color="#3b82f6" />
              </div>
              <div style={styles.quickStatInfo}>
                <span style={styles.quickStatValue}>18 min</span>
                <span style={styles.quickStatLabel}>Avg Prep Time</span>
              </div>
            </div>
            <div style={styles.quickStat}>
              <div style={styles.quickStatIcon}>
                <Users size={16} color="#8b5cf6" />
              </div>
              <div style={styles.quickStatInfo}>
                <span style={styles.quickStatValue}>67%</span>
                <span style={styles.quickStatLabel}>Return Rate</span>
              </div>
            </div>
            <div style={styles.quickStat}>
              <div style={styles.quickStatIcon}>
                <Package size={16} color="#22c55e" />
              </div>
              <div style={styles.quickStatInfo}>
                <span style={styles.quickStatValue}>94%</span>
                <span style={styles.quickStatLabel}>Fulfillment</span>
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
  dateRangePicker: {
    display: 'flex',
    backgroundColor: 'var(--color-surface)',
    borderRadius: '10px',
    padding: '4px',
    border: '1px solid var(--color-border)'
  },
  dateRangeBtn: {
    padding: '8px 14px',
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: '8px',
    color: 'var(--color-text-muted)',
    fontSize: '13px',
    cursor: 'pointer',
    transition: 'all 0.2s'
  },
  dateRangeBtnActive: {
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
  refreshBtn: {
    padding: '10px',
    backgroundColor: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    borderRadius: '10px',
    color: 'var(--color-text)',
    cursor: 'pointer'
  },
  aiInsightsBanner: {
    backgroundColor: 'rgba(139, 92, 246, 0.1)',
    borderRadius: '16px',
    border: '1px solid rgba(139, 92, 246, 0.2)',
    padding: '20px 24px',
    marginBottom: '24px'
  },
  aiHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '16px'
  },
  aiIcon: {
    width: '36px',
    height: '36px',
    borderRadius: '10px',
    backgroundColor: '#8b5cf6',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#ffffff'
  },
  aiTitle: {
    fontSize: '16px',
    fontWeight: 600,
    margin: 0,
    color: '#8b5cf6'
  },
  insightCount: {
    marginLeft: 'auto',
    fontSize: '13px',
    color: 'var(--color-text-muted)'
  },
  insightsScroll: {
    display: 'flex',
    gap: '16px',
    overflowX: 'auto',
    paddingBottom: '8px'
  },
  insightCard: {
    flex: '0 0 320px',
    display: 'flex',
    gap: '12px',
    padding: '16px',
    backgroundColor: 'var(--color-surface)',
    borderRadius: '12px',
    border: '1px solid var(--color-border)'
  },
  insightDot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    marginTop: '6px',
    flexShrink: 0
  },
  insightContent: {
    flex: 1
  },
  insightTitle: {
    fontSize: '14px',
    fontWeight: 600,
    margin: '0 0 6px 0'
  },
  insightMessage: {
    fontSize: '13px',
    color: 'var(--color-text-muted)',
    margin: '0 0 8px 0',
    lineHeight: 1.5
  },
  insightImpact: {
    fontSize: '12px',
    fontWeight: 600,
    color: '#22c55e'
  },
  metricsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(6, 1fr)',
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
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '16px'
  },
  metricIcon: {
    width: '40px',
    height: '40px',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  metricLabel: {
    fontSize: '13px',
    color: 'var(--color-text-muted)'
  },
  metricValue: {
    fontSize: '24px',
    fontWeight: 700,
    marginBottom: '8px'
  },
  metricChange: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '13px'
  },
  metricCompare: {
    color: 'var(--color-text-muted)'
  },
  chartsRow: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    gap: '24px',
    marginBottom: '24px'
  },
  chartCard: {
    padding: '24px',
    backgroundColor: 'var(--color-surface)',
    borderRadius: '16px',
    border: '1px solid var(--color-border)'
  },
  chartHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px'
  },
  chartTitle: {
    fontSize: '16px',
    fontWeight: 600,
    margin: 0
  },
  chartLegend: {
    display: 'flex',
    gap: '16px'
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
  chartContainer: {
    height: '200px'
  },
  barChart: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: '100%',
    gap: '12px'
  },
  barGroup: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px'
  },
  barValues: {
    height: '20px'
  },
  barValue: {
    fontSize: '11px',
    fontWeight: 600,
    color: 'var(--color-text-muted)'
  },
  barsContainer: {
    display: 'flex',
    alignItems: 'flex-end',
    gap: '4px',
    height: '150px'
  },
  bar: {
    width: '24px',
    borderRadius: '4px 4px 0 0',
    transition: 'height 0.3s'
  },
  barPrimary: {
    backgroundColor: 'var(--color-primary)'
  },
  barCompare: {
    backgroundColor: 'var(--color-surface-2)',
    opacity: 0.5
  },
  barLabel: {
    fontSize: '12px',
    color: 'var(--color-text-muted)'
  },
  peakHoursChart: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  hourRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  hourLabel: {
    width: '50px',
    fontSize: '13px',
    color: 'var(--color-text-muted)'
  },
  hourBarContainer: {
    flex: 1,
    height: '24px',
    backgroundColor: 'var(--color-surface-2)',
    borderRadius: '6px',
    overflow: 'hidden'
  },
  hourBar: {
    height: '100%',
    backgroundColor: 'var(--color-primary)',
    borderRadius: '6px',
    transition: 'width 0.3s'
  },
  hourValue: {
    width: '30px',
    fontSize: '13px',
    fontWeight: 600,
    textAlign: 'right'
  },
  bottomRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 300px',
    gap: '24px'
  },
  tableCard: {
    backgroundColor: 'var(--color-surface)',
    borderRadius: '16px',
    border: '1px solid var(--color-border)',
    overflow: 'hidden'
  },
  tableHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 24px',
    borderBottom: '1px solid var(--color-border)'
  },
  tableTitle: {
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
  tableContent: {
    padding: '12px 24px'
  },
  productRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    padding: '12px 0',
    borderBottom: '1px solid var(--color-border)'
  },
  productRank: {
    width: '28px',
    height: '28px',
    borderRadius: '8px',
    backgroundColor: 'var(--color-surface-2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '12px',
    fontWeight: 600
  },
  productInfo: {
    flex: 1
  },
  productName: {
    display: 'block',
    fontWeight: 500
  },
  productOrders: {
    fontSize: '12px',
    color: 'var(--color-text-muted)'
  },
  productStats: {
    textAlign: 'right'
  },
  productRevenue: {
    display: 'block',
    fontWeight: 600
  },
  productTrend: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    fontSize: '12px',
    justifyContent: 'flex-end'
  },
  segmentsContent: {
    padding: '16px 24px'
  },
  segmentCard: {
    padding: '16px 0',
    borderBottom: '1px solid var(--color-border)'
  },
  segmentHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '12px'
  },
  segmentName: {
    fontWeight: 600
  },
  segmentCustomers: {
    fontSize: '12px',
    color: 'var(--color-text-muted)'
  },
  segmentStats: {
    display: 'flex',
    gap: '24px',
    marginBottom: '12px'
  },
  segmentStat: {},
  segmentStatValue: {
    display: 'block',
    fontSize: '16px',
    fontWeight: 600
  },
  segmentStatLabel: {
    fontSize: '11px',
    color: 'var(--color-text-muted)'
  },
  segmentBar: {
    height: '4px',
    backgroundColor: 'var(--color-surface-2)',
    borderRadius: '2px',
    overflow: 'hidden'
  },
  segmentBarFill: {
    height: '100%',
    borderRadius: '2px'
  },
  quickStatsCard: {
    padding: '24px',
    backgroundColor: 'var(--color-surface)',
    borderRadius: '16px',
    border: '1px solid var(--color-border)'
  },
  quickStatsTitle: {
    fontSize: '16px',
    fontWeight: 600,
    margin: '0 0 20px 0'
  },
  quickStatsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  quickStat: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    padding: '16px',
    backgroundColor: 'var(--color-surface-2)',
    borderRadius: '12px'
  },
  quickStatIcon: {
    width: '40px',
    height: '40px',
    borderRadius: '10px',
    backgroundColor: 'var(--color-surface)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  quickStatInfo: {},
  quickStatValue: {
    display: 'block',
    fontSize: '18px',
    fontWeight: 700
  },
  quickStatLabel: {
    fontSize: '12px',
    color: 'var(--color-text-muted)'
  }
};

export default AnalyticsDashboard;