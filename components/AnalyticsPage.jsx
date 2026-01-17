/**
 * AnalyticsPage
 * 
 * Full analytics dashboard for business metrics.
 * Revenue, traffic, conversions, top items - all with date filtering.
 * Works with or without AI Manager.
 */

import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import {
  DollarSign,
  Users,
  Eye,
  ShoppingCart,
  TrendingUp,
  TrendingDown,
  Calendar,
  Download,
  RefreshCw,
  ArrowUpRight,
  ArrowDownRight,
  BarChart3,
  PieChart,
  Activity
} from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_URL || '/api';

export function AnalyticsPage() {
  const { business, brain } = useOutletContext();
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [analytics, setAnalytics] = useState(null);
  
  const [dateRange, setDateRange] = useState('7d');
  const [customStart, setCustomStart] = useState('');
  const [customEnd, setCustomEnd] = useState('');

  // Dynamic labels from brain
  const labels = brain?.labels || {
    revenue: 'Revenue',
    orders: 'Orders',
    customers: 'Customers',
    items: 'Items',
    views: 'Page Views'
  };

  useEffect(() => {
    loadAnalytics();
  }, [dateRange, customStart, customEnd]);

  const loadAnalytics = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const token = localStorage.getItem('token');
      let url = `${API_BASE}/analytics?range=${dateRange}`;
      
      if (dateRange === 'custom' && customStart && customEnd) {
        url += `&start=${customStart}&end=${customEnd}`;
      }
      
      const response = await fetch(url, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (!response.ok) throw new Error('Failed to load analytics');
      
      const data = await response.json();
      setAnalytics(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleExport = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE}/analytics/export?range=${dateRange}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `analytics-${dateRange}-${Date.now()}.csv`;
      a.click();
    } catch (err) {
      setError('Export failed');
    }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(value || 0);
  };

  const formatNumber = (value) => {
    return new Intl.NumberFormat('en-US').format(value || 0);
  };

  const formatPercent = (value) => {
    const num = parseFloat(value) || 0;
    const sign = num >= 0 ? '+' : '';
    return `${sign}${num.toFixed(1)}%`;
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>Analytics</h1>
          <p style={styles.subtitle}>
            Performance metrics for {business?.name || 'your business'}
          </p>
        </div>
        <div style={styles.headerActions}>
          <button style={styles.refreshButton} onClick={loadAnalytics} disabled={loading}>
            <RefreshCw size={16} className={loading ? 'spinning' : ''} />
            Refresh
          </button>
          <button style={styles.exportButton} onClick={handleExport}>
            <Download size={16} />
            Export
          </button>
        </div>
      </div>

      {/* Date Range Selector */}
      <div style={styles.dateRangeBar}>
        <div style={styles.dateRangeButtons}>
          {[
            { value: '24h', label: '24 Hours' },
            { value: '7d', label: '7 Days' },
            { value: '30d', label: '30 Days' },
            { value: '90d', label: '90 Days' },
            { value: 'ytd', label: 'Year to Date' },
            { value: 'custom', label: 'Custom' }
          ].map(range => (
            <button
              key={range.value}
              style={{
                ...styles.dateRangeButton,
                ...(dateRange === range.value ? styles.dateRangeButtonActive : {})
              }}
              onClick={() => setDateRange(range.value)}
            >
              {range.label}
            </button>
          ))}
        </div>
        
        {dateRange === 'custom' && (
          <div style={styles.customDateInputs}>
            <input
              type="date"
              value={customStart}
              onChange={(e) => setCustomStart(e.target.value)}
              style={styles.dateInput}
            />
            <span style={styles.dateSeparator}>to</span>
            <input
              type="date"
              value={customEnd}
              onChange={(e) => setCustomEnd(e.target.value)}
              style={styles.dateInput}
            />
          </div>
        )}
      </div>

      {/* Error State */}
      {error && (
        <div style={styles.errorBanner}>
          {error}
          <button onClick={loadAnalytics} style={styles.retryButton}>Retry</button>
        </div>
      )}

      {/* Loading State */}
      {loading ? (
        <div style={styles.loadingState}>
          <Activity size={32} style={{ animation: 'pulse 1s infinite' }} />
          <p>Loading analytics...</p>
        </div>
      ) : (
        <>
          {/* Key Metrics Cards */}
          <div style={styles.metricsGrid}>
            <MetricCard
              icon={DollarSign}
              label={labels.revenue}
              value={formatCurrency(analytics?.revenue?.total)}
              change={analytics?.revenue?.change}
              formatChange={formatPercent}
            />
            <MetricCard
              icon={ShoppingCart}
              label={labels.orders}
              value={formatNumber(analytics?.orders?.total)}
              change={analytics?.orders?.change}
              formatChange={formatPercent}
            />
            <MetricCard
              icon={Users}
              label={labels.customers}
              value={formatNumber(analytics?.customers?.total)}
              change={analytics?.customers?.change}
              formatChange={formatPercent}
            />
            <MetricCard
              icon={Eye}
              label={labels.views}
              value={formatNumber(analytics?.views?.total)}
              change={analytics?.views?.change}
              formatChange={formatPercent}
            />
          </div>

          {/* Charts Row */}
          <div style={styles.chartsRow}>
            {/* Revenue Chart */}
            <div style={styles.chartCard}>
              <div style={styles.chartHeader}>
                <h3 style={styles.chartTitle}>
                  <BarChart3 size={18} />
                  {labels.revenue} Over Time
                </h3>
              </div>
              <div style={styles.chartBody}>
                <SimpleBarChart data={analytics?.revenue?.timeline || []} />
              </div>
            </div>

            {/* Traffic Chart */}
            <div style={styles.chartCard}>
              <div style={styles.chartHeader}>
                <h3 style={styles.chartTitle}>
                  <Activity size={18} />
                  Traffic
                </h3>
              </div>
              <div style={styles.chartBody}>
                <SimpleLineChart data={analytics?.views?.timeline || []} />
              </div>
            </div>
          </div>

          {/* Secondary Metrics */}
          <div style={styles.secondaryRow}>
            {/* Top Items */}
            <div style={styles.listCard}>
              <h3 style={styles.listTitle}>Top {labels.items}</h3>
              <div style={styles.listContent}>
                {(analytics?.topItems || []).length === 0 ? (
                  <p style={styles.emptyList}>No data yet</p>
                ) : (
                  analytics.topItems.map((item, idx) => (
                    <div key={idx} style={styles.listItem}>
                      <span style={styles.listRank}>#{idx + 1}</span>
                      <span style={styles.listName}>{item.name}</span>
                      <span style={styles.listValue}>{formatCurrency(item.revenue)}</span>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Traffic Sources */}
            <div style={styles.listCard}>
              <h3 style={styles.listTitle}>Traffic Sources</h3>
              <div style={styles.listContent}>
                {(analytics?.trafficSources || []).length === 0 ? (
                  <p style={styles.emptyList}>No data yet</p>
                ) : (
                  analytics.trafficSources.map((source, idx) => (
                    <div key={idx} style={styles.listItem}>
                      <span style={styles.listName}>{source.name}</span>
                      <div style={styles.sourceBar}>
                        <div 
                          style={{
                            ...styles.sourceBarFill,
                            width: `${source.percent}%`
                          }}
                        />
                      </div>
                      <span style={styles.listPercent}>{source.percent}%</span>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Conversion Funnel */}
            <div style={styles.listCard}>
              <h3 style={styles.listTitle}>Conversion Funnel</h3>
              <div style={styles.listContent}>
                {(analytics?.funnel || []).length === 0 ? (
                  <p style={styles.emptyList}>No data yet</p>
                ) : (
                  analytics.funnel.map((step, idx) => (
                    <div key={idx} style={styles.funnelItem}>
                      <div style={styles.funnelStep}>
                        <span style={styles.funnelName}>{step.name}</span>
                        <span style={styles.funnelCount}>{formatNumber(step.count)}</span>
                      </div>
                      <div style={styles.funnelBar}>
                        <div 
                          style={{
                            ...styles.funnelBarFill,
                            width: `${step.percent}%`
                          }}
                        />
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* AI Insights (if available) */}
          {analytics?.insights && analytics.insights.length > 0 && (
            <div style={styles.insightsCard}>
              <h3 style={styles.insightsTitle}>
                <TrendingUp size={18} />
                AI Insights
              </h3>
              <div style={styles.insightsList}>
                {analytics.insights.map((insight, idx) => (
                  <div key={idx} style={styles.insightItem}>
                    <span style={styles.insightIcon}>💡</span>
                    <span style={styles.insightText}>{insight}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

// Metric Card Component
function MetricCard({ icon: Icon, label, value, change, formatChange }) {
  const isPositive = parseFloat(change) >= 0;
  
  return (
    <div style={styles.metricCard}>
      <div style={styles.metricIcon}>
        <Icon size={22} />
      </div>
      <div style={styles.metricInfo}>
        <span style={styles.metricLabel}>{label}</span>
        <span style={styles.metricValue}>{value}</span>
        {change !== undefined && (
          <span style={{
            ...styles.metricChange,
            color: isPositive ? '#22c55e' : '#ef4444'
          }}>
            {isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
            {formatChange(change)} vs previous
          </span>
        )}
      </div>
    </div>
  );
}

// Simple Bar Chart Component (no external dependencies)
function SimpleBarChart({ data }) {
  if (!data || data.length === 0) {
    return <div style={styles.noChartData}>No data available</div>;
  }
  
  const maxValue = Math.max(...data.map(d => d.value));
  
  return (
    <div style={styles.simpleChart}>
      <div style={styles.barChartContainer}>
        {data.map((item, idx) => (
          <div key={idx} style={styles.barColumn}>
            <div 
              style={{
                ...styles.bar,
                height: `${(item.value / maxValue) * 100}%`
              }}
              title={`${item.label}: ${item.value}`}
            />
            <span style={styles.barLabel}>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Simple Line Chart Component (no external dependencies)
function SimpleLineChart({ data }) {
  if (!data || data.length === 0) {
    return <div style={styles.noChartData}>No data available</div>;
  }
  
  const maxValue = Math.max(...data.map(d => d.value));
  const points = data.map((d, i) => ({
    x: (i / (data.length - 1)) * 100,
    y: 100 - (d.value / maxValue) * 100
  }));
  
  const pathD = points.map((p, i) => 
    `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`
  ).join(' ');
  
  return (
    <div style={styles.simpleChart}>
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={styles.lineChartSvg}>
        <path
          d={pathD}
          fill="none"
          stroke="var(--color-primary)"
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
        />
        {points.map((p, i) => (
          <circle
            key={i}
            cx={p.x}
            cy={p.y}
            r="3"
            fill="var(--color-primary)"
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </svg>
      <div style={styles.lineChartLabels}>
        {data.map((item, idx) => (
          <span key={idx} style={styles.lineChartLabel}>{item.label}</span>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  },
  title: {
    fontSize: '24px',
    fontWeight: 700,
    margin: 0,
    fontFamily: 'var(--font-heading)'
  },
  subtitle: {
    fontSize: '14px',
    color: 'var(--color-text-muted)',
    margin: '4px 0 0 0'
  },
  headerActions: {
    display: 'flex',
    gap: '12px'
  },
  refreshButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 16px',
    backgroundColor: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    borderRadius: '8px',
    color: 'var(--color-text)',
    fontSize: '13px',
    cursor: 'pointer'
  },
  exportButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 16px',
    backgroundColor: 'var(--color-primary)',
    border: 'none',
    borderRadius: '8px',
    color: '#ffffff',
    fontSize: '13px',
    fontWeight: 600,
    cursor: 'pointer'
  },
  dateRangeBar: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    flexWrap: 'wrap'
  },
  dateRangeButtons: {
    display: 'flex',
    backgroundColor: 'var(--color-surface)',
    borderRadius: '8px',
    padding: '4px',
    gap: '4px'
  },
  dateRangeButton: {
    padding: '8px 14px',
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: '6px',
    color: 'var(--color-text-muted)',
    fontSize: '13px',
    cursor: 'pointer',
    transition: 'all 0.2s'
  },
  dateRangeButtonActive: {
    backgroundColor: 'var(--color-primary)',
    color: '#ffffff'
  },
  customDateInputs: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  },
  dateInput: {
    padding: '8px 12px',
    backgroundColor: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    borderRadius: '6px',
    color: 'var(--color-text)',
    fontSize: '13px'
  },
  dateSeparator: {
    color: 'var(--color-text-muted)',
    fontSize: '13px'
  },
  errorBanner: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '12px 16px',
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    border: '1px solid #ef4444',
    borderRadius: '8px',
    color: '#ef4444',
    fontSize: '14px'
  },
  retryButton: {
    padding: '6px 12px',
    backgroundColor: '#ef4444',
    border: 'none',
    borderRadius: '4px',
    color: '#ffffff',
    fontSize: '12px',
    cursor: 'pointer'
  },
  loadingState: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '80px',
    color: 'var(--color-text-muted)',
    gap: '16px'
  },
  metricsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '16px'
  },
  metricCard: {
    display: 'flex',
    gap: '16px',
    padding: '20px',
    backgroundColor: 'var(--color-surface)',
    borderRadius: '12px',
    border: '1px solid var(--color-border)'
  },
  metricIcon: {
    width: '48px',
    height: '48px',
    borderRadius: '12px',
    backgroundColor: 'var(--color-surface-2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'var(--color-primary)'
  },
  metricInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px'
  },
  metricLabel: {
    fontSize: '13px',
    color: 'var(--color-text-muted)'
  },
  metricValue: {
    fontSize: '24px',
    fontWeight: 700
  },
  metricChange: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    fontSize: '12px'
  },
  chartsRow: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '16px'
  },
  chartCard: {
    backgroundColor: 'var(--color-surface)',
    borderRadius: '12px',
    border: '1px solid var(--color-border)',
    overflow: 'hidden'
  },
  chartHeader: {
    padding: '16px 20px',
    borderBottom: '1px solid var(--color-border)'
  },
  chartTitle: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontSize: '15px',
    fontWeight: 600,
    margin: 0
  },
  chartBody: {
    padding: '20px',
    height: '200px'
  },
  simpleChart: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  barChartContainer: {
    flex: 1,
    display: 'flex',
    alignItems: 'flex-end',
    gap: '8px',
    paddingBottom: '24px'
  },
  barColumn: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100%',
    justifyContent: 'flex-end'
  },
  bar: {
    width: '100%',
    backgroundColor: 'var(--color-primary)',
    borderRadius: '4px 4px 0 0',
    minHeight: '4px',
    transition: 'height 0.3s'
  },
  barLabel: {
    fontSize: '10px',
    color: 'var(--color-text-muted)',
    marginTop: '8px',
    textAlign: 'center'
  },
  lineChartSvg: {
    flex: 1,
    width: '100%'
  },
  lineChartLabels: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: '8px'
  },
  lineChartLabel: {
    fontSize: '10px',
    color: 'var(--color-text-muted)'
  },
  noChartData: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    color: 'var(--color-text-muted)',
    fontSize: '14px'
  },
  secondaryRow: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '16px'
  },
  listCard: {
    backgroundColor: 'var(--color-surface)',
    borderRadius: '12px',
    border: '1px solid var(--color-border)',
    padding: '20px'
  },
  listTitle: {
    fontSize: '15px',
    fontWeight: 600,
    margin: '0 0 16px 0'
  },
  listContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  emptyList: {
    color: 'var(--color-text-muted)',
    fontSize: '13px',
    textAlign: 'center',
    padding: '20px 0'
  },
  listItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  listRank: {
    width: '28px',
    height: '28px',
    borderRadius: '6px',
    backgroundColor: 'var(--color-surface-2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '12px',
    fontWeight: 600,
    color: 'var(--color-text-muted)'
  },
  listName: {
    flex: 1,
    fontSize: '14px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  listValue: {
    fontSize: '14px',
    fontWeight: 600,
    color: 'var(--color-primary)'
  },
  listPercent: {
    fontSize: '13px',
    fontWeight: 600,
    minWidth: '40px',
    textAlign: 'right'
  },
  sourceBar: {
    flex: 1,
    height: '6px',
    backgroundColor: 'var(--color-surface-2)',
    borderRadius: '3px',
    overflow: 'hidden'
  },
  sourceBarFill: {
    height: '100%',
    backgroundColor: 'var(--color-primary)',
    borderRadius: '3px',
    transition: 'width 0.3s'
  },
  funnelItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px'
  },
  funnelStep: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  funnelName: {
    fontSize: '13px'
  },
  funnelCount: {
    fontSize: '13px',
    fontWeight: 600
  },
  funnelBar: {
    height: '8px',
    backgroundColor: 'var(--color-surface-2)',
    borderRadius: '4px',
    overflow: 'hidden'
  },
  funnelBarFill: {
    height: '100%',
    backgroundColor: 'var(--color-primary)',
    borderRadius: '4px',
    transition: 'width 0.3s'
  },
  insightsCard: {
    backgroundColor: 'var(--color-surface)',
    borderRadius: '12px',
    border: '1px solid var(--color-primary)',
    padding: '20px'
  },
  insightsTitle: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontSize: '15px',
    fontWeight: 600,
    margin: '0 0 16px 0',
    color: 'var(--color-primary)'
  },
  insightsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  insightItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px',
    padding: '12px',
    backgroundColor: 'var(--color-surface-2)',
    borderRadius: '8px'
  },
  insightIcon: {
    fontSize: '16px'
  },
  insightText: {
    fontSize: '14px',
    lineHeight: 1.5
  }
};

export default AnalyticsPage;